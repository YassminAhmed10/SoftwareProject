# 🚀 Quick Start - AI Chatbot (For Beginners)

## What You Have Now ✅

Your chatbot can now:
- ✅ Answer customer questions intelligently using AI
- ✅ Show product images based on customer requests
- ✅ Recommend products for specific occasions (like "coffee outside")
- ✅ Handle support queries (shipping, returns, sizing, etc.)
- ✅ Remember conversation context
- ✅ Work on your existing website

## 3-Minute Setup 🎯

### Step 1: Get OpenAI API Key (2 minutes)
1. Visit: https://platform.openai.com/signup
2. Create account (or login)
3. Go to: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-proj-...`)

### Step 2: Add Your Key (30 seconds)
1. Open file: `backend/.env`
2. Find this line:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```
3. Replace `your-openai-api-key-here` with your actual key:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```
4. Save the file

### Step 3: Test It Works (30 seconds)
```bash
cd backend
python test_openai.py
```

If you see ✅ SUCCESS messages, you're ready!

## How to Run 🏃

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 - WebSocket:**
```bash
cd backend
daphne -p 8001 config.asgi:application
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

**Open browser:** http://localhost:5173 (login as customer)

## Test Questions to Try 🧪

**Product Recommendations:**
- "Show me hoodies"
- "I need something perfect for drinking coffee outside"
- "Show me black jackets under 500 LE"
- "What's good for cold weather?"

**Customer Support:**
- "What's your return policy?"
- "How long does shipping take?"
- "What sizes do you have?"
- "Do you ship to Alexandria?"

**Styling Advice:**
- "What should I wear to a casual dinner?"
- "Outfit ideas for outdoor activities?"

## 💰 Costs (Don't Worry!)

**Using gpt-4o-mini (recommended for beginners):**
- 100 conversations/month: ~$0.50
- 1,000 conversations/month: ~$3-5
- Very affordable for small to medium stores!

**First $5 of credits are often FREE from OpenAI!**

## Files You Created 📁

```
backend/
├── .env                           # ⭐ Your API key goes here
├── .env.example                   # Template (safe to share)
├── test_openai.py                 # ⭐ Test script - run this first!
├── requirements.txt               # Updated with OpenAI
└── chatbot/
    ├── consumers.py               # ⭐ Main AI chatbot logic
    ├── knowledge_base.py          # ⭐ Store information & FAQs
    ├── product_recommender.py     # ⭐ Product matching AI
    ├── product_filter.py          # Original filter (still works)
    └── routing.py                 # WebSocket routing
```

## Customization (Easy!) 🎨

### Change Store Information
Edit: `backend/chatbot/knowledge_base.py`
- Update store name, policies, shipping info
- Add new FAQs
- Customize recommendations

### Change AI Personality
Edit: `backend/chatbot/consumers.py`
Look for `build_system_prompt` function:
```python
return f"""You are [CHANGE THIS] AI Assistant...
```

### Change Cost/Quality Balance
Edit: `backend/.env`
```env
# Cheapest (recommended):
OPENAI_MODEL=gpt-4o-mini

# Better quality (more expensive):
OPENAI_MODEL=gpt-4o

# Best quality (most expensive):
OPENAI_MODEL=gpt-4-turbo
```

## Troubleshooting 🔧

### "API key not found" error?
- Check `backend/.env` file exists
- Make sure you saved the file after adding your key
- Restart the backend server

### Chatbot not connecting?
1. Make sure ALL 3 terminals are running (backend, websocket, frontend)
2. Check WebSocket server is on port 8001
3. Look in browser console (F12) for errors

### Products not showing?
- Make sure you have products in database
- Products need `stock > 0`
- Products should have images uploaded

### OpenAI errors?
- Check you have billing set up: https://platform.openai.com/account/billing
- Verify API key is correct
- Check you haven't hit rate limits

## What's Different from Before? 🆕

**Before:**
- Simple keyword matching ("show hoodies" worked)
- Basic product filtering
- No conversation memory
- Limited understanding

**Now with AI:**
- ✅ Understands natural language ("need something for coffee")
- ✅ Context-aware responses
- ✅ Remembers conversation
- ✅ Explains WHY products match
- ✅ Handles complex support questions
- ✅ More human-like conversations

## Next Level Features (Future) 🚀

Want to make it even better?

1. **Vector Search:** Semantic product search (finds similar products)
2. **Voice Input:** Speak instead of type
3. **Multi-language:** Arabic + English support
4. **Analytics:** Track popular questions
5. **A/B Testing:** Test different AI prompts

## Getting Help 📞

1. Read full guide: `AI_CHATBOT_SETUP_GUIDE.md`
2. Check OpenAI docs: https://platform.openai.com/docs
3. Test with: `python test_openai.py`

## Important Notes ⚠️

1. **Never share your API key** - Keep `.env` file private!
2. **Set billing alerts** in OpenAI dashboard
3. **Monitor usage** at: https://platform.openai.com/usage
4. **Start small** - Test with gpt-4o-mini first

## Success Checklist ✅

Before considering it "done":

- [ ] OpenAI API key added to `.env`
- [ ] `test_openai.py` runs successfully
- [ ] All 3 servers running (backend, websocket, frontend)
- [ ] Tested chatbot in browser as customer
- [ ] Products showing with images
- [ ] AI responds to questions
- [ ] Billing alert set in OpenAI account

---

## You're Ready! 🎉

Your AI-powered chatbot is now set up and ready to help your customers!

**Start testing and have fun!** 🚀

For detailed information, see: `AI_CHATBOT_SETUP_GUIDE.md`
