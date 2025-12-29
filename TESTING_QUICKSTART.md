# 🚀 RYYZ Store - Quick Testing Guide

## Quick Start

This guide will help you quickly set up and run tests for the RYYZ Store project.

---

## 📋 Prerequisites

### Frontend Testing
- Node.js 16+ installed
- npm or yarn package manager

### Backend Testing
- Python 3.8+ installed
- pip package manager

---

## ⚡ Quick Setup

### 1. Clone and Navigate
```bash
cd RYYZ-Store-Project
```

### 2. Frontend Test Setup
```bash
# Navigate to frontend
cd SoftwareProject/system

# Install dependencies
npm install

# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest @vitest/ui jsdom
```

### 3. Backend Test Setup
```bash
# Navigate to backend
cd SoftwareProject/system/backend

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
pip install pytest pytest-django pytest-cov coverage
```

---

## 🧪 Running Tests

### Frontend Tests

```bash
# Navigate to frontend directory
cd SoftwareProject/system

# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run specific test file
npm test -- LoginPage.test.jsx

# Run tests with UI (interactive)
npm run test:ui
```

**Expected Output:**
```
✓ src/__tests__/LoginPage.test.jsx (12 tests) 1234ms
✓ src/__tests__/Dashboard.test.jsx (8 tests) 892ms

Test Files  2 passed (2)
Tests  20 passed (20)
Coverage  85.4%
```

### Backend Tests

```bash
# Navigate to backend directory
cd SoftwareProject/system/backend

# Run all tests
python manage.py test

# Run specific app tests
python manage.py test accounts

# Run specific test file
python manage.py test accounts.tests.test_models

# Run specific test class
python manage.py test accounts.tests.test_models.UserModelTests

# Run specific test method
python manage.py test accounts.tests.test_models.UserModelTests.test_create_user_success

# Run with verbose output
python manage.py test --verbosity=2

# Run tests with coverage
coverage run --source='.' manage.py test
coverage report
coverage html  # Generate HTML report
```

**Expected Output:**
```
Ran 45 tests in 3.421s
OK

Creating test database...
.............................................
----------------------------------------------------------------------
Ran 45 tests in 3.421s

OK
Destroying test database...
```

### View Coverage Reports

**Frontend:**
```bash
# After running tests with --coverage
# Open coverage/index.html in browser
start coverage/index.html  # Windows
open coverage/index.html   # macOS
xdg-open coverage/index.html  # Linux
```

**Backend:**
```bash
# After running coverage commands
# Open htmlcov/index.html in browser
start htmlcov/index.html  # Windows
open htmlcov/index.html   # macOS
xdg-open htmlcov/index.html  # Linux
```

---

## 🔄 GitHub Actions (CI/CD)

### Automatic Testing

Tests run automatically on:
- Every push to `main` or `develop` branches
- Every pull request
- Manual workflow dispatch

### View Test Results

1. Go to GitHub repository
2. Click on "Actions" tab
3. Select the latest workflow run
4. View test results and coverage reports

### Download Coverage Reports

1. Navigate to workflow run
2. Scroll to "Artifacts" section
3. Download:
   - `frontend-coverage-18.x`
   - `backend-coverage-3.10`

---

## 📊 Test Configuration Files

### Frontend (package.json)

Add to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "vitest": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "jsdom": "^23.0.0"
  }
}
```

### Frontend (vite.config.js)

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
      ]
    }
  }
})
```

### Backend (pytest.ini)

Create `pytest.ini` in backend directory:

```ini
[pytest]
DJANGO_SETTINGS_MODULE = config.settings
python_files = tests.py test_*.py *_tests.py
python_classes = Test*
python_functions = test_*
addopts = --reuse-db --nomigrations
```

---

## 🐛 Troubleshooting

### Common Frontend Issues

**Issue: `Cannot find module '@testing-library/react'`**
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

**Issue: `ReferenceError: window is not defined`**
- Ensure `jsdom` environment is configured in vite.config.js

**Issue: Tests timing out**
```bash
# Increase timeout in test file
test('my test', async () => {
  // test code
}, 10000) // 10 second timeout
```

### Common Backend Issues

**Issue: `No module named 'django'`**
```bash
pip install django djangorestframework
```

**Issue: `ImproperlyConfigured: Requested setting`**
- Ensure DJANGO_SETTINGS_MODULE is set correctly
- Check pytest.ini configuration

**Issue: Database errors**
```bash
# Run migrations first
python manage.py migrate
# Or use --keepdb flag
python manage.py test --keepdb
```

---

## 📈 Coverage Goals

| Component | Minimum | Target | Current |
|-----------|---------|--------|---------|
| Frontend | 75% | 85% | TBD |
| Backend | 80% | 90% | TBD |
| Overall | 80% | 85% | TBD |

---

## ✅ Pre-Commit Checklist

Before committing code:

```bash
# 1. Run all tests
npm test && cd ../backend && python manage.py test

# 2. Check coverage
npm test -- --coverage
coverage run --source='.' manage.py test && coverage report

# 3. Run linters
npm run lint
pylint accounts/ config/

# 4. Verify build
npm run build
```

---

## 📝 Writing New Tests

### Frontend Test Template

```javascript
import { describe, test, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup
  })

  test('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Backend Test Template

```python
from django.test import TestCase

class MyModelTest(TestCase):
    def setUp(self):
        # Setup test data
        pass

    def test_something(self):
        # Test logic
        self.assertEqual(actual, expected)
```

---

## 🔗 Useful Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Django Testing](https://docs.djangoproject.com/en/stable/topics/testing/)
- [pytest Documentation](https://docs.pytest.org/)

---

## 👥 Team Support

Having trouble with tests? Contact:
- **Ramy Mohamed Kamal** - Backend testing
- **Yassmin Ahmed Hassan** - Frontend testing
- **Youssef Khaled Gaber** - UI component testing
- **Zeina Mohamed Bahget** - Integration testing

---

<div align="center">

**Happy Testing! 🎉**

*RYYZ Store Development Team*

</div>
