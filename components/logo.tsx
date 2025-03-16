import Link from "next/link"
import Image from "next/image"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 relative">
        <Image
          src="https://i.postimg.cc/wMSV4NhN/Y-1-YXYKd-400x400.jpg"
          alt="Inseparable FX Logo"
          width={40}
          height={40}
          className="rounded-sm"
        />
      </div>
      <span className="text-xl font-bold text-white">InseparableFX</span>
    </Link>
  )
}

