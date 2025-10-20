import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

export default function HelpSection() {
  const commands = [
    {
      command: "/start",
      description: "Начать работу с ботом и увидеть главное меню",
      emoji: "🚀",
    },
    {
      command: "/help",
      description: "Показать справку по всем доступным командам",
      emoji: "❓",
    },
    {
      command: "/settings",
      description: "Открыть настройки бота и персонализировать его",
      emoji: "⚙️",
    },
    {
      command: "/profile",
      description: "Посмотреть свою статистику и достижения",
      emoji: "👤",
    },
  ];

  const faqs = [
    {
      question: "Как создать текст с помощью AI?",
      answer: "Просто напиши в чат, какой текст тебе нужен. Например: 'Напиши пост для соцсетей о путешествии' или 'Создай описание товара'. AI поймет твой запрос и создаст качественный текст.",
    },
    {
      question: "Как сгенерировать изображение?",
      answer: "Опиши, какое изображение тебе нужно. Например: 'Создай картинку с закатом на пляже' или 'Нарисуй логотип для кофейни в винтажном стиле'. Чем подробнее описание, тем лучше результат.",
    },
    {
      question: "Можно ли создать презентацию?",
      answer: "Да! Укажи тему презентации и основные пункты. Например: 'Создай презентацию о пользе здорового питания на 5 слайдов'. AI структурирует информацию и подготовит готовую презентацию.",
    },
    {
      question: "Есть ли лимит на запросы?",
      answer: "Да, у каждого тарифа свой лимит. В бесплатной версии доступно 50 запросов в день. Premium пользователи имеют неограниченный доступ.",
    },
    {
      question: "Как улучшить качество ответов?",
      answer: "Пиши более подробные запросы, указывай стиль, тон, целевую аудиторию. В настройках можно изменить креативность и длину ответов. Экспериментируй!",
    },
  ];

  const features = [
    { icon: "FileText", title: "Тексты", description: "Статьи, посты, письма, описания" },
    { icon: "Image", title: "Изображения", description: "Иллюстрации, логотипы, концепт-арт" },
    { icon: "Presentation", title: "Презентации", description: "Слайды для выступлений и питчей" },
    { icon: "MessageSquare", title: "Ответы на вопросы", description: "Подробные объяснения и советы" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-8 border-0 shadow-lg bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold mb-3">Добро пожаловать в AI ChatGPT Bot!</h2>
          <p className="text-white/90 text-lg">
            Твой универсальный помощник для создания контента с помощью искусственного интеллекта
          </p>
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Zap" className="text-yellow-500" size={24} />
          <h3 className="text-xl font-bold">Что умеет бот</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-md transition-shadow"
            >
              <div className="text-purple-500">
                <Icon name={feature.icon as any} size={28} />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Terminal" className="text-blue-500" size={24} />
          <h3 className="text-xl font-bold">Доступные команды</h3>
        </div>
        <div className="space-y-3">
          {commands.map((cmd, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="text-3xl">{cmd.emoji}</div>
              <div className="flex-1">
                <code className="text-sm font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {cmd.command}
                </code>
                <p className="text-sm text-muted-foreground mt-2">{cmd.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-white">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="HelpCircle" className="text-pink-500" size={24} />
          <h3 className="text-xl font-bold">Частые вопросы</h3>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:text-purple-600">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="text-4xl">💬</div>
          <h3 className="text-xl font-bold">Нужна дополнительная помощь?</h3>
          <p className="text-muted-foreground">
            Если у тебя остались вопросы, свяжись с нашей службой поддержки
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Написать в поддержку
          </Button>
        </div>
      </Card>
    </div>
  );
}
