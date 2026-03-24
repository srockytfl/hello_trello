import { describe, it, expect } from 'vitest'
import { getCopyrightYear } from './Footer'

describe('getCopyrightYear', () => {
  it('returns the current year as a number', () => {
    const year = getCopyrightYear()
    expect(typeof year).toBe('number')
    expect(year).toBe(new Date().getFullYear())
  })

  it('returns a year greater than or equal to 2026', () => {
    expect(getCopyrightYear()).toBeGreaterThanOrEqual(2026)
  })
})
