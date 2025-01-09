import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import * as Tabs from '@radix-ui/react-tabs';
import FeatureItem from "./components/featureitem";
import * as Accordion from '@radix-ui/react-accordion';
import FAQItem from "./components/faqitem";


export default function Pricing() {
    return (
        <div className="bg-white">
            <Nav />
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingBottom: "10px" }}>
                <div className="container">
                    <div className="w-full max-w-lg">
                        <p className="mb-3 font-semibold md:mb-4">Affordable Plans</p>
                        <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-4xl lg:text-5xl">Simple Pricing, Powerful Features</h1>
                        <p className="md:text-md">
                            Flexible plans designed to grow with you. Access powerful AI-driven insights and features tailored to your needs—no hassle, just results.
                        </p>
                    </div>
                </div>
            </section>
            <section

                className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28"
                style={{ paddingTop: "80px" }}
            >
                <div className="container">
                    <div className="mx-auto mb-7 max-w-lg text-center md:mb-9 lg:mb-11">
                        <h1 className="mb-4 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                            Pricing plan
                        </h1>
                    </div>

                    {/* Radix Tabs Root, defaulting to "monthly" */}
                    <Tabs.Root defaultValue="monthly" orientation="horizontal" className="w-full">
                        {/* Tab List (the buttons) */}
                        <Tabs.List className="flex mx-auto mb-11 w-fit" aria-orientation="horizontal">
                            {/* Monthly Tab Trigger */}
                            <Tabs.Trigger
                                value="monthly"
                                className="inline-flex items-center justify-center whitespace-nowrap border border-border-primary bg-background-primary px-6 py-2 text-text-primary transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background-alternative data-[state=active]:text-text-alternative"
                            >
                                Monthly
                            </Tabs.Trigger>

                            {/* Yearly Tab Trigger */}
                            <Tabs.Trigger
                                value="yearly"
                                className="inline-flex items-center justify-center whitespace-nowrap border border-border-primary bg-background-primary px-6 py-2 text-text-primary transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background-alternative data-[state=active]:text-text-alternative"
                            >
                                Yearly
                            </Tabs.Trigger>
                        </Tabs.List>

                        {/* ======================== MONTHLY CONTENT ======================== */}
                        <Tabs.Content
                            value="monthly"
                            className="focus-visible:outline-none grid grid-cols-1 gap-8 lg:grid-cols-3 data-[state=active]:animate-tabs"
                        >
                            {/* ----- MONTHLY COLUMN #1: FREE ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Free plan
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $0
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /mo
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="25 uploads/month" />
                                        <FeatureItem text="20 AI queries/month" />
                                        <FeatureItem text="3 graphs per file" />
                                        <FeatureItem text="Basic graph types: Bar, line, and pie charts" />
                                        <FeatureItem text="3 reports/month" />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>

                            {/* ----- MONTHLY COLUMN #2: PRO @ $29 ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Pro plan
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $29
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /mo
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="100 uploads/month" />
                                        <FeatureItem text="Search for files by content" />
                                        <FeatureItem text="Unlimited AI queries" />
                                        <FeatureItem text="Unlimited graphs per file" />
                                        <FeatureItem text="All graph types, including (heatmaps, scatter plots, multi-axis charts)." />
                                        <FeatureItem text="Customize graphs: Apply filters, group data, and adjust graph appearance" />
                                        <FeatureItem text="Real-time alerts " />
                                        <FeatureItem text="Connect to popular tools like Google Sheets, QuickBooks, and Shopify" />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>

                            {/* ----- MONTHLY COLUMN #3: BUSINESS @ $59 ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Business plan
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $59
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /mo
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="Unlimited uploads" />
                                        <FeatureItem text="Everything in pro plan" />
                                        <FeatureItem text="Customize and brand your reports" />
                                        <FeatureItem text="Add up to 10 team members " />
                                        <FeatureItem text="Cross-file analysis " />
                                        <FeatureItem text="Real-time alerts with custom triggers  " />
                                        <FeatureItem text="Advanced integrations (e.g., Salesforce, Tableau, Power BI) " />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </Tabs.Content>

                        {/* ======================== YEARLY CONTENT ======================== */}
                        <Tabs.Content
                            value="yearly"
                            className="focus-visible:outline-none grid grid-cols-1 gap-8 lg:grid-cols-3 data-[state=active]:animate-tabs"
                        >

                            {/* ----- YEARLY COLUMN #1: FREE ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Free plan (Yearly)
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $0
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /yr
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="25 uploads/month" />
                                        <FeatureItem text="20 AI queries/month" />
                                        <FeatureItem text="3 graphs per file" />
                                        <FeatureItem text="Basic graph types: Bar, line, and pie charts" />
                                        <FeatureItem text="3 reports/month" />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>

                            {/* ----- YEARLY COLUMN #2: PRO @ ~$296 ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Pro plan (Yearly)
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $21
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /mo
                                            </span>
                                        </h3>
                                        {/* Show the 15% discount */}
                                        <p className="text-sm font-semibold text-red-500">
                                            Save 25%
                                        </p>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="100 uploads/month" />
                                        <FeatureItem text="Search for files by content" />
                                        <FeatureItem text="Unlimited AI queries" />
                                        <FeatureItem text="Unlimited graphs per file" />
                                        <FeatureItem text="All graph types, including (heatmaps, scatter plots, multi-axis charts)." />
                                        <FeatureItem text="Customize graphs: Apply filters, group data, and adjust graph appearance" />
                                        <FeatureItem text="Real-time alerts " />
                                        <FeatureItem text="Connect to popular tools like Google Sheets, QuickBooks, and Shopify" />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>

                            {/* ----- YEARLY COLUMN #3: BUSINESS @ ~$602 ----- */}
                            <div className="flex h-full flex-col justify-between border border-border-primary px-6 py-8 md:p-8">
                                <div>
                                    <div className="rb-6 mb-6 text-center md:mb-8">
                                        <h2 className="text-md font-bold leading-[1.4] md:text-xl">
                                            Business plan (Yearly)
                                        </h2>
                                        <h3 className="my-2 text-4xl font-bold md:text-7xl lg:text-8xl">
                                            $44
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /mo
                                            </span>
                                        </h3>
                                        {/* Show the 15% discount */}
                                        <p className="text-sm font-semibold text-red-500">
                                            Save 25%
                                        </p>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="Unlimited uploads" />
                                        <FeatureItem text="Everything in pro plan" />
                                        <FeatureItem text="Customize and brand your reports" />
                                        <FeatureItem text="Add up to 10 team members " />
                                        <FeatureItem text="Cross-file analysis " />
                                        <FeatureItem text="Real-time alerts with custom triggers  " />
                                        <FeatureItem text="Advanced integrations (e.g., Salesforce, Tableau, Power BI) " />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3 w-full"
                                        title="Get started"
                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <div className="rb-5 mb-5 md:mb-6">
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                    className="size-12"
                                    alt="Relume logo"
                                />
                            </div>
                            <h3 className="mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                See Beyond the Numbers
                            </h3>
                            <p className="md:text-md">
                                Your data isn’t just a collection of numbers—it’s a story waiting to be told. With our tools, you’ll uncover hidden trends,
                                identify patterns, and transform raw information into actionable insights.
                                Gain a deeper understanding of your business, anticipate opportunities, and stay ahead of challenges.
                                Let your data guide you to smarter decisions and greater success. The answers you’ve been searching for are already in your hands—now it’s time to unlock them.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28"
                style={{ paddingTop: '0px' }}
            >
                <div className="container">
                    <div className="rb-12 mb-12 w-full max-w-lg md:mb-18 lg:mb-20">
                        <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">FAQs</h2>
                        <p className="md:text-md">
                            Here are the answers to the questions we get asked the most.
                        </p>
                    </div>

                    {/* Wrap all FAQ items in Accordion.Root */}
                    <Accordion.Root
                        type="single"     // Only one item open at a time
                        collapsible       // Allows an open item to be closed
                        data-orientation="vertical"
                    >
                        <FAQItem
                            value="item-1"
                            question="1.) How does your app handle my data?"
                            answer="We prioritize your privacy and security. All your data is encrypted and stored securely to ensure it remains confidential."
                        />
                        <FAQItem
                            value="item-2"
                            question="2.) Can I upgrade or downgrade my plan at any time?"
                            answer="Yes, you can switch plans anytime to better fit your needs. Changes take effect immediately."
                        />
                        <FAQItem
                            value="item-3"
                            question="3.) What happens if I hit my upload limit?"
                            answer="If you reach your upload limit, you'll be notified and given the option to upgrade to a higher plan for more uploads."
                        />
                        <FAQItem
                            value="item-4"
                            question="4.) Do you offer refunds?"
                            answer="Sorry, we do not offer refunds. If you have any concerns about your subscription, feel free to reach out to our support team."
                        />
                        <FAQItem
                            value="item-5"
                            question="5.) Can I share my account with my team?"
                            answer="Team sharing is available exclusively in the Business Plan, which allows you to add team members for seamless collaboration."
                        />
                        <FAQItem
                            value="item-6"
                            question="6.) What kind of support do you offer?"
                            answer="We offer email support and aim to respond to your queries as soon as possible to ensure your experience is smooth and hassle-free."
                        />
                        <FAQItem
                            value="item-7"
                            question="7.) Is there a free trial?"
                            answer="Yes! We offer a 7-day free trial so you can explore all premium features before committing to a plan."
                        />
                    </Accordion.Root>

                    <div className="mt-12 md:mt-18 lg:mt-20">
                        <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                            Still have questions?
                        </h4>
                        <p className="md:text-md">Leave us an email and well get back to you as soon as possible</p>
                        <div className="mt-6 md:mt-8">
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                title="Contact"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    );
}