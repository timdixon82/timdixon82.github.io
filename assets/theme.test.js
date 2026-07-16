// Unit tests for the theme bootstrap in theme.js.
//
// theme.js applies its resolved theme as an IIFE side effect at import
// time, before any test code runs, so each test that cares about the
// starting state resets the module registry and re-imports it after
// arranging localStorage and matchMedia. Tests that only exercise the
// public window.tdTheme helpers (set, toggleMode, toggleFamily) can
// reuse a single import.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function mockMatchMedia(prefersDark) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

async function freshImport() {
  vi.resetModules();
  await import('./theme.js');
}

describe('theme bootstrap: initial resolution', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to light when there is no saved theme and no dark preference', async () => {
    mockMatchMedia(false);
    await freshImport();
    expect(window.tdTheme.get()).toBe('light');
  });

  it('defaults to dark when there is no saved theme and the OS prefers dark', async () => {
    mockMatchMedia(true);
    await freshImport();
    expect(window.tdTheme.get()).toBe('dark');
  });

  it('uses the saved theme over the OS preference when one is stored', async () => {
    localStorage.setItem('td-theme', 'muted-light');
    mockMatchMedia(true);
    await freshImport();
    expect(window.tdTheme.get()).toBe('muted-light');
  });

  it('ignores an unrecognised saved value and falls back to the OS preference', async () => {
    localStorage.setItem('td-theme', 'not-a-real-theme');
    mockMatchMedia(true);
    await freshImport();
    expect(window.tdTheme.get()).toBe('dark');
  });
});

describe('theme bootstrap: window.tdTheme helpers', () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    mockMatchMedia(false);
    await freshImport();
  });

  it('lists all four required themes', () => {
    expect(window.tdTheme.themes).toEqual(['light', 'dark', 'muted-light', 'muted-dark']);
  });

  it('set() applies and persists a valid theme, and returns it', () => {
    const result = window.tdTheme.set('muted-dark');
    expect(result).toBe('muted-dark');
    expect(window.tdTheme.get()).toBe('muted-dark');
    expect(localStorage.getItem('td-theme')).toBe('muted-dark');
  });

  it('set() falls back to light for an unrecognised theme name, and persists the fallback', () => {
    const result = window.tdTheme.set('sepia');
    expect(result).toBe('light');
    expect(window.tdTheme.get()).toBe('light');
    expect(localStorage.getItem('td-theme')).toBe('light');
  });

  it('toggleMode() flips light to dark', () => {
    window.tdTheme.set('light');
    expect(window.tdTheme.toggleMode()).toBe('dark');
  });

  it('toggleMode() flips dark to light', () => {
    window.tdTheme.set('dark');
    expect(window.tdTheme.toggleMode()).toBe('light');
  });

  it('toggleMode() flips muted-light to muted-dark, keeping the muted family', () => {
    window.tdTheme.set('muted-light');
    expect(window.tdTheme.toggleMode()).toBe('muted-dark');
  });

  it('toggleMode() flips muted-dark to muted-light, keeping the muted family', () => {
    window.tdTheme.set('muted-dark');
    expect(window.tdTheme.toggleMode()).toBe('muted-light');
  });

  it('toggleFamily() flips light to muted-light, keeping the mode', () => {
    window.tdTheme.set('light');
    expect(window.tdTheme.toggleFamily()).toBe('muted-light');
  });

  it('toggleFamily() flips muted-light back to light', () => {
    window.tdTheme.set('muted-light');
    expect(window.tdTheme.toggleFamily()).toBe('light');
  });

  it('toggleFamily() flips dark to muted-dark, keeping the mode', () => {
    window.tdTheme.set('dark');
    expect(window.tdTheme.toggleFamily()).toBe('muted-dark');
  });

  it('toggleFamily() flips muted-dark back to dark', () => {
    window.tdTheme.set('muted-dark');
    expect(window.tdTheme.toggleFamily()).toBe('dark');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
