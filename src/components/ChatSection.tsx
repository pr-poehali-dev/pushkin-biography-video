import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  type?: "text" | "image" | "presentation";
  timestamp: Date;
}

export default function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Привет! Я твой AI помощник. Могу создать для тебя тексты, изображения и презентации. Что тебя интересует?",
      sender: "bot",
      type: "text",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      type: "text",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "✨ Отличный вопрос! Я обработаю твой запрос и создам для тебя качественный ответ.",
        sender: "bot",
        type: "text",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    { icon: "FileText", label: "Создать текст", emoji: "📝" },
    { icon: "Image", label: "Создать картинку", emoji: "🎨" },
    { icon: "Presentation", label: "Создать презентацию", emoji: "📊" },
    { icon: "Sparkles", label: "Ответить на вопрос", emoji: "💡" },
  ];

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
      <div className="p-6 border-b bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-lg">
            🤖
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI ChatGPT</h2>
            <p className="text-white/90 text-sm flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Онлайн
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-muted/30">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto py-3 flex flex-col gap-2 hover:shadow-md hover:scale-105 transition-all bg-white"
            onClick={() => setInputValue(action.label)}
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-xs font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      <ScrollArea className="h-[400px] p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              } animate-in fade-in slide-in-from-bottom-2`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                    : "bg-muted shadow-md"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in fade-in">
              <div className="bg-muted rounded-2xl p-4 shadow-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Input
            placeholder="Напиши сообщение... 💬"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white shadow-sm"
          />
          <Button
            onClick={handleSend}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
            disabled={!inputValue.trim()}
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
