export default function Home() {
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center space-y-12 px-4 py-12 text-center lg:py-16">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <h1 className="font-headline scroll-m-20 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Xin chào, Huy!
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Bạn muốn chúng ta làm gì hôm nay?
        </p>
      </div>
    </div>
  );
}
