import React from "react";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Họ Tên Của Bạn</h1>
        <p className="text-gray-500 mt-2">Mục đích cá nhân &mdash; Phong cách tối giản</p>
      </header>
      <section className="max-w-xl w-full mb-8">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Giới thiệu</h2>
        <p>
          Xin chào! Đây là trang web cá nhân của tôi. Tôi thích sự đơn giản và hiện đại.
        </p>
      </section>
      <section className="max-w-xl w-full">
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Liên hệ</h2>
        <ul>
          <li>Email: <a href="mailto:ban@domain.com" className="underline decoration-dotted">ban@domain.com</a></li>
          <li>Github: <a href="https://github.com/Huyyy255" target="_blank" className="underline decoration-dotted">Huyyy255</a></li>
        </ul>
      </section>
      <footer className="mt-12 text-gray-400 text-sm border-t border-gray-200 pt-4 w-full text-center">
        &copy; 2025 Họ Tên Của Bạn
      </footer>
    </main>
  );
}
