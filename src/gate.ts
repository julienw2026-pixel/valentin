const KEY_OK = 'val_gate_ok_v1';

export function isGateOpen() {
  return localStorage.getItem(KEY_OK) === '1';
}

export function openGate(code: string) {
  const trimmed = String(code || '').trim();
  // Lightweight gate (deterrent, not cryptographic security)
  if (trimmed === '0814') {
    localStorage.setItem(KEY_OK, '1');
    return true;
  }
  return false;
}

export function resetGate() {
  localStorage.removeItem(KEY_OK);
}
