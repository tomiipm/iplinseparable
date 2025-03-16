import { AlertTriangle } from "lucide-react"

export function SmallRiskDisclaimer() {
  return (
    <div className="text-xs text-gray-400 border border-gray-700 rounded-md p-3 bg-gray-800/50">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0 text-yellow-500" />
        <p>
          <span className="font-semibold text-yellow-500">Risk Warning:</span> Trading forex and CFDs involves
          significant risk and may not be suitable for all investors. Past performance is not indicative of future
          results. Consider your experience, investment objectives, and financial resources before trading. You may lose
          more than your initial investment.
        </p>
      </div>
    </div>
  )
}

