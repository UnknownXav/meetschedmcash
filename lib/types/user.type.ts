import type { UserRole } from "../services/database.enum"

export type Role = UserRole

export interface User {
  id: string
  email: string
  username: string
  role: Role
}