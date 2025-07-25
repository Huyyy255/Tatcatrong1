import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
        <div className="absolute -top-14 -z-10 blur-3xl">
          <div className="h-40 w-40 rounded-full bg-primary/20 lg:h-52 lg:w-52"></div>
        </div>
        <div className="mb-4 flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Chào mừng đến trung tâm cá nhân của tôi</span>
        </div>
        <h1 className="font-headline scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          Xin chào, tôi là Phạm Văn Huy
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Phạm Văn Huy 25 7 2011
        </p>
      </div>
    </div>
  );
}
