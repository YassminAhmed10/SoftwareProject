# RYYZ AI Chatbot - OpenAI Integration

## 🤖 Features
- **Smart AI Assistant** powered by OpenAI GPT
- **Natural Language Understanding** - understands casual conversation
- **Product Recommendations** from RYYZ store
- **Fallback System** - works without OpenAI API too

## 🔑 Setup OpenAI API

### Step 1: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create an account or login
3. Click "Create new secret key"
4. Copy your API key

### Step 2: Add API Key to Project
1. Open `backend/chatbot/openai_config.py`
2. Replace `"your-api-key-here"` with your actual API key:
   ```python
   OPENAI_API_KEY = "sk-proj-xxxxxxxxxxxx"  # Your real API key
   ```

### Step 3: Choose Model
In `openai_config.py`, select your preferred model:
- **gpt-3.5-turbo** - Cheaper, faster (recommended for testing)
- **gpt-4** - More powerful, expensive

```python
OPENAI_MODEL = "gpt-3.5-turbo"  # or "gpt-4"
```

### Step 4: Restart Backend
```bash
# Stop the current backend (Ctrl+C in the terminal)
# Then restart:
cd SoftwareBackend/system/backend
daphne -b 127.0.0.1 -p 8001 config.asgi:application
```

## 💡 How It Works

### With OpenAI API:
- Understands natural language: "I'm looking for something warm and stylish"
- Extracts intent automatically
- Provides conversational responses
- Smart product recommendations

### Without OpenAI API (Fallback):
- Uses keyword matching
- Works with specific commands: "show me hoodies"
- Still functional, just less smart

## 💰 Cost Estimate

### GPT-3.5-Turbo Pricing:
- Input: $0.0005 per 1K tokens
- Output: $0.0015 per 1K tokens
- **~1000 messages = $1-2**

### GPT-4 Pricing:
- Input: $0.03 per 1K tokens  
- Output: $0.06 per 1K tokens
- **~1000 messages = $30-60**

**Recommendation:** Start with GPT-3.5-Turbo for development

## 🧪 Testing

### Test Commands:
1. **Simple greeting:** "Hi"
2. **Natural request:** "I need something to keep me warm"
3. **Specific request:** "Show me black hoodies under 400 LE"
4. **Color preference:** "Do you have anything in pink?"
5. **Price question:** "What's your cheapest jacket?"

### Expected Behavior:
- ✅ Understands casual language
- ✅ Extracts preferences (color, category, price)
- ✅ Shows relevant products with images
- ✅ Friendly conversational tone

## 🔒 Security

**Important:** Never commit your API key to Git!

Add to `.gitignore`:
```
chatbot/openai_config.py
*.env
```

## 📊 Monitoring Usage

Check your usage at: https://platform.openai.com/usage

## ❌ Troubleshooting

### "OpenAI API Error"
- Check your API key is correct
- Verify you have credits in your OpenAI account
- Check internet connection

### Chatbot not using AI
- Verify API key is set in `openai_config.py`
- Restart the backend server
- Check backend logs for errors

### Costs too high
- Switch to GPT-3.5-Turbo
- Add rate limiting
- Cache common responses

## 🎯 Current Status

Without API Key:
- ✅ Rule-based chatbot working
- ✅ Product search working
- ✅ Image display working
- ⚠️ Limited language understanding

With API Key:
- ✅ All above features
- ✅ Natural language understanding
- ✅ Smart conversations
- ✅ Better user experience

---

**Ready to use!** Just add your OpenAI API key and restart the backend. 🚀
