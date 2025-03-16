import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function RiskWarning() {
  return (
    <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle className="text-white font-bold">Risk Warning</AlertTitle>
      <AlertDescription className="text-gray-200">
        <p className="mb-2">
          Trading foreign exchange and other financial instruments carries a high level of risk and may not be suitable
          for all investors. Before deciding to trade, you should carefully consider your investment objectives, level
          of experience, and risk appetite.
        </p>
        <p className="mb-2">
          The possibility exists that you could sustain a loss of some or all of your initial investment and therefore
          you should not invest money that you cannot afford to lose. You should be aware of all the risks associated
          with trading and seek advice from an independent financial advisor if you have any doubts.
        </p>
        <p className="mb-2">
          Past performance of any trading system or methodology is not necessarily indicative of future results. No
          representation is being made that any account will or is likely to achieve profits or losses similar to those
          shown.
        </p>
        <p>
          The signals provided by InseparableFX are for informational purposes only and do not constitute financial
          advice. There is no guarantee that the signals will be accurate or result in profitable trades. Always conduct
          your own research before making any trading decisions.
        </p>
      </AlertDescription>
    </Alert>
  )
}

