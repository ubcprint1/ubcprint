import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { compare } from "bcryptjs"
import { prisma } from "@/lib/prisma"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "change-this-secret")
const cookieName = "ubcprint_session"

export async function createSession(user: { id: string; email: string; role: string; fullName: string }) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)

  cookies().set(cookieName, token, { httpOnly: true, sameSite: "lax", path: "/" })
  return token
}

export async function clearSession() {
  cookies().set(cookieName, "", { expires: new Date(0), path: "/" })
}

export async function getSession() {
  const token = cookies().get(cookieName)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function authenticate(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) return null
  const isValid = await compare(password, user.passwordHash)
  if (!isValid) return null
  return user
}
