export interface Admin {
  id: string
  email: string
  name: string
  role: "admin" | "superadmin"
  createdAt: string
}

export interface AdminSession {
  id: string
  adminId: string
  expiresAt: string
}

