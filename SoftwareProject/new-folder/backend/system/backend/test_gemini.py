import google.generativeai as genai
from chatbot.openai_config import GEMINI_API_KEY, GEMINI_MODEL

print(f"Testing Gemini API key and model: {GEMINI_MODEL}")
print("=" * 50)

try:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(GEMINI_MODEL)
    
    # Test with a simple message
    response = model.generate_content("Hello! Can you help me find a pink hoodie?")
    
    print("✅ Gemini API is working!")
    print("\nTest Response:")
    print(response.text)
    
except Exception as e:
    print(f"❌ Error: {e}")
