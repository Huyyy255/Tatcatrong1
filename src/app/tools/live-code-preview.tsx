
"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";

const initialHtml = `
<div class="container">
  <h1>Xin chào!</h1>
  <p>Đây là một sân chơi code trực tiếp.</p>
  <button id="myButton">Nhấn vào tôi</button>
</div>
`.trim();

const initialCss = `
body {
  font-family: sans-serif;
  background-color: #f0f0f0;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.container {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #0056b3;
}
`.trim();

const initialJs = `
const button = document.getElementById('myButton');
button.addEventListener('click', () => {
  alert('Bạn vừa nhấn nút!');
});
`.trim();

export default function LiveCodePreview() {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [srcDoc, setSrcDoc] = useState("");

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>${debouncedCss}</style>
          </head>
          <body>
            ${debouncedHtml}
            <script>${debouncedJs}<\/script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="html-input">HTML</Label>
          <Textarea
            id="html-input"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Mã HTML"
            className="h-40 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="css-input">CSS</Label>
          <Textarea
            id="css-input"
            value={css}
            onChange={(e) => setCss(e.target.value)}
            placeholder="Mã CSS"
            className="h-40 font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="js-input">JavaScript</Label>
          <Textarea
            id="js-input"
            value={js}
            onChange={(e) => setJs(e.target.value)}
            placeholder="Mã JavaScript"
            className="h-40 font-mono text-sm"
          />
        </div>
      </div>
      <div>
        <Label>Kết quả</Label>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="300px"
          className="rounded-md border bg-white"
        />
      </div>
    </div>
  );
}
