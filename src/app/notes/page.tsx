
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


interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
}

// Separate state for the form/dialog to avoid mixing with main notes data
type NoteFormData = {
  title: string;
  content: string;
  tags: string; // Tags are handled as a single comma-separated string in the form
};

const initialFormData: NoteFormData = {
  title: "",
  content: "",
  tags: "",
};


export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for Add/Edit dialog
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState<NoteFormData>(initialFormData);

  // State for Summary dialog
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeNoteOutput | null>(null);
  
  // State for Audio dialog
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audio, setAudio] = useState<TextToSpeechOutput | null>(null);
  const [noteToListen, setNoteToListen] = useState<Note | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
         setNotes([
        {
          id: 1,
          title: "Ý tưởng cho dự án mới",
          content:
            "Xây dựng một ứng dụng theo dõi thói quen để giúp mọi người hình thành những thói quen tốt. Tích hợp gamification để tăng động lực. Cần xem xét các tính năng như đặt mục tiêu hàng ngày, theo dõi tiến độ qua biểu đồ, và hệ thống phần thưởng khi đạt được cột mốc quan trọng. Giao diện cần đơn giản, thân thiện và tạo cảm hứng cho người dùng.",
          tags: ["dự án", "ý tưởng", "react"],
          createdAt: new Date().toISOString(),
          isFavorite: false,
        },
        {
          id: 2,
          title: "Công thức nấu ăn: Gà nướng sả ớt",
          content:
            "Công thức món gà nướng sả ớt:\n- 500g đùi gà, rửa sạch, để ráo.\n- 3 cây sả, 2 quả ớt băm nhuyễn.\n- Gia vị: 2 muỗng canh nước mắm, 1 muỗng canh đường, 1/2 muỗng cà phê tiêu, 1 muỗng cà phê hạt nêm.\n- Trộn đều gà với sả, ớt và các gia vị. Ướp ít nhất 30 phút.\n- Làm nóng lò nướng ở 200°C. Cho gà vào nướng trong 20-25 phút, hoặc cho đến khi gà chín vàng đều. Có thể lật gà giữa chừng để đảm bảo gà chín đều hai mặt.",
          tags: ["nấu ăn", "công thức"],
          createdAt: new Date().toISOString(),
          isFavorite: true,
        },
      ]);
      }
    } catch (error) {
       console.error("Failed to parse notes from localStorage", error);
       setNotes([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleFormSubmit = () => {
    const { title, content, tags } = formData;
    if (title.trim() === "" || content.trim() === "") return;

    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    if (editingNote) {
      // Update existing note
      const updatedNote: Note = { ...editingNote, title, content, tags: tagsArray };
      setNotes(notes.map((note) => (note.id === editingNote.id ? updatedNote : note)));
    } else {
      // Add new note
      const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
      const newNoteToAdd: Note = {
        id: newId,
        title,
        content,
        tags: tagsArray,
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      setNotes([newNoteToAdd, ...notes]);
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
  
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
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

  const handleToggleFavorite = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
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
                {new Date(note.createdAt).toLocaleDateString("vi-VN")}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleToggleFavorite(note.id)}
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
      {filteredNotes.length === 0 && (
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
  );
}
