/// <reference types="vite/client" />

/**
 * Nicely typed aliases for some `Object` Methods
 * - Numerical keys are BAD, resolve that issue upstream
 * - Discussion: https://stackoverflow.com/a/65117465/565877
 */
type ObjectKeys<T> = T extends object ? (keyof T)[] : string[];

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
