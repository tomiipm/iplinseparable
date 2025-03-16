import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 relative z-10">
      <Card className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-gray-300">Last Updated: March 15, 2025</p>

          <h2 className="text-xl font-bold mt-6 mb-3">1. Introduction</h2>
          <p>
            At InseparableFX ("we," "our," or "us"), we respect your privacy and are committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you use our website, mobile application, and services (collectively, the "Services").
          </p>
          <p>
            Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have
            read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and
            practices, please do not use our Services.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our Services, including:</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">2.1. Personal Information</h3>
          <p>
            Personal information is information that identifies you as an individual. We may collect the following
            personal information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing information (such as credit card details)</li>
            <li>Account credentials</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4 mb-2">2.2. Usage Information</h3>
          <p>We may collect information about how you use our Services, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Log data (such as IP address, browser type, pages visited, time spent on pages)</li>
            <li>Device information (such as device type, operating system)</li>
            <li>Location information</li>
            <li>Trading preferences and history</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">3. How We Collect Information</h2>
          <p>We collect information through:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Direct interactions (when you register for an account, subscribe to our services, or contact us)</li>
            <li>Automated technologies (such as cookies, web beacons, and similar technologies)</li>
            <li>Third-party sources (such as payment processors)</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">4. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and maintaining our Services</li>
            <li>Processing your subscription and payments</li>
            <li>Sending you forex signals and related information</li>
            <li>Communicating with you about your account or our Services</li>
            <li>Improving our Services and developing new features</li>
            <li>Analyzing usage patterns and trends</li>
            <li>Detecting, preventing, and addressing technical issues or fraudulent activities</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">5. Disclosure of Your Information</h2>
          <p>We may disclose your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers (such as payment processors, hosting providers, and analytics providers)</li>
            <li>Business partners (with your consent)</li>
            <li>Legal authorities (when required by law or to protect our rights)</li>
            <li>Affiliated companies (as part of a corporate transaction, such as a merger or acquisition)</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 mb-3">6. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information from
            unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the
            Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">7. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need
            your personal information, we will securely delete or anonymize it.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">8. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate or incomplete personal information</li>
            <li>The right to delete your personal information</li>
            <li>The right to restrict or object to the processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Information"
            section below.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">9. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to collect information about your browsing activities and to improve
            your experience on our Services. You can manage your cookie preferences through your browser settings.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">10. Children's Privacy</h2>
          <p>
            Our Services are not intended for children under the age of 18. We do not knowingly collect personal
            information from children under 18. If you are a parent or guardian and believe that your child has provided
            us with personal information, please contact us, and we will delete such information from our systems.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">11. International Data Transfers</h2>
          <p>
            Your personal information may be transferred to and processed in countries other than the country in which
            you reside. These countries may have different data protection laws than your country of residence. We will
            take appropriate measures to ensure that your personal information remains protected in accordance with this
            Privacy Policy.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">12. Third-Party Links</h2>
          <p>
            Our Services may contain links to third-party websites or services. We are not responsible for the privacy
            practices or content of these third-party sites. We encourage you to review the privacy policies of any
            third-party sites you visit.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">13. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. If we make material changes, we will notify you by
            email or by posting a notice on our website. Your continued use of our Services after such modifications
            will constitute your acknowledgment of the modified Privacy Policy and agreement to be bound by it.
          </p>

          <h2 className="text-xl font-bold mt-6 mb-3">14. Contact Information</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us
            at:
          </p>
          <p className="mt-2">Email: privacy@inseparablefx.com</p>

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

