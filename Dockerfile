FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN python -c "from transformers import BertTokenizer, BertForSequenceClassification; \
               BertTokenizer.from_pretrained('yiyanghkust/finbert-pretrain'); \
               BertForSequenceClassification.from_pretrained('stefanstanescu03/fin-bert-sentiment-analysis-finetune-v1')"

COPY app.py .
COPY finbert-finetune/ ./finbert-finetune/

ENTRYPOINT ["python", "app.py"]
CMD []