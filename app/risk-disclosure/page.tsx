import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RiskDisclosurePage() {
  return (
    <div className="container mx-auto py-12 px-4 relative z-10">
      <Card className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl">Risk Disclosure</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: March 15, 2025</p>

          <h2 className="text-xl font-bold mt-6 mb-3">1. Introduction</h2>
          <p>
            This Risk Disclosure is provided by InseparableFX ("we," "our," or "us") to inform you of the risks
            associated with trading foreign exchange (forex) and other financial instruments. This document cannot and
            does not disclose all risks and other significant aspects of trading forex. You should not engage in trading
            unless you understand the nature of the transactions you are entering into and the extent of your exposure
            to risk.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">2. Not Financial Advice</h2>
          <p>
            The information provided by InseparableFX, including all signals, analysis, news, and educational content,
            is for informational purposes only and should not be construed as financial advice, investment advice, or a
            recommendation to buy, sell, or hold any financial instrument. We are not financial advisors, and we do not
            take into account your personal financial situation, goals, or risk tolerance.
          </p>
          <p>
            You should consult with a qualified financial advisor before making any investment decisions. You are solely
            responsible for your trading decisions, and you should conduct your own research and due diligence before
            trading.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">3. High Risk Investment</h2>
          <p>
            Trading forex and other financial instruments involves a high level of risk and may not be suitable for all
            investors. The high degree of leverage that is often obtainable in forex trading can work against you as
            well as for you. The use of leverage can lead to large losses as well as gains.
          </p>
          <p>
            You should be aware that you may lose a substantial amount or even all of your initial investment. If the
            market moves against your position, you may be called upon to deposit additional margin funds at short
            notice. If you fail to comply with a request for additional funds within the time prescribed, your position
            may be liquidated at a loss and you will be liable for any resulting deficit.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">4. No Guarantee of Results</h2>
          <p>
            Past performance is not indicative of future results. The performance of any trading system or methodology
            is not necessarily indicative of future results. No representation is being made that any account will or is
            likely to achieve profits or losses similar to those shown on our website or in our signals.
          </p>
          <p>
            Trading results may vary from person to person. Factors that may affect your results include your financial
            resources, risk tolerance, trading strategy, and market conditions.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">5. Technical and Operational Risks</h2>
          <p>Trading forex involves technical and operational risks. These include, but are not limited to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Internet connectivity issues</li>
            <li>Hardware or software failures</li>
            <li>Delays in receiving market data</li>
            <li>Delays in order execution</li>
            <li>Errors in signal generation or transmission</li>
          </ul>
          <p>
            We do not guarantee that our services will be uninterrupted or error-free. You should have contingency plans
            in place to manage these risks.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">6. Market Risks</h2>
          <p>The forex market is subject to numerous risks, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Volatility: Prices can fluctuate rapidly and unpredictably</li>
            <li>Liquidity: Some markets may become illiquid, making it difficult to close positions</li>
            <li>Gaps: Prices may gap up or down, particularly after weekends or news events</li>
            <li>Slippage: Orders may be executed at prices different from those requested</li>
            <li>Economic events: News and economic data can cause sudden market movements</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">7. Signal Accuracy</h2>
          <p>
            While we strive to provide accurate and timely signals, we cannot guarantee the accuracy or reliability of
            our signals. Signals are generated based on technical analysis, algorithms, and other methodologies, which
            have inherent limitations.
          </p>
          <p>
            Signals may not account for all market factors, and market conditions can change rapidly. You should always
            use your own judgment and analysis when trading based on our signals.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">8. Regulatory and Legal Risks</h2>
          <p>
            Forex trading is subject to regulatory and legal risks. Regulations can change, and what is permissible in
            one jurisdiction may not be in another. You are responsible for complying with all applicable laws and
            regulations in your jurisdiction.
          </p>
          <p>
            Some jurisdictions have restrictions on forex trading or require specific licenses or registrations. You
            should consult with legal and tax professionals regarding the legal and tax implications of your trading
            activities.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">9. Psychological Risks</h2>
          <p>
            Trading can be emotionally challenging. Fear, greed, hope, and other emotions can affect your
            decision-making and lead to poor trading outcomes. You should be aware of these psychological factors and
            develop strategies to manage them.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">10. Risk Management</h2>
          <p>Proper risk management is essential for successful trading. This includes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Setting appropriate stop-loss orders</li>
            <li>Not risking more than you can afford to lose</li>
            <li>Diversifying your investments</li>
            <li>Not using excessive leverage</li>
            <li>Having a clear trading plan and sticking to it</li>
          </ul>
          <p>We strongly recommend that you implement proper risk management strategies in your trading activities.</p>

          <h2 className="text-xl font-bold mt-6 mb-3">11. Conclusion</h2>
          <p>
            This Risk Disclosure is not exhaustive and does not disclose all risks associated with forex trading.
            Trading forex and other financial instruments involves significant risk and may not be suitable for
            everyone. You should carefully consider your investment objectives, level of experience, and risk appetite
            before trading.
          </p>
          <p>If you have any questions about this Risk Disclosure, please contact us at risk@inseparablefx.com.</p>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Return to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

