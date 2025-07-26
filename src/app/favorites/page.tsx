
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
import { Clipboard, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import LoadingOverlay from "@/components/ui/loading-overlay";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Timestamp;
  isFavorite: boolean;
}

interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
  createdAt: Timestamp;
  isFavorite: boolean;
}

export default function FavoritesPage() {
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([]);
  const [favoriteSnippets, setFavoriteSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);

    // Listener for favorite notes
    const notesQuery = query(
      collection(db, "notes"),
      where("isFavorite", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsubscribeNotes = onSnapshot(notesQuery, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Note[];
      setFavoriteNotes(notes);
      if (loading) setLoading(false);
    });

    // Listener for favorite snippets
    const snippetsQuery = query(
      collection(db, "snippets"),
      where("isFavorite", "==", true),
      orderBy("createdAt", "desc")
    );
    const unsubscribeSnippets = onSnapshot(snippetsQuery, (snapshot) => {
      const snippets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Snippet[];
      setFavoriteSnippets(snippets);
      if (loading) setLoading(false);
    });

    return () => {
      unsubscribeNotes();
      unsubscribeSnippets();
    };
  }, [loading]);

  const unloveNote = async (id: string) => {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, { isFavorite: false });
    toast({ title: "Đã bỏ yêu thích ghi chú!" });
  };

  const unloveSnippet = async (id: string) => {
    const snippetDoc = doc(db, "snippets", id);
    await updateDoc(snippetDoc, { isFavorite: false });
    toast({ title: "Đã bỏ yêu thích snippet!" });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Đã sao chép!", description: "Đoạn mã đã được sao chép vào bộ nhớ tạm." });
  };

  return (
    <>
    <LoadingOverlay show={loading} />
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
            {!loading && favoriteNotes.length > 0 ? (
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
                        {note.createdAt.toDate().toLocaleDateString("vi-VN")}
                    </span>
                     <Button variant="ghost" size="icon" onClick={() => unloveNote(note.id)}>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              !loading && <p className="col-span-full text-center text-muted-foreground py-10">
                Bạn chưa có ghi chú yêu thích nào. Hãy đến trang <Link href="/notes" className="text-primary hover:underline">Ghi chú</Link> và đánh dấu sao nhé!
              </p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="snippets">
          <div className="mt-6 space-y-6">
             {!loading && favoriteSnippets.length > 0 ? (
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
                !loading && <p className="text-center text-muted-foreground py-10">
                    Bạn chưa có snippet yêu thích nào. Hãy đến trang <Link href="/snippets" className="text-primary hover:underline">Snippets</Link> và đánh dấu sao nhé!
                </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
}
