// Small, dependency-free form validation helpers used across the app's forms.

/** True if the value is only digits/spaces/symbols and contains no letters at all. */
export function isOnlyNumbers(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  return /^[0-9\s\-+./]+$/.test(v) && /\d/.test(v);
}

/** For name/text fields: warn if the person typed numbers instead of words. */
export function textFieldError(value: string, label = "This field"): string | null {
  if (!value.trim()) return null;
  if (isOnlyNumbers(value)) return `${label} looks like a number — please enter text (letters), not digits.`;
  return null;
}

/** For phone fields: must contain a reasonable number of digits. */
export function phoneFieldError(value: string): string | null {
  if (!value.trim()) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7) return "Please enter a valid phone number (digits only, e.g. +971 50 000 0000).";
  if (/[a-zA-Z]/.test(value)) return "Phone number should not contain letters.";
  return null;
}

/** For email fields. */
export function emailFieldError(value: string): string | null {
  if (!value.trim()) return null;
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  return ok ? null : "Please enter a valid email address.";
}

/** For numeric-only fields (fare, amounts): warn if letters were typed. */
export function numberFieldError(value: string, label = "This field"): string | null {
  if (!value.trim()) return null;
  if (!/^\d+(\.\d+)?$/.test(value.trim())) return `${label} should be a number only (no letters or symbols).`;
  return null;
}

export function requiredError(value: string, label = "This field"): string | null {
  return value.trim() ? null : `${label} is required.`;
}
