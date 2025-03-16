import { SignalHistory } from "@/components/signal-history"
import { SubscriptionStatus } from "@/components/subscription-status"
import { TradingView } from "@/components/trading-view"
import { FallbackChart } from "@/components/fallback-chart"
import { SignalPanel } from "@/components/signal-panel"
import { BackgroundChartAnimation } from "@/components/background-chart-animation"
import { RealTimePriceList } from "@/components/real-time-price-list"
import { RealTimeTrendPanel } from "@/components/real-time-trend-panel"
import { ErrorBoundary } from "react-error-boundary"

export default function DashboardPage() {
  return (
    <>
      <BackgroundChartAnimation />
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ErrorBoundary fallback={<FallbackChart />}>
              <TradingView />
            </ErrorBoundary>
          </div>
          <div className="space-y-6">
            <SubscriptionStatus />
            <RealTimePriceList />
          </div>
        </div>

        <div className="mt-6">
          <SignalPanel />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SignalHistory />
          <RealTimeTrendPanel />
        </div>
      </div>
    </>
  )
}

