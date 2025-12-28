# Quick Start Guide - AI Chatbot

## Prerequisites
- Python 3.8+ installed
- Node.js 14+ installed
- Django project set up
- React frontend set up

## Installation (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd backend
pip install channels==4.0.0 channels-redis==4.1.0
```

Or install from requirements.txt:
```bash
pip install -r requirements.txt
```

### Step 2: Verify Django Settings

The following should already be configured in `backend/config/settings.py`:

```python
INSTALLED_APPS = [
    # ... other apps
    'channels',
    'chatbot',
]

ASGI_APPLICATION = 'config.asgi.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer'
    }
}
```

### Step 3: Add Sample Products (Optional)

If you don't have products yet, add some via Django shell:

```bash
python manage.py shell
```

Then run:
```python
from orders.models import Product

# Add hoodies
Product.objects.create(
    name="Classic Black Hoodie",
    category="hoodies",
    price=450.00,
    stock=20,
    description="Comfortable black hoodie with premium fabric",
    is_active=True
)

Product.objects.create(
    name="Grey Comfort Hoodie",
    category="hoodies",
    price=380.00,
    stock=15,
    description="Soft grey hoodie perfect for casual wear",
    is_active=True
)

# Add jackets
Product.objects.create(
    name="Stylish Denim Jacket",
    category="jackets",
    price=550.00,
    stock=12,
    description="Classic denim jacket with modern styling",
    is_active=True
)

Product.objects.create(
    name="Black Leather Jacket",
    category="jackets",
    price=720.00,
    stock=8,
    description="Premium black leather jacket",
    is_active=True
)

exit()
```

### Step 4: Start Backend Server

```bash
# From backend directory
python manage.py runserver
```

You should see:
```
Django version X.X, using settings 'config.settings'
Starting ASGI/Channels version X.X development server at http://127.0.0.1:8000/
```

### Step 5: Start Frontend Server

In a new terminal:

```bash
cd frontend
npm install  # If not already installed
npm run dev
```

You should see:
```
VITE v4.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 6: Test the Chatbot

1. Open your browser to `http://localhost:5173`
2. You should see a purple AI icon in the bottom-right corner
3. Click the icon to open the chat
4. Try these test queries:
   - "Hi"
   - "Show me hoodies"
   - "I need a black jacket"
   - "Find me cheap hoodies"

## Troubleshooting

### Issue: "Module 'channels' not found"
**Solution**: Install channels
```bash
pip install channels==4.0.0
```

### Issue: "WebSocket connection failed"
**Solution**: 
1. Check if backend is running on port 8000
2. Verify URL in `Chatbot.jsx` is `ws://localhost:8000/ws/chatbot/`
3. Check browser console for specific error

### Issue: "No products returned"
**Solution**:
1. Verify products exist in database:
   ```bash
   python manage.py shell
   >>> from orders.models import Product
   >>> Product.objects.filter(is_active=True).count()
   ```
2. Check product categories contain "hoodie" or "jacket"

### Issue: Chatbot icon not visible
**Solution**:
1. Check browser console for errors
2. Verify `Chatbot.css` is loading
3. Check z-index isn't being overridden by other styles

### Issue: Messages not sending
**Solution**:
1. Check WebSocket connection status (should show "Online")
2. Verify backend server is running
3. Check browser console for WebSocket errors

## Testing

### Test Backend Filtering
```bash
cd backend
python manage.py shell < chatbot/test_filter.py
```

This will show:
- All hoodies/jackets in database
- Filter results for various queries
- Database statistics

### Test WebSocket Connection

Open browser DevTools → Network → WS tab to see WebSocket messages.

## Features to Try

1. **Basic queries**:
   - "Show me hoodies"
   - "I need a jacket"

2. **Color filtering**:
   - "Show me black hoodies"
   - "Find red jackets"

3. **Price filtering**:
   - "Show me cheap hoodies" (under 400 LE)
   - "I need a premium jacket" (over 500 LE)
   - "Find mid-range hoodies" (400-600 LE)

4. **Quick actions**:
   - Click "Show Hoodies" button
   - Click "Show Jackets" button

## Next Steps

1. **Customize responses**: Edit `backend/chatbot/consumers.py`
2. **Add more filters**: Extend `extract_filters()` method
3. **Style the chatbot**: Edit `frontend/src/components/Chatbot/Chatbot.css`
4. **Add AI integration**: Replace logic with OpenAI or similar
5. **Add to cart**: Integrate with CartContext

## File Structure

```
backend/
├── chatbot/
│   ├── __init__.py
│   ├── apps.py
│   ├── consumers.py         # WebSocket logic
│   ├── routing.py           # URL routing
│   ├── product_filter.py    # Filtering utility
│   └── test_filter.py       # Test script
└── config/
    ├── settings.py          # Django settings
    └── asgi.py              # ASGI config

frontend/
└── src/
    ├── App.jsx              # Main app (includes Chatbot)
    └── components/
        └── Chatbot/
            ├── Chatbot.jsx  # Chatbot component
            └── Chatbot.css  # Chatbot styles
```

## Documentation

- **Full Guide**: `docs/CHATBOT_GUIDE.md`
- **Implementation Summary**: `CHATBOT_IMPLEMENTATION.md`

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review `docs/CHATBOT_GUIDE.md`
3. Check Django logs for backend errors
4. Check browser console for frontend errors

---

**Congratulations!** Your AI chatbot is now ready to help customers find products! 🎉
