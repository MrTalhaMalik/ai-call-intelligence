# 📞 AI Call Intelligence

> **Intelligent Telecom Call Analysis & Churn Prediction System**

A cutting-edge AI-powered platform that transcribes telecom customer service calls and leverages machine learning to predict customer churn, analyze sentiment, and identify upsell opportunities in real-time.

---

## ✨ Features

### 🎯 Core Capabilities

- **Call Transcription** - Automatic audio-to-text conversion using Whisper AI
- **Churn Risk Analysis** - ML-powered customer churn prediction with confidence scores
- **Sentiment Analysis** - Real-time customer sentiment tracking (Positive, Neutral, Frustrated, Angry)
- **Upsell Detection** - Intelligent identification of cross-sell and upsell opportunities
- **Agent Performance Metrics** - Comprehensive scoring on empathy, clarity, and professionalism
- **Business Intelligence** - Actionable insights from call transcripts with JSON-structured outputs

### 📊 Key Metrics

Each call analysis includes:
- **Sentiment Score** (0-1): Customer satisfaction level
- **Churn Risk Level** (Low/Medium/High): Probability of customer leaving
- **Churn Confidence** (0-1): Model confidence in churn prediction
- **Churn Triggers**: Specific reasons for churn risk
- **Objection Categories**: Price, Network Quality, Billing, Competitor Mention, Service Quality, Technical Issues
- **Agent Scores** (1-10): Empathy, Clarity, Professionalism
- **Resolution Status**: Resolved/Partially Resolved/Not Resolved

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- OpenAI API key
- Audio files in WAV, MP3, or FLAC format

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MrTalhaMalik/ai-call-intelligence.git
cd ai-call-intelligence
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure API key**
```bash
# In analyze.py, replace YOUR_OPENAI_API_KEY with your actual OpenAI API key
export OPENAI_API_KEY="your_api_key_here"
```

### Basic Usage

#### Step 1: Transcribe Calls
```bash
python transcribe.py
```
- Place audio files in the `CallDataTest/` directory
- Outputs: `transcripts.csv` containing call transcriptions

#### Step 2: Analyze Transcripts
```bash
python analyze.py
```
- Reads transcripts from `transcripts.csv`
- Outputs: `analyzed_calls.csv` with full intelligence metrics

---

## 📁 Project Structure

```
ai-call-intelligence/
├── transcribe.py              # Audio → Text conversion pipeline
├── analyze.py                 # Transcript → Intelligence analysis
├── analyzeDatabase.py         # Batch analysis for databases
├── requirements.txt           # Python dependencies
├── CallData/                  # Production audio data
├── CallDataTest/              # Test audio samples
├── Call Analysis.pbix         # Power BI dashboard
├── csvmaker.ipynb            # Data preprocessing notebook
└── README.md                  # This file
```

---

## 🔧 Configuration

### Environment Variables

```python
# analyze.py
INPUT_CSV = "transcripts.csv"          # Input transcript file
OUTPUT_CSV = "analyzed_calls.csv"      # Output analysis results
client = OpenAI(api_key="YOUR_KEY")    # OpenAI API configuration
```

### Transcription Settings

```python
# transcribe.py
AUDIO_DIR = "CallDataTest"             # Audio files directory
OUTPUT_CSV = "transcripts.csv"         # Transcription output
WHISPER_MODEL = "small.en"             # Model size (tiny, base, small, medium, large)
```

---

## 📊 Output Format

### Analyzed Call Data

Each analyzed call contains:

```json
{
  "customer_sentiment": "Positive",
  "sentiment_score": 0.85,
  "churn_risk_level": "Low",
  "churn_confidence": 0.15,
  "churn_trigger_reasons": ["None"],
  "upsell_detected": true,
  "upsell_confidence": 0.78,
  "suggested_product": "Premium Data Plan",
  "objection_category": "None",
  "resolution_status": "Resolved",
  "empathy_score": 9,
  "clarity_score": 8,
  "professionalism_score": 9,
  "call_summary": "Customer inquired about data plans. Agent provided recommendations and upsell opportunity identified. Customer satisfied with resolution."
}
```

---

## 📈 Technology Stack

### Core Libraries

| Library | Purpose |
|---------|---------|
| **OpenAI** | GPT-4o-mini LLM for call analysis |
| **Faster Whisper** | High-performance speech-to-text |
| **Pandas** | Data manipulation and CSV handling |
| **PyTorch** | ML inference backend |
| **ONNX Runtime** | Optimized model execution |

