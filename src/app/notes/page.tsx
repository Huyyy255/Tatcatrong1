
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2, Edit, Plus, Search, X, Sparkles, Loader2, AudioLines, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { summarizeNote, SummarizeNoteOutput } from "@/ai/flows/summarize-note";
import { textToSpeech, TextToSpeechOutput } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import LoadingOverlay from "@/components/ui/loading-overlay";


interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  isFavorite: boolean;
  userId: string;
}

type NoteFormData = {
  title: string;
  content: string;
  tags: string; 
};

const initialFormData: NoteFormData = {
  title: "",
  content: "",
  tags: "",
};

const FAKE_USER_ID = "local-user";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState<NoteFormData>(initialFormData);

  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeNoteOutput | null>(null);
  
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audio, setAudio] = useState<TextToSpeechOutput | null>(null);
  const [noteToListen, setNoteToListen] = useState<Note | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const notesCollection = collection(db, "notes");
    const q = query(
      notesCollection, 
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userNotes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(userNotes);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notes:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async () => {
    const { title, content, tags } = formData;
    if (title.trim() === "" || content.trim() === "") return;

    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    if (editingNote) {
      const noteDoc = doc(db, "notes", editingNote.id);
      await updateDoc(noteDoc, { title, content, tags: tagsArray });
    } else {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        tags: tagsArray,
        createdAt: Timestamp.now(),
        isFavorite: false,
        userId: FAKE_USER_ID,
      });
    }
    
    setIsModalOpen(false);
    setEditingNote(null);
    setFormData(initialFormData);
  };
  
  const openAddModal = () => {
    setEditingNote(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
    });
    setIsModalOpen(true);
  };
  
  const handleDeleteNote = async (id: string) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
  };
  
  const handleSummarizeNote = async (content: string) => {
    setIsSummaryLoading(true);
    setSummary(null);
    setIsSummaryModalOpen(true);
    try {
      const result = await summarizeNote({ noteContent: content });
      setSummary(result);
    } catch (error) {
      console.error("Failed to summarize note:", error);
      setIsSummaryModalOpen(false);
      toast({
        title: "Lỗi",
        description: "Không thể tóm tắt ghi chú. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleListenToNote = async (note: Note) => {
    setIsAudioLoading(true);
    setAudio(null);
    setNoteToListen(note);
    setIsAudioModalOpen(true);
    try {
      const result = await textToSpeech({ text: `${note.title}. ${note.content}` });
      setAudio(result);
    } catch (error) {
      console.error("Failed to generate audio:", error);
      setIsAudioModalOpen(false);
      toast({
        title: "Lỗi",
        description: "Không thể tạo âm thanh. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsAudioLoading(false);
    }
  }

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, { isFavorite: !isFavorite });
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes;
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [notes, searchTerm]);

  return (
    <>
    <LoadingOverlay show={loading} />
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Ghi chú cá nhân
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Lưu trữ ý tưởng, thông tin và mọi thứ quan trọng.
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Tạo ghi chú mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingNote ? "Chỉnh sửa ghi chú" : "Tạo ghi chú mới"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="title"
                placeholder="Tiêu đề"
                value={formData.title}
                onChange={handleFormInputChange}
              />
              <Textarea
                name="content"
                placeholder="Nội dung"
                rows={5}
                value={formData.content}
                onChange={handleFormInputChange}
              />
              <Input
                name="tags"
                placeholder="Thẻ (phân cách bởi dấu phẩy)"
                value={formData.tags}
                onChange={handleFormInputChange}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={handleFormSubmit}>
                {editingNote ? "Lưu thay đổi" : "Lưu ghi chú"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm ghi chú theo tiêu đề, nội dung hoặc thẻ..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
           {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNotes.map((note) => (
          <Card
            key={note.id}
            className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-lg leading-snug">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">
                {note.content}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {note.createdAt.toDate().toLocaleDateString("vi-VN")}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleToggleFavorite(note.id, note.isFavorite)}
                  title="Đánh dấu yêu thích"
                >
                  <Star className={cn("h-4 w-4", note.isFavorite && "fill-yellow-400 text-yellow-400")}/>
                </Button>
                 <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleListenToNote(note)}
                  title="Nghe ghi chú"
                >
                  <AudioLines className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleSummarizeNote(note.content)}
                  title="Tóm tắt ghi chú"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => openEditModal(note)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredNotes.length === 0 && !loading && (
        <div className="col-span-full py-16 text-center">
          <p className="text-muted-foreground">
            Không tìm thấy ghi chú nào. Hãy tạo một ghi chú mới!
          </p>
        </div>
      )}
      <AlertDialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bản tóm tắt ghi chú</AlertDialogTitle>
             <AlertDialogDescription>
              Đây là bản tóm tắt được tạo bởi AI.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isSummaryLoading && (
             <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}
          {summary && (
            <div className="max-h-[400px] overflow-y-auto rounded-md border bg-muted/50 p-4 text-sm">
                {summary.summary}
            </div>
          )}
          <AlertDialogFooter>
             <AlertDialogAction onClick={() => setIsSummaryModalOpen(false)}>Đóng</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={isAudioModalOpen} onOpenChange={setIsAudioModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Nghe ghi chú: {noteToListen?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              AI đang đọc ghi chú của bạn.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isAudioLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          {audio?.audioDataUri && (
             <audio controls autoPlay className="w-full">
                <source src={audio.audioDataUri} type="audio/wav" />
                Trình duyệt của bạn không hỗ trợ phần tử audio.
            </audio>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Đóng</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </>
  );
}
