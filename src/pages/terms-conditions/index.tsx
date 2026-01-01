import { PolicyLayout } from "@/components/common/policy-layout";

export default function TermsConditionsPage() {
    return (
        <PolicyLayout
            title="Terms & Conditions"
            description="Read our terms and conditions for using our services and website."
            url="/terms-conditions"
        >
            <div className="space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">1. Agreement to Terms</h2>
                    <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally
                        or on behalf of an entity ("you") and LORDEVS ("we," "us" or "our"), concerning your access to and use
                        of the Website as well as any other media form, media channel, mobile website or mobile application
                        related, linked, or otherwise connected thereto.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">2. Intellectual Property Rights</h2>
                    <p>
                        Unless otherwise indicated, the Website as well as all source code, databases, functionality,
                        software, website designs, audio, video, text, photographs, and graphics on the Website (collectively, the "Content")
                        and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by
                        us or licensed to us, and are protected by copyright and trademark laws.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">3. User Representations</h2>
                    <p>
                        By using the Website, you represent and warrant that: (1) all registration information you submit
                        will be true, accurate, current, and complete; (2) you will maintain the accuracy of such
                        information and promptly update such registration information as necessary.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">4. Prohibited Activities</h2>
                    <p>
                        You may not access or use the Website for any purpose other than that for which we make the
                        Website available. The Website may not be used in connection with any commercial endeavors
                        except those that are specifically endorsed or approved by us.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
                    <p>
                        In no event will we or our directors, employees, or agents be liable to you or any third party
                        for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages,
                        including lost profit, lost revenue, loss of data, or other damages arising from your use of the Website.
                    </p>
                </section>
            </div>
        </PolicyLayout>
    );
}
