import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function CompactRiskWarning() {
  return (
    <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white text-sm p-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <AlertDescription className="text-gray-200">
          Trading involves significant risk of loss and may not be suitable for all investors. Past performance is not
          indicative of future results.
        </AlertDescription>
      </div>
    </Alert>
  )
}

