import { describe, it, expect } from 'vitest'
import { getInitials } from '../ProfilePage'

describe('getInitials', () => {
  it('returns initials from two-word name', () => {
    expect(getInitials('Ricardo Lecheta')).toBe('RL')
  })

  it('returns first two chars for single-word name', () => {
    expect(getInitials('Admin')).toBe('AD')
  })

  it('returns ? for empty string', () => {
    expect(getInitials('')).toBe('?')
  })

  it('returns ? for whitespace-only string', () => {
    expect(getInitials('   ')).toBe('?')
  })

  it('uses only first two words when name has more', () => {
    expect(getInitials('João da Silva')).toBe('JD')
  })

  it('uppercases result', () => {
    expect(getInitials('alice bob')).toBe('AB')
  })
})
