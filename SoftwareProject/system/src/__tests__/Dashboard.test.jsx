/**
 * Unit Tests for Dashboard Component
 * Tests dashboard rendering, data fetching, and user interactions
 */

import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'
import { DarkModeContext } from '../../Contexts/DarkModeContext'

// Mock API service
vi.mock('../../service/apiservice', () => ({
  default: {
    getDashboardStats: vi.fn(),
    getRecentOrders: vi.fn()
  }
}))

const renderWithProviders = (component, darkMode = false) => {
  return render(
    <BrowserRouter>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode: vi.fn() }}>
        {component}
      </DarkModeContext.Provider>
    </BrowserRouter>
  )
}

describe('Dashboard Component - Unit Tests', () => {
  const mockDashboardData = {
    totalRevenue: 125000,
    totalOrders: 542,
    totalCustomers: 1234,
    pendingOrders: 23
  }

  const mockRecentOrders = [
    { id: 1, customer: 'John Doe', amount: 250, status: 'completed' },
    { id: 2, customer: 'Jane Smith', amount: 180, status: 'pending' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ========== RENDERING TESTS ==========
  test('should render dashboard without crashing', () => {
    renderWithProviders(<Dashboard />)
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
  })

  test('should display stat cards', async () => {
    renderWithProviders(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText(/total revenue/i)).toBeInTheDocument()
      expect(screen.getByText(/total orders/i)).toBeInTheDocument()
      expect(screen.getByText(/total customers/i)).toBeInTheDocument()
    })
  })

  // ========== DATA FETCHING TESTS ==========
  test('should fetch and display dashboard statistics', async () => {
    const mockGetStats = vi.fn().mockResolvedValue(mockDashboardData)
    
    renderWithProviders(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('125000')).toBeInTheDocument()
      expect(screen.getByText('542')).toBeInTheDocument()
      expect(screen.getByText('1234')).toBeInTheDocument()
    })
  })

  test('should display loading state while fetching data', () => {
    renderWithProviders(<Dashboard />)
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  test('should handle API errors gracefully', async () => {
    const mockGetStats = vi.fn().mockRejectedValue(new Error('API Error'))
    
    renderWithProviders(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard/i)).toBeInTheDocument()
    })
  })

  // ========== DARK MODE TESTS ==========
  test('should apply dark mode styles when enabled', () => {
    renderWithProviders(<Dashboard />, true)
    
    const dashboard = screen.getByTestId('dashboard-container')
    expect(dashboard).toHaveClass('dark')
  })

  test('should apply light mode styles when disabled', () => {
    renderWithProviders(<Dashboard />, false)
    
    const dashboard = screen.getByTestId('dashboard-container')
    expect(dashboard).not.toHaveClass('dark')
  })

  // ========== RECENT ORDERS TESTS ==========
  test('should display recent orders section', async () => {
    renderWithProviders(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText(/recent orders/i)).toBeInTheDocument()
    })
  })

  test('should render order list when data is available', async () => {
    const mockGetOrders = vi.fn().mockResolvedValue(mockRecentOrders)
    
    renderWithProviders(<Dashboard />)
    
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })

  // ========== RESPONSIVE DESIGN TESTS ==========
  test('should be responsive on mobile devices', () => {
    global.innerWidth = 375
    global.dispatchEvent(new Event('resize'))
    
    renderWithProviders(<Dashboard />)
    
    const statsGrid = screen.getByTestId('stats-grid')
    expect(statsGrid).toHaveClass('grid-cols-1')
  })

  test('should show full layout on desktop', () => {
    global.innerWidth = 1920
    global.dispatchEvent(new Event('resize'))
    
    renderWithProviders(<Dashboard />)
    
    const statsGrid = screen.getByTestId('stats-grid')
    expect(statsGrid).toHaveClass('grid-cols-4')
  })
})
