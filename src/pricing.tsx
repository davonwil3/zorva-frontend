import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import * as Tabs from '@radix-ui/react-tabs';
import FeatureItem from "./components/featureitem";
import * as Accordion from '@radix-ui/react-accordion';


export default function Pricing() {
    return (
        <div className="bg-white">
            <Nav />
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingBottom: "10px" }}>
                <div className="container">
                    <div className="w-full max-w-lg">
                        <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                        <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">Short heading here</h1>
                        <p className="md:text-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                            elementum tristique.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                                title="Button"
                            >
                                Button</button
                            ><button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                title="Button"
                            >
                                Button
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section
               
                className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28"
                style={{ paddingTop: "0px" }}
            >
                <div className="container">
                    <div className="mx-auto mb-7 max-w-lg text-center md:mb-9 lg:mb-11">
                        <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                        <h1 className="mb-4 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                            Pricing plan
                        </h1>
                        <p className="md:text-md">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
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
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
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
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
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
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
                                        <FeatureItem text="Feature text goes here" />
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
                                        <FeatureItem text="Yearly Feature 1" />
                                        <FeatureItem text="Yearly Feature 2" />
                                        <FeatureItem text="Yearly Feature 3" />
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
                                            $296
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /yr
                                            </span>
                                        </h3>
                                        {/* Show the 15% discount */}
                                        <p className="text-sm font-semibold text-red-500">
                                            Save 15%
                                        </p>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="Yearly Feature 1" />
                                        <FeatureItem text="Yearly Feature 2" />
                                        <FeatureItem text="Yearly Feature 3" />
                                        <FeatureItem text="Yearly Feature 4" />
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
                                            $602
                                            <span className="text-2xl font-bold md:text-3xl md:leading-[1.3] lg:text-4xl">
                                                /yr
                                            </span>
                                        </h3>
                                        {/* Show the 15% discount */}
                                        <p className="text-sm font-semibold text-red-500">
                                            Save 15%
                                        </p>
                                    </div>
                                    <div className="mb-8 grid grid-cols-1 gap-4 py-2">
                                        <FeatureItem text="Yearly Feature 1" />
                                        <FeatureItem text="Yearly Feature 2" />
                                        <FeatureItem text="Yearly Feature 3" />
                                        <FeatureItem text="Yearly Feature 4" />
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
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
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
                                Long heading is what you see here in this feature section
                            </h3>
                            <p className="md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                            elementum tristique.
                        </p>
                    </div>

                    {/* Wrap all FAQ items in Accordion.Root */}
                    <Accordion.Root
                        type="single"       // or "multiple" if you want multiple items open at once
                        collapsible         // allows closing an open item
                        data-orientation="vertical"
                    >
                        {/* FAQ Item #1 */}
                        <Accordion.Item
                            value="item-1"
                            data-orientation="vertical"
                            className="border-b border-border-primary first:border-t"
                        >
                            <Accordion.Header className="flex w-full">
                                <Accordion.Trigger
                                    id="radix-:R6:"
                                    className="flex flex-1 items-center justify-between py-4 font-bold transition-all [&[data-state=open]>svg]:rotate-180 md:py-5 md:text-md"
                                >
                                    Question #1 goes here
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="0"
                                        viewBox="0 0 15 15"
                                        className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content
                                className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                                // Below styles are Radix recommended for smooth animations
                                style={{
                                    '--radix-accordion-content-height':
                                        'var(--radix-collapsible-content-height)',
                                    '--radix-accordion-content-width':
                                        'var(--radix-collapsible-content-width)',
                                } as React.CSSProperties}
                            >
                                {/* Answer #1: Place your answer text here */}
                                <p className="py-2">
                                    Answer #1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a rhoncus est.
                                </p>
                            </Accordion.Content>
                        </Accordion.Item>

                        {/* FAQ Item #2 */}
                        <Accordion.Item
                            value="item-2"
                            data-orientation="vertical"
                            className="border-b border-border-primary first:border-t"
                        >
                            <Accordion.Header className="flex w-full">
                                <Accordion.Trigger
                                    id="radix-:Ra:"
                                    className="flex flex-1 items-center justify-between py-4 font-bold transition-all [&[data-state=open]>svg]:rotate-180 md:py-5 md:text-md"
                                >
                                    Question #2 goes here
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="0"
                                        viewBox="0 0 15 15"
                                        className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content
                                className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                                style={{
                                    '--radix-accordion-content-height':
                                        'var(--radix-collapsible-content-height)',
                                    '--radix-accordion-content-width':
                                        'var(--radix-collapsible-content-width)',
                                } as React.CSSProperties}
                            >
                                {/* Answer #2 */}
                                <p className="py-2">
                                    Answer #2. Etiam dictum, sapien et faucibus euismod, sem diam scelerisque risus.
                                </p>
                            </Accordion.Content>
                        </Accordion.Item>

                        {/* Repeat for items #3, #4, #5, etc. */}
                        <Accordion.Item
                            value="item-3"
                            data-orientation="vertical"
                            className="border-b border-border-primary first:border-t"
                        >
                            <Accordion.Header className="flex w-full">
                                <Accordion.Trigger
                                    id="radix-:Re:"
                                    className="flex flex-1 items-center justify-between py-4 font-bold transition-all [&[data-state=open]>svg]:rotate-180 md:py-5 md:text-md"
                                >
                                    Question #3 goes here
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        strokeWidth="0"
                                        viewBox="0 0 15 15"
                                        className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content
                                className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                                style={{
                                    '--radix-accordion-content-height':
                                        'var(--radix-collapsible-content-height)',
                                    '--radix-accordion-content-width':
                                        'var(--radix-collapsible-content-width)',
                                } as React.CSSProperties}
                            >
                                {/* Answer #3 */}
                                <p className="py-2">
                                    Answer #3. Curabitur suscipit velit a nisl luctus, sed sollicitudin dui gravida.
                                </p>
                            </Accordion.Content>
                        </Accordion.Item>

                        {/* ...and so on for items #4, #5, etc. */}
                    </Accordion.Root>

                    <div className="mt-12 md:mt-18 lg:mt-20">
                        <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                            Still have questions?
                        </h4>
                        <p className="md:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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