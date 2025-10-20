import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

export default function ProfileSection() {
  const stats = [
    { icon: "MessageSquare", label: "Текстов создано", value: 127, color: "text-purple-500" },
    { icon: "Image", label: "Изображений", value: 45, color: "text-blue-500" },
    { icon: "Presentation", label: "Презентаций", value: 12, color: "text-pink-500" },
    { icon: "Zap", label: "Запросов сегодня", value: 8, color: "text-yellow-500" },
  ];

  const achievements = [
    { emoji: "🎯", title: "Первый шаг", description: "Создал первый запрос" },
    { emoji: "🚀", title: "Продуктивный", description: "100+ запросов выполнено" },
    { emoji: "🎨", title: "Креативщик", description: "Создал 50 изображений" },
    { emoji: "⭐", title: "Звезда", description: "Использует бота 7 дней подряд" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-0 shadow-2xl bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 text-white">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
            <AvatarImage src="" />
            <AvatarFallback className="text-3xl bg-white text-purple-600">👤</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-3xl font-bold mb-2">Пользователь</h2>
            <p className="text-white/90 mb-3">AI Enthusiast 🌟</p>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              Premium Member
            </Badge>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-1">192</div>
            <div className="text-white/90 text-sm">Всего запросов</div>
          </div>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <div className="flex items-center gap-3 mb-3">
              <div className={`${stat.color}`}>
                <Icon name={stat.icon as any} size={24} />
              </div>
              <div className="text-3xl font-bold">{stat.value}</div>
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="TrendingUp" className="text-purple-500" size={24} />
          <h3 className="text-xl font-bold">Ежедневный лимит</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Запросы</span>
              <span className="text-sm font-medium">8 / 50</span>
            </div>
            <Progress value={16} className="h-2" />
          </div>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Award" className="text-yellow-500" size={24} />
          <h3 className="text-xl font-bold">Достижения</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="text-3xl">{achievement.emoji}</div>
              <div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
