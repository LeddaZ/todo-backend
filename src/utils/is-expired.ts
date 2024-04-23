export function isExpired(dueDate: string): boolean {
  return Date.parse(dueDate) < Date.now()
}
