
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
import { Trash2, Edit, Plus, Search, X, Clipboard, Check, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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

interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: Timestamp;
  isFavorite: boolean;
  userId: string;
}

type SnippetFormData = {
  title: string;
  description: string;
  code: string;
  tags: string;
};

const initialFormData: SnippetFormData = {
  title: "",
  description: "",
  code: "",
  tags: "",
};

const FAKE_USER_ID = "local-user";

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
  const [formData, setFormData] = useState<SnippetFormData>(initialFormData);
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const snippetsCollection = collection(db, "snippets");
    const q = query(
        snippetsCollection, 
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userSnippets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Snippet[];
      setSnippets(userSnippets);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching snippets:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFormSubmit = async () => {
    const { title, code, tags, description } = formData;
    if (title.trim() === "" || code.trim() === "") return;

    const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

    if (editingSnippet) {
      const snippetDoc = doc(db, "snippets", editingSnippet.id);
      await updateDoc(snippetDoc, { title, description, code, tags: tagsArray });
    } else {
      await addDoc(collection(db, "snippets"), {
        title,
        description,
        code,
        tags: tagsArray,
        createdAt: Timestamp.now(),
        isFavorite: false,
        userId: FAKE_USER_ID
      });
    }
    
    setIsModalOpen(false);
    setEditingSnippet(null);
    setFormData(initialFormData);
  };
  
  const openAddModal = () => {
    setEditingSnippet(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const openEditModal = (snippet: Snippet) => {
    setEditingSnippet(snippet);
    setFormData({
      title: snippet.title,
      description: snippet.description,
      code: snippet.code,
      tags: snippet.tags.join(", "),
    });
    setIsModalOpen(true);
  };
  
  const handleDeleteSnippet = async (id: string) => {
    const snippetDoc = doc(db, "snippets", id);
    await deleteDoc(snippetDoc);
  };
  
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    toast({ title: "Đã sao chép!", description: "Đoạn mã đã được sao chép vào bộ nhớ tạm." });
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [id]: false })), 2000);
  };

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    const snippetDoc = doc(db, "snippets", id);
    await updateDoc(snippetDoc, { isFavorite: !isFavorite });
  };
  
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredSnippets = useMemo(() => {
    if (!searchTerm) return snippets;
    return snippets.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [snippets, searchTerm]);

  return (
    <>
    <LoadingOverlay show={loading} />
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Quản lý Snippet
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Lưu trữ, quản lý và tái sử dụng các đoạn mã hữu ích của bạn.
          </p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddModal}>
              <Plus className="mr-2 h-4 w-4" /> Tạo Snippet mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>
                {editingSnippet ? "Chỉnh sửa Snippet" : "Tạo Snippet mới"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                name="title"
                placeholder="Tiêu đề (ví dụ: React Hook - useDebounce)"
                value={formData.title}
                onChange={handleFormInputChange}
              />
              <Textarea
                name="description"
                placeholder="Mô tả ngắn về đoạn mã"
                rows={2}
                value={formData.description}
                onChange={handleFormInputChange}
              />
              <Textarea
                name="code"
                placeholder="Dán đoạn mã của bạn vào đây"
                rows={10}
                className="font-mono text-sm"
                value={formData.code}
                onChange={handleFormInputChange}
              />
              <Input
                name="tags"
                placeholder="Thẻ (phân cách bởi dấu phẩy, ví dụ: react, hook)"
                value={formData.tags}
                onChange={handleFormInputChange}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={handleFormSubmit}>
                {editingSnippet ? "Lưu thay đổi" : "Lưu Snippet"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm snippet..."
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

      <div className="space-y-6">
        {filteredSnippets.map((snippet) => (
          <Card
            key={snippet.id}
            className="flex flex-col overflow-hidden"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div className="flex-grow">
                     <CardTitle className="font-headline text-lg leading-snug">
                        {snippet.title}
                     </CardTitle>
                     <CardDescription>
                        {snippet.description}
                     </CardDescription>
                  </div>
                  <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => handleToggleFavorite(snippet.id, snippet.isFavorite)}
                        title="Đánh dấu yêu thích"
                    >
                        <Star className={cn("h-5 w-5", snippet.isFavorite && "fill-yellow-400 text-yellow-400")}/>
                   </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {snippet.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
               <div className="relative">
                <pre className="p-4 rounded-md bg-muted text-muted-foreground overflow-x-auto text-sm font-mono">
                    <code>
                        {snippet.code}
                    </code>
                </pre>
                 <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => handleCopyCode(snippet.id, snippet.code)}
                 >
                    {copiedStates[snippet.id] ? <Check className="h-4 w-4 text-green-500"/> : <Clipboard className="h-4 w-4"/>}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Tạo vào: {snippet.createdAt.toDate().toLocaleDateString("vi-VN")}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => openEditModal(snippet)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => handleDeleteSnippet(snippet.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredSnippets.length === 0 && !loading && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            Không tìm thấy snippet nào. Hãy tạo một snippet mới!
          </p>
        </div>
      )}
    </div>
    </>
  );
}
