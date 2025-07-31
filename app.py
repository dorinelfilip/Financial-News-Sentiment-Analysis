import sys 
from transformers import BertForSequenceClassification, BertTokenizer
import torch
import feedparser

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

def main(topic):
    rss_feeds = {
        "MarketWatch": "https://feeds.content.dowjones.io/public/rss/mw_topstories",
        "WS-Market-News": "https://feeds.content.dowjones.io/public/rss/RSSMarketsMain",
        "WS-US-Business": "https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness",
        "WS-Economy": "https://feeds.content.dowjones.io/public/rss/socialeconomyfeed",
        "NY-Times": "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        "Google-News": "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en",
        "Fortune": "https://fortune.com/feed/fortune-feeds/?id=3230629",
        "Business-Standard": "https://www.business-standard.com/rss/latest.rss"
    }

    score = 0
    num_news = 0

    positives = []
    negatives = []
    neutrals = []

    print("Searching...")

    for source, url in rss_feeds.items():
        print("Now analyzing " + source)
        feed = feedparser.parse(url)
        for entry in feed.entries:
            if topic in entry.title:
                predicted_sentiment = predict_sentiment(entry.title)
                num_news += 1
                if predicted_sentiment == 'positive' and entry.title not in positives:
                    positives.append(entry.title + " - " + source + "\nlink: " + entry.link + "\n")
                    score += 1
                elif predicted_sentiment == 'negative' and entry.title not in negatives:
                    negatives.append(entry.title + " - " + source + "\nlink: " + entry.link + "\n")
                    score -= 1
                elif entry.title not in neutrals:
                    neutrals.append(entry.title + " - " + source + "\nlink: " + entry.link + "\n")

    if len(positives) == 0 and len(negatives) == 0 and len(neutrals) == 0:
        print("No new data for now")
    else:
        with open("report.txt", "a") as file:
            file.write("Report for " + topic + "\nPositive news\n")
            for news in positives:
                file.write(news + "\n")
            file.write("\nNegative news\n")
            for news in negatives:
                file.write(news + "\n")
            file.write("\nNeutral news\n")
            for news in neutrals:
                file.write(news + "\n")
            file.write("\nOverall score: " + str(score / num_news) + "\n\n")

if __name__ == '__main__':
    main(sys.argv[1])