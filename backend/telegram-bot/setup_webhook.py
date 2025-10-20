import urllib.request
import json

TELEGRAM_TOKEN = "8441728491:AAEzZNjcCILZmMcbWg8PifAhC6b5aMIWjPQ"
WEBHOOK_URL = "https://functions.poehali.dev/34faca8c-18eb-4665-9c50-b582247444d1"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

def setup_webhook():
    url = f"{TELEGRAM_API}/setWebhook"
    data = {
        'url': WEBHOOK_URL
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print(f"Webhook setup result: {result}")
        return result

if __name__ == "__main__":
    setup_webhook()
