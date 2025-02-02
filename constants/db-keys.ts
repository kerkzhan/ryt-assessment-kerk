export const KEYS = {
  BALANCE: "@balance",
  HISTORY: "@history",
  CONTACTS: "@contacts",
} as const;

export type KEY_VALUES = (typeof KEYS)[keyof typeof KEYS];
