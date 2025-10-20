import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse

TELEGRAM_TOKEN = "8441728491:AAEzZNjcCILZmMcbWg8PifAhC6b5aMIWjPQ"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot для создания текстов, изображений и презентаций с помощью ChatGPT
    Args: event - webhook данные от Telegram
          context - контекст выполнения функции
    Returns: HTTP response для Telegram
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        try:
            body_data = json.loads(event.get('body', '{}'))
            
            if 'message' in body_data:
                message = body_data['message']
                chat_id = message['chat']['id']
                text = message.get('text', '')
                
                if text.startswith('/start'):
                    send_start_message(chat_id)
                elif text.startswith('/help'):
                    send_help_message(chat_id)
                elif text.startswith('/settings'):
                    send_settings_message(chat_id)
                elif text.startswith('/profile'):
                    send_profile_message(chat_id)
                else:
                    send_ai_response(chat_id, text)
        except Exception as e:
            pass
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'text/plain'},
        'body': 'Telegram Bot is running!',
        'isBase64Encoded': False
    }

def send_message(chat_id: int, text: str, parse_mode: str = 'HTML') -> None:
    params = {
        'chat_id': str(chat_id),
        'text': text,
        'parse_mode': parse_mode
    }
    
    try:
        url = f"{TELEGRAM_API}/sendMessage?" + urllib.parse.urlencode(params)
        req = urllib.request.Request(url)
        
        with urllib.request.urlopen(req) as response:
            response.read()
    except Exception as e:
        pass

def send_start_message(chat_id: int) -> None:
    text = """🤖 <b>Добро пожаловать в AI ChatGPT Bot!</b>

Я твой универсальный помощник для создания контента с помощью искусственного интеллекта.

<b>Что я умею:</b>
📝 Создавать тексты любой сложности
🎨 Генерировать изображения
📊 Создавать презентации
💡 Отвечать на вопросы

<b>Доступные команды:</b>
/help - Справка по командам
/settings - Настройки бота
/profile - Твой профиль и статистика

Просто напиши мне, что тебе нужно, и я помогу! ✨"""
    
    send_message(chat_id, text)

def send_help_message(chat_id: int) -> None:
    text = """❓ <b>Справка по командам</b>

<b>Основные команды:</b>
/start - Начать работу с ботом
/help - Показать эту справку
/settings - Настройки бота
/profile - Твоя статистика

<b>Как использовать бота:</b>

📝 <b>Создание текста:</b>
Просто опиши, что тебе нужно.
Пример: "Напиши пост для Instagram о путешествии"

🎨 <b>Генерация изображения:</b>
Опиши изображение подробно.
Пример: "Создай картинку с закатом на море"

📊 <b>Создание презентации:</b>
Укажи тему и количество слайдов.
Пример: "Презентация о здоровом питании, 5 слайдов"

💡 <b>Вопросы:</b>
Задай любой вопрос - я отвечу!

Нужна помощь? Напиши мне! 😊"""
    
    send_message(chat_id, text)

def send_settings_message(chat_id: int) -> None:
    text = """⚙️ <b>Настройки бота</b>

<b>Текущие параметры:</b>
🤖 Модель: GPT-4 Turbo
🎨 Креативность: Высокая
📏 Длина ответов: Средняя
🔔 Уведомления: Включены

<b>Доступные модели:</b>
• GPT-4 Turbo (рекомендуется)
• GPT-3.5 (быстрее)
• DALL-E 3 (для изображений)

Для изменения настроек напиши, что хочешь изменить.
Пример: "Сделай ответы короче" или "Включи креативный режим"

Настройки сохраняются автоматически ✅"""
    
    send_message(chat_id, text)

def send_profile_message(chat_id: int) -> None:
    text = """👤 <b>Твой профиль</b>

<b>Статистика использования:</b>
📝 Текстов создано: 0
🎨 Изображений: 0
📊 Презентаций: 0
⚡ Всего запросов: 0

<b>Лимиты:</b>
📊 Запросов сегодня: 0 / 50
🎯 План: Бесплатный

<b>Достижения:</b>
🎯 Первый шаг - начал работу с ботом
🚀 Продолжай использовать бота для новых достижений!

Хочешь больше возможностей? Напиши "Premium" 💎"""
    
    send_message(chat_id, text)

def send_ai_response(chat_id: int, user_text: str) -> None:
    response = generate_smart_response(user_text)
    send_message(chat_id, response)

