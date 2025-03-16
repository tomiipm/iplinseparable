import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="mt-auto py-8 bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://i.postimg.cc/wMSV4NhN/Y-1-YXYKd-400x400.jpg"
                  alt="Inseparable FX Logo"
                  width={32}
                  height={32}
                  className="rounded-sm"
                />
              </div>
              <span className="text-lg font-bold text-white">InseparableFX</span>
            </Link>
          </div>
          <div className="flex gap-6">
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/risk-disclosure" className="text-gray-400 hover:text-white">
              Risk Disclosure
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} InseparableFX. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