### Data Processing

- **CUDA Support**: GPU acceleration for faster processing
- **Audio Formats**: WAV, MP3, FLAC
- **Language Support**: English (configurable)

---

## 💡 Use Cases

### 1. **Churn Prevention**
- Identify at-risk customers in real-time
- Flag high-churn conversations for immediate intervention
- Track churn triggers across the organization

### 2. **Quality Assurance**
- Monitor agent performance metrics
- Identify training opportunities
- Track resolution effectiveness

### 3. **Revenue Growth**
- Detect upsell opportunities automatically
- Recommend products based on call context
- Measure cross-sell success rates

### 4. **Customer Experience**
- Analyze sentiment trends
- Identify pain points
- Improve service delivery

---

## 📊 Dashboard & Reporting

The project includes **Call Analysis.pbix** - A Power BI dashboard featuring:

- Real-time call sentiment distribution
- Churn risk heatmaps
- Agent performance leaderboards
- Upsell opportunity tracking
- Revenue impact analysis

---

## 🔐 Security & Privacy

- **API Key Management**: Use environment variables, never hardcode keys
- **Data Handling**: Transcripts contain sensitive customer information
- **Compliance**: Ensure GDPR, CCPA compliance for call data storage
- **Audit Trail**: Log all analyses for compliance requirements

---

## 🚦 Performance Considerations

### Processing Speed

- **Transcription**: ~5-10 min for 1-hour audio (depends on model size)
- **Analysis**: ~10-20 sec per call (API dependent)
- **Batch Processing**: Scale with parallel processing

### Optimization Tips

1. Use smaller Whisper model for faster transcription (`tiny` or `base`)
2. Enable GPU acceleration for batch processing
3. Implement caching for repeated analyses
4. Use `gpt-4o-mini` for cost-effective analysis

---

## 🛠️ Advanced Usage

### Batch Analysis with Database

```bash
python analyzeDatabase.py
```

Process calls directly from database without CSV intermediate step.

### Custom Prompt Engineering

Edit the `system_prompt` and `user_prompt` in `analyze.py` to customize analysis output:

```python
system_prompt = """
You are an AI call analysis engine...
"""
```

---

## 📋 API Requirements

### OpenAI API

- **Model**: `gpt-4o-mini`
- **Temperature**: 0 (deterministic output)
- **Cost**: ~$0.15 per 1000 calls (approximate)

### Rate Limits

- Default: 3,500 requests/minute
- Adjust batch size if hitting limits

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `OPENAI_API_KEY not found` | Set API key in `analyze.py` |
| `No audio files found` | Ensure files are in `CallDataTest/` with correct extensions |
| `Empty transcript` | Check audio quality and language setting |
| `JSON parsing error` | Validate OpenAI response format (see logs) |
| `GPU out of memory` | Reduce batch size or use CPU mode |

---

## 📝 Example Workflow

```bash
# 1. Place your audio files in CallDataTest/
cp /path/to/calls/*.wav CallDataTest/

# 2. Transcribe all calls
python transcribe.py
# Output: transcripts.csv

# 3. Analyze transcripts
python analyze.py
# Output: analyzed_calls.csv

# 4. Review results in Power BI
# Open: Call Analysis.pbix
```

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Support

For issues, questions, or suggestions:
- **GitHub Issues**: [Report bugs or request features](https://github.com/MrTalhaMalik/ai-call-intelligence/issues)
- **Email**: [Contact the maintainer](mailto:talhapk2021@gmail.com)

---

## 🎯 Roadmap

- [ ] Multi-language support (Spanish, French, Mandarin)
- [ ] Real-time call monitoring API
- [ ] Custom ML models for industry-specific analysis
- [ ] Automated reporting and alerting
- [ ] Speaker diarization (separate agent/customer audio)
- [ ] Emotion detection (beyond sentiment)
- [ ] Integration with CRM systems

---

## 📚 References

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Faster Whisper GitHub](https://github.com/guillaumekln/faster-whisper)
- [GPT-4 Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)

---

<div align="center">

**Built with ❤️ by [MrTalhaMalik](https://github.com/MrTalhaMalik)**

⭐ If you find this project useful, please consider starring it!

</div>
