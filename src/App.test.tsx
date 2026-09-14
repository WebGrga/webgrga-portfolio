import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

vi.mock('./JourneyScene', () => ({ default: () => <div data-testid="journey-scene" /> }))

beforeEach(() => {
  window.sessionStorage.setItem('webgrga-intro-seen', 'true')
  window.localStorage.clear()
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => cleanup())

describe('portfolio', () => {
  it('shows the five public projects and their evidence', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /five bets/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Frontend Director' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ToDoOfSorts' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Gamefinder' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GearLog' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Momentum Lab' })).toBeInTheDocument()
  })

  it('changes the page-wide accent and surface theme', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /open color controls/i }))
    fireEvent.click(screen.getByRole('button', { name: /use Ferrari red accent/i }))
    fireEvent.click(screen.getByRole('button', { name: /use light surface/i }))
    expect(document.documentElement.dataset.accent).toBe('ferrari')
    expect(document.documentElement.dataset.surface).toBe('light')
    expect(window.localStorage.getItem('webgrga-accent')).toBe('ferrari')
  })

  it('moves through the journey with accessible controls', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /I learned by making things move/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /next journey stop/i }))
    expect(screen.getByRole('heading', { name: /Good-looking was not enough/i })).toBeInTheDocument()
  })
})
