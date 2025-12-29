/**
 * Unit Tests for Login Page Component
 * Tests authentication functionality and user interactions
 */

import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from '../../pages/LoginPage'

// Mock the API service
vi.mock('../../service/apiservice', () => ({
  default: {
    login: vi.fn()
  }
}))

// Helper function to render with router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('LoginPage Component - Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  // ========== RENDERING TESTS ==========
  test('should render login form correctly', () => {
    renderWithRouter(<LoginPage />)
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  test('should render RYYZ Store branding', () => {
    renderWithRouter(<LoginPage />)
    
    expect(screen.getByText(/RYYZ Store/i)).toBeInTheDocument()
  })

  // ========== INPUT VALIDATION TESTS ==========
  test('should accept user input for username field', () => {
    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    
    expect(usernameInput.value).toBe('testuser')
  })

  test('should accept user input for password field', () => {
    renderWithRouter(<LoginPage />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    
    expect(passwordInput.value).toBe('password123')
  })

  test('should mask password input', () => {
    renderWithRouter(<LoginPage />)
    
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput.type).toBe('password')
  })

  // ========== AUTHENTICATION TESTS ==========
  test('should handle successful login with correct credentials', async () => {
    const mockLogin = vi.fn().mockResolvedValue({
      success: true,
      token: 'mock-jwt-token',
      user: { id: 1, username: 'testuser' }
    })

    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'correctPassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mock-jwt-token')
    })
  })

  test('should show error message with incorrect credentials', async () => {
    const mockLogin = vi.fn().mockRejectedValue({
      error: 'Invalid credentials'
    })

    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  // ========== FORM VALIDATION TESTS ==========
  test('should not submit form with empty fields', async () => {
    renderWithRouter(<LoginPage />)
    
    const loginButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })

  test('should display validation error for invalid username format', async () => {
    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    fireEvent.change(usernameInput, { target: { value: 'ab' } }) // Too short
    fireEvent.blur(usernameInput)

    await waitFor(() => {
      expect(screen.getByText(/username must be at least 3 characters/i)).toBeInTheDocument()
    })
  })

  // ========== NAVIGATION TESTS ==========
  test('should have link to signup page', () => {
    renderWithRouter(<LoginPage />)
    
    const signupLink = screen.getByText(/sign up/i)
    expect(signupLink).toBeInTheDocument()
    expect(signupLink.closest('a')).toHaveAttribute('href', '/signup')
  })

  test('should have forgot password link', () => {
    renderWithRouter(<LoginPage />)
    
    const forgotPasswordLink = screen.getByText(/forgot password/i)
    expect(forgotPasswordLink).toBeInTheDocument()
  })

  // ========== LOADING STATE TESTS ==========
  test('should show loading state during login', async () => {
    const mockLogin = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)))

    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const loginButton = screen.getByRole('button', { name: /login/i })

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.click(loginButton)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(loginButton).toBeDisabled()
  })

  // ========== ACCESSIBILITY TESTS ==========
  test('should have proper ARIA labels', () => {
    renderWithRouter(<LoginPage />)
    
    expect(screen.getByLabelText(/username/i)).toHaveAttribute('aria-label')
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-label')
  })

  test('should be keyboard navigable', () => {
    renderWithRouter(<LoginPage />)
    
    const usernameInput = screen.getByLabelText(/username/i)
    const passwordInput = screen.getByLabelText(/password/i)
    
    expect(usernameInput).toHaveAttribute('tabindex')
    expect(passwordInput).toHaveAttribute('tabindex')
  })
})
