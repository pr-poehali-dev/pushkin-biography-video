import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import ChatSection from "@/components/ChatSection";
import ProfileSection from "@/components/ProfileSection";
import SettingsSection from "@/components/SettingsSection";
import HelpSection from "@/components/HelpSection";

export default function Index() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto p-4 max-w-6xl">
        <header className="mb-6 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-pink-600 bg-clip-text text-transparent mb-2">
            🤖 AI ChatGPT Bot
          </h1>
          <p className="text-muted-foreground text-lg">
            Создавай тексты, изображения и презентации с помощью ИИ
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 h-auto p-2 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="chat" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="MessageSquare" size={20} />
              <span className="hidden sm:inline">Чат</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="User" size={20} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="Settings" size={20} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
              <Icon name="HelpCircle" size={20} />
              <span className="hidden sm:inline">Справка</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <ChatSection />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsSection />
          </TabsContent>

          <TabsContent value="help">
            <HelpSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
