# Financial News aggregator
This Python script performs sentiment analysis on news headlines related to a specified topic by leveraging a fine-tuned finBERT model. It collects headlines from multiple RSS feeds, filters them by the given topic keyword, and predicts whether each headline conveys a positive, neutral, or negative sentiment. The script aggregates the headlines according to their predicted sentiment and calculates an overall sentiment score based on the frequency of positive and negative news. Finally, it generates a detailed report saved locally, summarizing the categorized news and the overall sentiment trend for the specified topic. The report is written in a filed called "report.txt" in the same directory with the script.

The model have been fine-tuned using [Financial PhraseBank](https://huggingface.co/datasets/takala/financial_phrasebank) dataset.

## Running the script

### Locally
```
pip install --no-cache-dir -r requirements.txt
python .\app.py <results_destination> <subject>
```
### API
```
fastapi dev api.py
```
### Docker container
```
docker build -t news-aggregator .
docker run --rm -v ${PWD}/<local_output_folder>:/app/output news-aggregator <subject> output/<output_filename>
```