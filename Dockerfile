FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download models at build time
RUN python -c "from transformers import BertTokenizer, BertForSequenceClassification; \
               BertTokenizer.from_pretrained('yiyanghkust/finbert-pretrain'); \
               BertForSequenceClassification.from_pretrained('stefanstanescu03/fin-bert-sentiment-analysis-finetune-v1')"

COPY app.py .
EXPOSE 8000

ENTRYPOINT ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]