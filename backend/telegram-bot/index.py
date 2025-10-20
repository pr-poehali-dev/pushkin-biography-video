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
    text = f"""✨ <b>AI ответ на твой запрос</b>

Ты написал: "{user_text}"

🤖 Я обработал твой запрос! В этой демо-версии показываю, как работает бот.

<b>Для полной функциональности нужно:</b>
• Подключить OpenAI API для генерации текстов
• Добавить DALL-E для создания изображений
• Интегрировать сервис для презентаций

Напиши /help для списка команд или продолжай общение! 💬"""
    
    send_message(chat_id, text)