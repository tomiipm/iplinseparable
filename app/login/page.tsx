import { LoginForm } from "@/components/auth/login-form"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="mb-8">
        <Link href="/" className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 relative">
            <Image
              src="https://i.postimg.cc/wMSV4NhN/Y-1-YXYKd-400x400.jpg"
              alt="Inseparable FX Logo"
              width={64}
              height={64}
              className="rounded-sm"
            />
          </div>
          <span className="text-xl font-bold text-white">InseparableFX</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  )
}

