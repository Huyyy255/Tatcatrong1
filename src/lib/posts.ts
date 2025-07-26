// This file contains the mock data for blog posts.

export const allPosts = [
    {
      slug: "mastering-nextjs-14",
      title: "Làm chủ Next.js 14: Tìm hiểu sâu về App Router",
      excerpt:
        "Khám phá App Router, Server Components mới và các tính năng mạnh mẽ khác trong Next.js 14.",
      content: "Đây là nội dung chi tiết của bài viết về Next.js 14. Trong bài viết này, chúng ta sẽ khám phá các khái niệm cốt lõi như App Router, Server Components, và cách chúng thay đổi cách chúng ta xây dựng ứng dụng React. Chúng ta cũng sẽ xem xét các ví dụ thực tế và các phương pháp hay nhất.",
      image: "https://placehold.co/800x400.png",
      aiHint: "code screen",
      tags: ["Next.js", "React", "Web Development"],
      author: "Huy",
      date: "2024-05-15",
    },
    {
      slug: "firebase-for-beginners",
      title: "Firebase cho người mới bắt đầu: Auth, Firestore và Storage",
      excerpt:
        "Hướng dẫn toàn diện để bắt đầu với Firebase cho các ứng dụng web và di động của bạn.",
      content: "Firebase là một nền tảng mạnh mẽ giúp đơn giản hóa việc phát triển backend. Bài viết này sẽ hướng dẫn bạn qua các bước đầu tiên với Firebase Authentication, cơ sở dữ liệu thời gian thực Firestore và lưu trữ tệp với Cloud Storage.",
      image: "https://placehold.co/800x400.png",
      aiHint: "database schema",
      tags: ["Firebase", "Backend", "Database"],
      author: "Huy",
      date: "2024-04-22",
    },
    {
      slug: "generative-ai-in-practice",
      title: "AI tạo sinh trong thực tế: Xây dựng với Genkit",
      excerpt:
        "Tìm hiểu cách tích hợp các tính năng AI tạo sinh mạnh mẽ vào ứng dụng của bạn bằng Genkit của Google.",
      content: "AI tạo sinh đang mở ra những khả năng mới. Với Genkit, việc tích hợp các mô hình ngôn ngữ lớn vào ứng dụng của bạn trở nên dễ dàng hơn bao giờ hết. Chúng ta sẽ xây dựng một ví dụ đơn giản để minh họa sức mạnh của nó.",
      image: "https://placehold.co/800x400.png",
      aiHint: "abstract art",
      tags: ["AI", "Genkit", "Google Cloud"],
      author: "Huy",
      date: "2024-03-10",
    },
    {
      slug: "the-art-of-tailwind-css",
      title: "Nghệ thuật của Tailwind CSS: Mẹo và thủ thuật",
      excerpt:
        "Nâng cao kỹ năng tạo kiểu của bạn với các kỹ thuật Tailwind CSS nâng cao để có giao diện người dùng đẹp và đáp ứng.",
      content: "Tailwind CSS đã thay đổi cách chúng ta viết CSS. Bài viết này không chỉ giới thiệu những điều cơ bản mà còn đi sâu vào các mẹo và thủ thuật nâng cao, giúp bạn tạo ra các thiết kế phức tạp một cách hiệu quả và dễ bảo trì.",
      image: "https://placehold.co/800x400.png",
      aiHint: "color palette",
      tags: ["CSS", "Tailwind CSS", "Design"],
      author: "Huy",
      date: "2024-02-01",
    },
  ];

  export const allTags = [...new Set(allPosts.flatMap((post) => post.tags))];
  
