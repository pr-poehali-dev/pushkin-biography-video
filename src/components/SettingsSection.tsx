import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Sparkles" className="text-purple-500" size={24} />
          <h3 className="text-xl font-bold">Настройки генерации</h3>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="text-base">Модель AI</Label>
            <Select defaultValue="gpt4">
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt4">GPT-4 Turbo (Рекомендуется)</SelectItem>
                <SelectItem value="gpt35">GPT-3.5 (Быстрее)</SelectItem>
                <SelectItem value="dalle">DALL-E 3 (Изображения)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-base">Креативность ответов</Label>
            <Slider defaultValue={[70]} max={100} step={10} className="py-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Точные</span>
              <span>Креативные</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Длина ответа</Label>
            <Select defaultValue="medium">
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Короткий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="long">Подробный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Bell" className="text-blue-500" size={24} />
          <h3 className="text-xl font-bold">Уведомления</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Звуковые уведомления</Label>
              <p className="text-sm text-muted-foreground">Звук при получении ответа</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Email уведомления</Label>
              <p className="text-sm text-muted-foreground">Отправлять результаты на почту</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Новые функции</Label>
              <p className="text-sm text-muted-foreground">Уведомлять о новых возможностях</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Palette" className="text-pink-500" size={24} />
          <h3 className="text-xl font-bold">Интерфейс</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base">Тема оформления</Label>
            <Select defaultValue="light">
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">🌞 Светлая</SelectItem>
                <SelectItem value="dark">🌙 Темная</SelectItem>
                <SelectItem value="auto">✨ Авто</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Анимации</Label>
              <p className="text-sm text-muted-foreground">Плавные переходы и эффекты</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Компактный режим</Label>
              <p className="text-sm text-muted-foreground">Уменьшить отступы</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Shield" className="text-green-500" size={24} />
          <h3 className="text-xl font-bold">Приватность</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Сохранять историю</Label>
              <p className="text-sm text-muted-foreground">Хранить все диалоги</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base">Использовать данные для обучения</Label>
              <p className="text-sm text-muted-foreground">Помогать улучшать AI</p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>
    </div>
  );
}
