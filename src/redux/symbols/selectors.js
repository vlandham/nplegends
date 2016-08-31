/**
 * Selectors for locationPage
 */

// import { createSelector } from 'reselect';

// ----------------------
// Input Selectors
// ----------------------

export function getSymbols(state) {
  const { symbols } = state;

  if (symbols.symbols && symbols.symbols.data) {
    return symbols.symbols.data;
  }

  return {};
}
