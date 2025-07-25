
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
import { Trash2, Edit, Plus, GripVertical, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<{
    title: string;
    content: string;
    tags: string;
  }>({ title: "", content: "", tags: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      setNotes([
        {
          id: 1,
          title: "Ý tưởng cho dự án mới",
          content:
            "Xây dựng một ứng dụng theo dõi thói quen để giúp mọi người hình thành những thói quen tốt. Tích hợp gamification để tăng động lực.",
          tags: ["dự án", "ý tưởng", "react"],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          title: "Công thức nấu ăn",
          content:
            "Công thức món gà nướng sả ớt:\n- 500g đùi gà\n- 3 cây sả\n- 2 quả ớt\n- Gia vị: nước mắm, đường, tiêu, hạt nêm.",
          tags: ["nấu ăn", "công thức"],
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.title.trim() === "" || newNote.content.trim() === "") return;
    const newId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) + 1 : 1;
    const newNoteToAdd: Note = {
      id: newId,
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
    };
    setNotes([newNoteToAdd, ...notes]);
    setNewNote({ title: "", content: "", tags: "" });
    setIsModalOpen(false);
  };

  const handleUpdateNote = () => {
    if (!editingNote) return;
    setNotes(
      notes.map((note) => (note.id === editingNote.id ? editingNote : note))
    );
    setEditingNote(null);
    setIsModalOpen(false);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const openEditModal = (note: Note) => {
    setEditingNote({ ...note, tags: note.tags.join(", ") });
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingNote(null);
    setNewNote({ title: "", content: "", tags: "" });
    setIsModalOpen(true);
  };

  const filteredNotes = useMemo(() => {
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
                placeholder="Tiêu đề"
                value={editingNote ? editingNote.title : newNote.title}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, title: e.target.value })
                    : setNewNote({ ...newNote, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Nội dung"
                rows={5}
                value={editingNote ? editingNote.content : newNote.content}
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({ ...editingNote, content: e.target.value })
                    : setNewNote({ ...newNote, content: e.target.value })
                }
              />
              <Input
                placeholder="Thẻ (phân cách bởi dấu phẩy)"
                value={
                  editingNote ? (editingNote.tags as unknown as string) : newNote.tags
                }
                onChange={(e) =>
                  editingNote
                    ? setEditingNote({
                        ...editingNote,
                        tags: e.target.value.split(",").map(t => t.trim()),
                      })
                    : setNewNote({ ...newNote, tags: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={editingNote ? handleUpdateNote : handleAddNote}>
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
    </div>
  );
}
