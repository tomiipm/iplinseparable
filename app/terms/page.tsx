import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskWarning } from "@/components/risk-warning"

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 relative z-10">
      <Card className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: March 15, 2025</p>

          <div className="my-6">
            <RiskWarning />
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">1. Introduction</h2>
          <p>
            Welcome to InseparableFX ("we," "our," or "us"). By accessing or using our website, mobile application, and
            services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please
            read these Terms carefully before using our Services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">2. Acceptance of Terms</h2>
          <p>
            By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by
            these Terms. If you do not agree to these Terms, you must not access or use our Services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">3. Eligibility</h2>
          <p>
            You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that
            you are at least 18 years old and have the legal capacity to enter into these Terms.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">4. Account Registration</h2>
          <p>
            To access certain features of our Services, you may need to register for an account. You agree to provide
            accurate, current, and complete information during the registration process and to update such information
            to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your account credentials and for all activities that occur under your
            account. You agree to notify us immediately of any unauthorized use of your account or any other breach of
            security.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">5. Subscription and Payments</h2>
          <p>
            5.1. <strong>Subscription Plans</strong>: We offer subscription plans that provide access to our forex
            signal services. The details of each subscription plan, including pricing and features, are available on our
            website.
          </p>
          <p>
            5.2. <strong>Payment</strong>: By subscribing to our Services, you agree to pay all fees associated with
            your subscription plan. All payments are processed through third-party payment processors, and you agree to
            comply with their terms and conditions.
          </p>
          <p>
            5.3. <strong>Automatic Renewal</strong>: Your subscription will automatically renew at the end of each
            subscription period unless you cancel it before the renewal date. You can cancel your subscription at any
            time through your account settings.
          </p>
          <p>
            5.4. <strong>Refunds</strong>: All payments are non-refundable except as required by law or as expressly
            stated in our refund policy.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">6. Forex Signals Disclaimer</h2>
          <p>
            6.1. <strong>No Investment Advice</strong>: Our forex signals are provided for informational purposes only
            and do not constitute investment advice. We do not recommend any specific investment or trading strategy.
          </p>
          <p>
            6.2. <strong>Risk Warning</strong>: Trading foreign exchange carries a high level of risk and may not be
            suitable for all investors. The high degree of leverage can work against you as well as for you. Before
            deciding to trade foreign exchange, you should carefully consider your investment objectives, level of
            experience, and risk appetite.
          </p>
          <p>
            6.3. <strong>No Guarantee of Results</strong>: Past performance is not indicative of future results. We do
            not guarantee any specific results from using our forex signals, and we are not responsible for any losses
            or damages resulting from your use of our Services.
          </p>
          <p>
            6.4. <strong>Market Volatility</strong>: The foreign exchange market is subject to high volatility and
            unpredictable changes. Prices may fluctuate rapidly, and gaps in market prices may occur due to various
            factors including economic events, news announcements, and market openings.
          </p>
          <p>
            6.5. <strong>Technical Issues</strong>: We cannot guarantee that our Services will be uninterrupted or
            error-free. Technical issues such as connectivity problems, delays, or system failures may affect the
            delivery of signals or the ability to execute trades based on those signals.
          </p>
          <p>
            6.6. <strong>Independent Decision Making</strong>: You are solely responsible for your trading decisions.
            Our signals should be used as one of many tools in your decision-making process, and you should always
            conduct your own analysis before executing any trade.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">7. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use our Services for any illegal purpose or in violation of any local, state, national, or international
              law
            </li>
            <li>
              Violate or encourage others to violate the rights of third parties, including intellectual property rights
            </li>
            <li>Share your account credentials with any third party</li>
            <li>Attempt to circumvent any security measures or access unauthorized areas of our Services</li>
            <li>Use our Services in any manner that could disable, overburden, damage, or impair our Services</li>
            <li>
              Use any robot, spider, or other automatic device, process, or means to access our Services for any purpose
            </li>
            <li>Introduce any viruses, Trojan horses, worms, logic bombs, or other harmful material to our Services</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">8. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our Services, including but not limited to text, graphics,
            logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive
            property of InseparableFX or our licensors and are protected by copyright, trademark, and other intellectual
            property laws.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our Services at our sole discretion,
            without notice, for any reason, including but not limited to a breach of these Terms.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">10. Disclaimer of Warranties</h2>
          <p>
            OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, OR NON-INFRINGEMENT.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL INSEPARABLEFX, ITS AFFILIATES, OR THEIR RESPECTIVE
            OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
            PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
            LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">12. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless InseparableFX, its affiliates, and their respective
            officers, directors, employees, and agents from and against any and all claims, liabilities, damages,
            losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from or relating to your
            violation of these Terms or your use of the Services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">13. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
            InseparableFX is registered, without regard to its conflict of law provisions.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">14. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will
            notify you by email or by posting a notice on our website. Your continued use of the Services after such
            modifications will constitute your acknowledgment of the modified Terms and agreement to be bound by them.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">15. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at support@inseparablefx.com.</p>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p>
              By using our Services, you acknowledge that you have read, understood, and agree to be bound by these
              Terms of Service.
            </p>
          </div>

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

