import { PolicyLayout } from "@/components/common/policy-layout";

export default function PrivacyPolicyPage() {
    return (
        <PolicyLayout
            title="Privacy Policy"
            description="Learn about how we collect, use, and protect your personal information."
            url="/privacy-policy"
        >
            <div className="space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Introduction</h2>
                    <p>
                        Welcome to LORDEVS. We are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about this privacy notice, or our practices with regards to your
                        personal information, please contact us at info@lordevs.com.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                    <p>
                        We collect personal information that you voluntarily provide to us when you express an interest in
                        obtaining information about us or our products and services, when you participate in activities
                        on the Website or otherwise when you contact us.
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make and the products and features you use.</li>
                        <li>Information automatically collected. We automatically collect certain information when you visit, use or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website and other technical information.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                    <p>
                        We use personal information collected via our Website for a variety of business purposes described below.
                        We process your personal information for these purposes in reliance on our legitimate business interests,
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Will Your Information Be Shared With Anyone?</h2>
                    <p>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. How Long Do We Keep Your Information?</h2>
                    <p>
                        We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice,
                        unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">6. How Do We Keep Your Information Safe?</h2>
                    <p>
                        We aim to protect your personal information through a system of organizational and technical security measures.
                    </p>
                </section>
            </div>
        </PolicyLayout>
    );
}
