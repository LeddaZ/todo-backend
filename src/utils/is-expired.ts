export function isExpired(dueDate: string): boolean {
  const now = new Date().setHours(0, 0, 0, 0)
  return Date.parse(dueDate) < now
}
