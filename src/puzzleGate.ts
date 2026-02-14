const KEY_PUZZLE_OK = 'val_puzzle_ok_v1';

export function isPuzzleOpen() {
  return localStorage.getItem(KEY_PUZZLE_OK) === '1';
}

export function openPuzzle(code: string, expected: string) {
  const trimmed = String(code || '').trim();
  if (trimmed === expected) {
    localStorage.setItem(KEY_PUZZLE_OK, '1');
    return true;
  }
  return false;
}

export function resetPuzzle() {
  localStorage.removeItem(KEY_PUZZLE_OK);
}
