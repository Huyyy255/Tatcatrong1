
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Star, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";


// Định nghĩa kiểu dữ liệu cho Note và Snippet
interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
}

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: string;
  isFavorite: boolean;
}

export default function FavoritesPage() {
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);
  const [favoriteSnippets, setFavoriteSnippets] = useState<Snippet[]>([]);
  const { toast } = useToast();

  // Hàm tải dữ liệu yêu thích từ localStorage
  const loadFavorites = () => {
    try {
      const allNotes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
      setFavoriteNotes(allNotes.filter(note => note.isFavorite));

      const allSnippets: Snippet[] = JSON.parse(localStorage.getItem("snippets") || "[]");
      setFavoriteSnippets(allSnippets.filter(snippet => snippet.isFavorite));
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách yêu thích.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    loadFavorites();
     // Lắng nghe sự kiện thay đổi localStorage từ các tab khác
    const handleStorageChange = () => {
        loadFavorites();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Hàm bỏ yêu thích một ghi chú
  const unloveNote = (id: number) => {
    const allNotes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
    const updatedNotes = allNotes.map(note => 
      note.id === id ? { ...note, isFavorite: false } : note
    );
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    loadFavorites(); // Tải lại danh sách yêu thích
     toast({ title: "Đã bỏ yêu thích ghi chú!" });
  };

  // Hàm bỏ yêu thích một snippet
  const unloveSnippet = (id: number) => {
    const allSnippets: Snippet[] = JSON.parse(localStorage.getItem("snippets") || "[]");
    const updatedSnippets = allSnippets.map(snippet =>
      snippet.id === id ? { ...snippet, isFavorite: false } : snippet
    );
    localStorage.setItem("snippets", JSON.stringify(updatedSnippets));
    loadFavorites(); // Tải lại danh sách yêu thích
    toast({ title: "Đã bỏ yêu thích snippet!" });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Đã sao chép!", description: "Đoạn mã đã được sao chép vào bộ nhớ tạm." });
  };


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Danh sách Yêu thích
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Tất cả ghi chú và snippet bạn đã đánh dấu sao.
        </p>
      </div>

      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notes">Ghi chú ({favoriteNotes.length})</TabsTrigger>
          <TabsTrigger value="snippets">Snippets ({favoriteSnippets.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="notes">
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteNotes.length > 0 ? (
              favoriteNotes.map((note) => (
                <Card key={note.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                     <div className="mt-2 flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                     <Button variant="ghost" size="icon" onClick={() => unloveNote(note.id)}>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                Bạn chưa có ghi chú yêu thích nào. Hãy đến trang <Link href="/notes" className="text-primary hover:underline">Ghi chú</Link> và đánh dấu sao nhé!
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="snippets">
          <div className="mt-6 space-y-6">
             {favoriteSnippets.length > 0 ? (
              favoriteSnippets.map((snippet) => (
                <Card key={snippet.id}>
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
                             <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => unloveSnippet(snippet.id)}>
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            </Button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {snippet.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
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
                                onClick={() => handleCopyCode(snippet.code)}
                            >
                                <Clipboard className="h-4 w-4"/>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
              ))
            ) : (
                <p className="text-center text-muted-foreground py-10">
                    Bạn chưa có snippet yêu thích nào. Hãy đến trang <Link href="/snippets" className="text-primary hover:underline">Snippets</Link> và đánh dấu sao nhé!
                </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

