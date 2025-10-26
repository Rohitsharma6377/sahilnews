import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/Hero'

test('renders hero headline', () => {
  render(<Hero />)
  expect(screen.getByText(/Stay ahead with curated news/i)).toBeInTheDocument()
})
