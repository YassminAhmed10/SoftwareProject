# 🆓 How to Get FREE Google Gemini API Key

## Step 1: Go to Google AI Studio
Open your browser and go to:
👉 **https://makersuite.google.com/app/apikey**

## Step 2: Sign in with Google Account
- Use your Gmail account
- Accept the terms

## Step 3: Create API Key
- Click **"Create API Key"**
- Click **"Create API key in new project"**
- Copy the API key (starts with: `AIza...`)

## Step 4: Add to Project
1. Open: `SoftwareBackend/system/backend/chatbot/openai_config.py`
2. Replace line 4:
   ```python
   GEMINI_API_KEY = "AIzaSy..."  # Your actual key
   ```

## Step 5: Restart Backend
- Close the PowerShell window running backend
- Run again:
  ```powershell
  cd C:\Users\LOQ\Downloads\Phase2\SoftwareBackend\system\backend
  daphne -b 127.0.0.1 -p 8001 config.asgi:application
  ```

## ✅ Done!
Your chatbot now uses **FREE Google Gemini AI**! 🎉

### Free Tier Limits:
- ✅ 60 requests per minute
- ✅ 1,500 requests per day
- ✅ 1 million tokens per month
- ✅ **Completely FREE forever!**

No credit card needed! 🎊
