import { NextRequest, NextResponse } from "next/server"
import { authenticate, createSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ error: "البيانات مطلوبة" }, { status: 400 })
    }

    const user = await authenticate(String(email).toLowerCase(), String(password))
    if (!user) {
      return NextResponse.json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" }, { status: 401 })
    }

    await createSession({ id: user.id, email: user.email, role: user.role, fullName: user.fullName })
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role } })
  } catch {
    return NextResponse.json({ error: "تعذر تسجيل الدخول" }, { status: 500 })
  }
}
