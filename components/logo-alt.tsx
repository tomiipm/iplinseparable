import Link from "next/link"

export function LogoAlt() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-12 h-12 relative bg-gradient-to-br from-gray-800 to-black rounded-lg p-1">
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Multiple rotated squares for the frame effect */}
          <g transform="rotate(45, 200, 200)">
            {/* Outer frames with enhanced visibility for dark background */}
            <rect x="80" y="80" width="240" height="240" stroke="#4ade80" strokeWidth="8" fill="none" />
            <rect x="100" y="100" width="200" height="200" stroke="#4ade80" strokeWidth="6" fill="none" opacity="0.8" />
            <rect x="120" y="120" width="160" height="160" stroke="#4ade80" strokeWidth="4" fill="none" opacity="0.6" />

            {/* Stylized G with colors optimized for dark background */}
            <path
              d="M160 160 
                 C160 160, 240 160, 240 160
                 C280 160, 280 240, 240 240
                 C240 240, 180 240, 180 240
                 L180 200
                 L240 200
                 M160 160
                 C120 160, 120 240, 160 240
                 C160 240, 240 240, 240 240"
              stroke="#1a1a1a"
              strokeWidth="24"
              fill="white"
            />
          </g>

          {/* "inseparable" text with enhanced visibility */}
          <text
            x="270"
            y="100"
            transform="rotate(45, 270, 100)"
            fill="white"
            className="text-[24px]"
            style={{
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
          >
            inseparable
          </text>
        </svg>
      </div>
      <span className="text-xl font-bold text-white">InseparableFX</span>
    </Link>
  )
}

