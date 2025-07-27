
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Stagger } from "@/components/stagger";

const faqs = [
  {
    question: "Bạn chuyên về những công nghệ nào?",
    answer:
      "Tôi chuyên về MERN stack (MongoDB, Express, React, Node.js) và có nhiều kinh nghiệm với Next.js, Firebase và Tailwind CSS. Tôi luôn học hỏi và thích ứng với các công nghệ mới trong hệ sinh thái phát triển web.",
  },
  {
    question: "Bạn có nhận dự án tự do không?",
    answer:
      "Có, tôi hiện đang mở cửa cho các cơ hội làm việc tự do mới. Vui lòng sử dụng biểu mẫu liên hệ trên trang web này để liên lạc với thông tin chi tiết về dự án của bạn và tôi sẽ trả lời bạn sớm nhất có thể.",
  },
  {
    question: "Làm thế nào để bạn cập nhật các xu hướng ngành mới nhất?",
    answer:
      "Tôi là một người học hỏi suốt đời. Tôi thường xuyên đọc các blog công nghệ, theo dõi các nhà lãnh đạo ngành trên mạng xã hội, đóng góp vào các dự án mã nguồn mở và tham gia các khóa học trực tuyến để giữ cho kỹ năng của mình luôn sắc bén và cập nhật.",
  },
  {
    question: "Tôi có thể xem mã nguồn của trang web này không?",
    answer:
      "Chắc chắn rồi! Trang web này là mã nguồn mở. Bạn có thể tìm thấy mã nguồn hoàn chỉnh trên hồ sơ GitHub của tôi. Hãy thoải mái khám phá, phân nhánh hoặc sử dụng nó làm mẫu cho trang web của riêng bạn.",
  },
  {
    question: "Quy trình của bạn để bắt đầu một dự án mới là gì?",
    answer:
      "Quy trình của tôi bắt đầu với giai đoạn khám phá để hiểu mục tiêu và yêu cầu của dự án. Tiếp theo là lập kế hoạch, thiết kế mô phỏng, phát triển, thử nghiệm và triển khai. Tôi tin vào giao tiếp và hợp tác rõ ràng trong toàn bộ vòng đời của một dự án.",
  },
  {
    question: "Trang web này được xây dựng bằng những công nghệ chính nào?",
    answer: "Trang web này sử dụng một bộ công nghệ hiện đại bao gồm Next.js (một framework React) cho phần frontend, Firebase cho backend (xác thực và cơ sở dữ liệu Firestore), Genkit cho các tính năng AI tạo sinh, và Tailwind CSS cùng với ShadCN/UI để tạo kiểu giao diện người dùng."
  },
  {
    question: "Next.js hoạt động như thế nào trong dự án này?",
    answer: "Next.js đóng vai trò là khung sườn chính cho ứng dụng. Chúng tôi sử dụng các tính năng mới nhất như App Router để quản lý các trang, Server Components để tối ưu hóa hiệu suất bằng cách render trên máy chủ, và các quy ước định tuyến của nó giúp cấu trúc dự án một cách rõ ràng."
  },
  {
    question: "Firebase đóng vai trò gì?",
    answer: "Firebase hoạt động như một Backend-as-a-Service (BaaS). Cụ thể, chúng tôi sử dụng Firebase Authentication để quản lý việc đăng ký, đăng nhập của người dùng. Firestore, một cơ sở dữ liệu NoSQL, được dùng để lưu trữ và đồng bộ hóa dữ liệu của người dùng (như ghi chú, công việc) một cách thời gian thực trên các thiết bị."
  },
  {
    question: "Các tính năng AI được xây dựng như thế nào?",
    answer: "Các tính năng thông minh như tóm tắt ghi chú, đề xuất chủ đề blog, sửa lỗi code và tạo ảnh đều được cung cấp bởi AI tạo sinh của Google. Chúng tôi sử dụng Genkit, một framework mã nguồn mở của Google, để xác định, triển khai và quản lý các luồng AI (flows) này một cách hiệu quả."
  },
  {
    question: "Giao diện người dùng được tạo kiểu ra sao?",
    answer: "Giao diện được xây dựng bằng cách kết hợp Tailwind CSS và ShadCN/UI. Tailwind CSS là một utility-first CSS framework giúp tạo kiểu nhanh chóng trực tiếp trong mã HTML. ShadCN/UI không phải là một thư viện component, mà là một bộ sưu tập các component có thể tái sử dụng, được xây dựng trên Tailwind CSS, giúp chúng tôi có toàn quyền kiểm soát về mặt giao diện và đảm bảo tính nhất quán."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight">
          Các câu hỏi thường gặp
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Đây là một số câu hỏi phổ biến tôi nhận được.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <Stagger>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Stagger>
      </Accordion>
    </div>
  );
}
