import sys 
from transformers import BertForSequenceClassification, BertTokenizer
import torch
import feedparser
import json

model_path = "stefanstanescu03/fin-bert-sentiment-analysis-finetune-v1"
model = BertForSequenceClassification.from_pretrained(model_path)

tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-pretrain')

def predict_sentiment(input_text):
    inputs = tokenizer(input_text, return_tensors="pt", truncation=True, padding=True)

    with torch.no_grad():
        outputs = model(**inputs)

    predicted_label = torch.argmax(outputs.logits, dim=1).item()

    label_map = {0: 'negative', 1: 'neutral', 2: 'positive'}
    predicted_sentiment = label_map[predicted_label]

    return predicted_sentiment

def main(filename, topic):
    rss_feeds = {
        "MarketWatch": "https://feeds.content.dowjones.io/public/rss/mw_topstories",
        "WS-Market-News": "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain",
        "WS-US-Business": "https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness",
        "WS-Economy": "https://feeds.content.dowjones.io/public/rss/socialeconomyfeed",
        "NY-Times": "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        "Google-News": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
        "Fortune": "https://fortune.com/feed/fortune-feeds/?id=3230629",
        "Business-Standard": "https://www.business-standard.com/rss/latest.rss",
        "Investing-Company": "https://www.investing.com/rss/news_356.rss",
        "Investing-Stocks-investing-ideas": "https://www.investing.com/rss/news_1065.rss",
        "Investing-Stocks": "https://www.investing.com/rss/news_25.rss",
        "Investing-Economy": "https://www.investing.com/rss/news_14.rss",
        "Investing-Crypto": "https://www.investing.com/rss/news_301.rss"
    }

    num_news = 0
    score = 0
    response = {'topic': topic, 'positives': [], 'negatives': [], 'neutrals': [], 'overall_score': 0}

    for source, url in rss_feeds.items():
        print("Now analyzing " + source)
        feed = feedparser.parse(url)
        for entry in feed.entries:
            if topic in entry.title:
                predicted_sentiment = predict_sentiment(entry.title)
                num_news += 1
                if predicted_sentiment == 'positive' and entry.title not in response['positives']:
                    response['positives'].append({'headline': entry.title, 'source': source, 'link': entry.link})
                    score += 1
                elif predicted_sentiment == 'negative' and entry.title not in response['negatives']:
                    response['negatives'].append({'headline': entry.title, 'source': source, 'link': entry.link})
                    score -= 1
                elif entry.title not in response['neutrals']:
                    response['neutrals'].append({'headline': entry.title, 'source': source, 'link': entry.link})
    
    if num_news != 0:
        response['overall_score'] = score / num_news

    with open(filename, "w") as f:
        json.dump(response, f, indent=4)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python app.py <output_filename> <topic>")
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])