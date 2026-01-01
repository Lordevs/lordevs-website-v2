import { PolicyLayout } from "@/components/common/policy-layout";

export default function CookiesPolicyPage() {
    return (
        <PolicyLayout
            title="Cookies Policy"
            description="Understand how we use cookies and similar technologies on our website."
            url="/cookies-policy"
        >
            <div className="space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. What Are Cookies?</h2>
                    <p>
                        Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                        Cookies are widely used by website owners in order to make their websites work, or to work more efficiently,
                        as well as to provide reporting information.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Why Do We Use Cookies?</h2>
                    <p>
                        We use first party and third party cookies for several reasons. Some cookies are required for technical
                        reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary"
                        cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience
                        on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. Types of Cookies We Use</h2>
                    <ul className="list-disc pl-6 space-y-4">
                        <li>
                            <strong>Essential Website Cookies:</strong> These cookies are strictly necessary to provide you with services
                            available through our Website and to use some of its features, such as access to secure areas.
                        </li>
                        <li>
                            <strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance
                            and functionality of our Website but are non-essential to their use.
                        </li>
                        <li>
                            <strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either
                            in aggregate form to help us understand how our Website is being used or how effective our marketing
                            campaigns are, or to help us customize our Website for you.
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. How Can I Control Cookies?</h2>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights
                        by setting your preferences in the Cookie Consent Manager or in your web browser settings.
                    </p>
                </section>
            </div>
        </PolicyLayout>
    );
}
