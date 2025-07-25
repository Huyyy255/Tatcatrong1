"use client";

import { useState, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';

type Mode = 'encode' | 'decode';
type Format = 'binary' | 'hex' | 'base64' | 'url';

const formatLabels: Record<Format, string> = {
  binary: 'Nhị phân (Binary)',
  hex: 'Thập lục phân (Hex)',
  base64: 'Base64',
  url: 'URL',
};

const defaultInputText = 'Xin chào!';

export default function CodeTranslator() {
  const [input, setInput] = useState<string>(defaultInputText);
  const [format, setFormat] = useState<Format>('binary');
  const [mode, setMode] = useState<Mode>('encode');

  const handleTranslate = (text: string, currentFormat: Format, currentMode: Mode) => {
    try {
      if (currentMode === 'encode') {
        switch (currentFormat) {
          case 'binary':
            return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          case 'hex':
            return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
          case 'base64':
            return btoa(unescape(encodeURIComponent(text)));
          case 'url':
            return encodeURIComponent(text);
          default:
            return 'Định dạng không hợp lệ';
        }
      } else { // decode
        switch (currentFormat) {
          case 'binary':
            return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
          case 'hex':
             if (text.length % 2 !== 0) return 'Chuỗi Hex không hợp lệ';
            let hexString = '';
            for (let i = 0; i < text.length; i += 2) {
              hexString += String.fromCharCode(parseInt(text.substring(i, i + 2), 16));
            }
            return hexString;
          case 'base64':
            return decodeURIComponent(escape(atob(text)));
          case 'url':
            return decodeURIComponent(text);
          default:
            return 'Định dạng không hợp lệ';
        }
      }
    } catch (error) {
      return 'Lỗi: Dữ liệu đầu vào không hợp lệ cho thao tác này.';
    }
  };

  const output = useMemo(() => handleTranslate(input, format, mode), [input, format, mode]);

  const handleSwap = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
  };
  
  const handleFormatChange = (newFormat: string) => {
    setFormat(newFormat as Format);
    setInput(defaultInputText);
    setMode('encode');
  }

  const inputLabel = mode === 'encode' ? 'Văn bản gốc' : `Mã ${formatLabels[format]}`;
  const outputLabel = mode === 'encode' ? `Mã ${formatLabels[format]}` : 'Văn bản gốc';

  return (
    <div className="space-y-4">
      <Select onValueChange={handleFormatChange} defaultValue={format}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn định dạng mã hóa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="binary">{formatLabels.binary}</SelectItem>
          <SelectItem value="hex">{formatLabels.hex}</SelectItem>
          <SelectItem value="base64">{formatLabels.base64}</SelectItem>
          <SelectItem value="url">{formatLabels.url}</SelectItem>
        </SelectContent>
      </Select>

      <div className="grid gap-4">
         <div>
          <Label htmlFor="input-textarea" className="text-sm font-medium">{inputLabel}</Label>
          <Textarea
            id="input-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập vào đây..."
            rows={4}
          />
        </div>

        <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={handleSwap}>
                <ArrowRightLeft className="h-5 w-5" />
            </Button>
        </div>

         <div>
          <Label htmlFor="output-textarea" className="text-sm font-medium">{outputLabel}</Label>
          <Textarea
            id="output-textarea"
            value={output}
            readOnly
            placeholder="Kết quả sẽ hiển thị ở đây..."
            rows={4}
            className="bg-muted"
          />
        </div>
      </div>
    </div>
  );
}