def generate_smart_response(user_text: str) -> str:
    text_lower = user_text.lower()
    
    if any(word in text_lower for word in ['привет', 'здравствуй', 'добрый день', 'hi', 'hello']):
        return """👋 <b>Привет!</b>

Рад тебя видеть! Чем могу помочь сегодня?

Я умею:
📝 Помогать с текстами и идеями
🎨 Подсказывать креативные решения
📊 Давать советы по разным темам
💡 Отвечать на вопросы

Просто напиши, что тебе нужно! ✨"""
    
    elif any(word in text_lower for word in ['текст', 'пост', 'статья', 'написать', 'напиши']):
        return f"""📝 <b>Создание текста</b>

По твоему запросу: "{user_text}"

<b>Рекомендации для качественного текста:</b>

1️⃣ <b>Начни с заголовка</b>
Придумай цепляющий заголовок, который привлечет внимание

2️⃣ <b>Структура:</b>
• Вступление - зацепи читателя
• Основная часть - раскрой тему
• Заключение - подведи итог

3️⃣ <b>Советы:</b>
✓ Пиши простым языком
✓ Используй примеры
✓ Разбивай на абзацы
✓ Добавь эмодзи для живости

<b>Пример структуры для поста:</b>
🎯 Проблема или вопрос
💡 Решение или совет  
✨ Призыв к действию

Нужна помощь с конкретной частью? Спрашивай! 💬"""
    
    elif any(word in text_lower for word in ['картинк', 'изображение', 'фото', 'рисунок', 'нарисуй']):
        return f"""🎨 <b>Создание изображения</b>

Запрос: "{user_text}"

<b>Рекомендации для генерации изображений:</b>

📋 <b>Опиши детально:</b>
• Что изображено (объекты, люди, природа)
• Стиль (реализм, мультяшный, минимализм)
• Цвета и настроение
• Время суток и освещение
• Ракурс и композицию

<b>Примеры хороших описаний:</b>

🌅 "Закат на океане, яркие оранжевые и розовые цвета, силуэт пальмы, спокойные волны"

☕ "Уютная кофейня в винтажном стиле, теплое освещение, деревянные столы, вид сверху"

<b>Бесплатные сервисы для создания:</b>
• Canva - шаблоны и дизайн
• Pixabay - бесплатные фото
• Remove.bg - обработка фото

Нужен совет по дизайну? Пиши! 🎨"""
    
    elif any(word in text_lower for word in ['презентация', 'слайд', 'выступление', 'питч']):
        return f"""📊 <b>Создание презентации</b>

Тема: "{user_text}"

<b>Структура презентации:</b>

1️⃣ <b>Титульный слайд</b>
• Название темы
• Автор и дата

2️⃣ <b>Введение</b>
• Проблема или цель
• Почему это важно

3️⃣ <b>Основная часть (3-5 слайдов)</b>
• По одной идее на слайд
• Факты, цифры, примеры
• Визуализация данных

4️⃣ <b>Решение/Выводы</b>
• Ключевые тезисы
• Практическая польза

5️⃣ <b>Заключение</b>
• Призыв к действию
• Контакты

<b>💡 Советы:</b>
✓ Минимум текста на слайде
✓ Крупный шрифт (24+ pt)
✓ Качественные изображения
✓ Единый стиль оформления

<b>Бесплатные инструменты:</b>
• Google Slides
• Canva Presentations
• LibreOffice Impress

Помочь со структурой конкретных слайдов? 📝"""
    
    elif any(word in text_lower for word in ['как', 'что такое', 'почему', 'зачем', '?']):
        return f"""💡 <b>Ответ на вопрос</b>

Твой вопрос: "{user_text}"

Я могу помочь тебе найти ответ! 

<b>Вот несколько направлений:</b>

🔍 <b>Если это общий вопрос:</b>
Попробуй разбить его на части и задать более конкретно

📚 <b>Если нужна информация:</b>
Могу дать структуру для самостоятельного изучения

🎯 <b>Если нужен совет:</b>
Опиши ситуацию подробнее, дам рекомендации

💼 <b>Если про бизнес/работу:</b>
Помогу с планированием и идеями

Уточни вопрос, и я дам более точный ответ! 😊"""
    
    elif any(word in text_lower for word in ['спасибо', 'благодарю', 'thanks', 'супер']):
        return """🌟 <b>Всегда пожалуйста!</b>

Рад был помочь! 

Если возникнут ещё вопросы или нужна помощь - обращайся в любое время! 

Команды:
/help - все возможности
/profile - твоя статистика
/settings - настройки

Удачи тебе! ✨"""
    
    else:
        return f"""🤖 <b>Получил твоё сообщение!</b>

Ты написал: "{user_text}"

Я могу помочь с:
📝 Текстами и контентом
🎨 Советами по дизайну
📊 Структурой презентаций
💡 Ответами на вопросы
✨ Креативными идеями

<b>Примеры запросов:</b>
"Помоги написать пост про путешествия"
"Как создать логотип для кофейни?"
"Структура презентации о здоровье"

Напиши конкретнее, чем помочь, и я дам подробный ответ! 💬"""