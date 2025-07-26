
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Edit, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAutoAnimate } from "@/hooks/use-auto-animate";
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

interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string | null;
  createdAt: Timestamp;
}

const FAKE_USER_ID = "local-user";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [uncompletedListRef] = useAutoAnimate<HTMLDivElement>();
  const [completedListRef] = useAutoAnimate<HTMLDivElement>();

  useEffect(() => {
    setLoading(true);
    const tasksCollection = collection(db, "tasks");
    const q = query(
        tasksCollection, 
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      setTasks(userTasks);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    
    await addDoc(collection(db, "tasks"), {
      text: newTaskText,
      completed: false,
      dueDate: null,
      createdAt: Timestamp.now(),
      userId: FAKE_USER_ID,
    });
    setNewTaskText("");
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { completed: !completed });
  };

  const handleDeleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
  };

  const handleSaveEdit = async (id: string) => {
    if (editingTaskText.trim() === "") return;
    const taskDoc = doc(db, "tasks", id);
    await updateDoc(taskDoc, { text: editingTaskText });
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  const getDaysLeft = (dueDate: string | null) => {
    if (!dueDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const uncompletedTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
    <LoadingOverlay show={loading} />
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Quản lý Công việc
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Thêm, quản lý và theo dõi tất cả công việc của bạn ở một nơi.
        </p>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Thêm công việc mới</CardTitle>
          <form onSubmit={handleAddTask} className="flex gap-2 pt-4">
            <Input
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Ví dụ: Viết một bài blog về AI..."
              className="flex-grow"
              disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading}>
              <Plus />
            </Button>
          </form>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Công việc cần làm ({uncompletedTasks.length})</h3>
             <div ref={uncompletedListRef} className="space-y-2">
                {uncompletedTasks.length > 0 ? (
                uncompletedTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 rounded-md border p-3">
                    <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                    />
                    <div className="flex-grow">
                    {editingTaskId === task.id ? (
                        <Input
                            value={editingTaskText}
                            onChange={(e) => setEditingTaskText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                            className="h-8"
                        />
                        ) : (
                        <label htmlFor={`task-${task.id}`} className={`text-sm ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                            {task.text}
                        </label>
                        )}
                        {task.dueDate && !task.completed && (
                        <div className="text-xs text-muted-foreground mt-1">
                            <Badge variant={
                            (getDaysLeft(task.dueDate) ?? 0) < 0 ? "destructive" :
                            (getDaysLeft(task.dueDate) ?? 0) <= 3 ? "secondary" :
                            "outline"
                            }>
                            {
                                (getDaysLeft(task.dueDate) ?? 0) < 0 ? `Quá hạn ${Math.abs(getDaysLeft(task.dueDate) ?? 0)} ngày` :
                                (getDaysLeft(task.dueDate) ?? 0) === 0 ? `Hết hạn hôm nay` :
                                `Còn lại ${getDaysLeft(task.dueDate)} ngày`
                            }
                            </Badge>
                        </div>
                        )}
                    </div>
                    <div className="flex gap-1">
                        {editingTaskId === task.id ? (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSaveEdit(task.id)}>
                                <Save className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditing(task)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                    </div>
                ))
                ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa có công việc nào. Hãy thêm một công việc mới!</p>
                )}
            </div>
            
            <h3 className="text-lg font-semibold border-b pb-2 pt-6">Công việc đã hoàn thành ({completedTasks.length})</h3>
             <div ref={completedListRef} className="space-y-2">
                {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-4 rounded-md border p-3 bg-muted/50">
                    <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleToggleTask(task.id, task.completed)}
                    />
                    <div className="flex-grow">
                        <label htmlFor={`task-${task.id}`} className="text-sm text-muted-foreground line-through">
                            {task.text}
                        </label>
                        </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    </div>
                ))
                ) : (
                <p className="text-sm text-muted-foreground text-center py-4">Chưa có công việc nào được hoàn thành.</p>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
