import React from "react";
import Nav from "./components/nav";
import * as Accordion from '@radix-ui/react-accordion';
import Footer from "./components/footer";

export default function Features() {

    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="bg-white">
            <Nav />
            <section className=" flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingBottom: "90px" }}>
                <div className="container max-w-lg text-center">
                    <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                    <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">Short heading here</h1>
                    <p className="md:text-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique.
                    </p>
                   
                </div>
            </section>
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: '0px' }}>
                <div className="container">
                    <div
                        className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
                    >
                        <div>
                            <h1 className="rb-5 mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                Long heading is what you see here in this feature section
                            </h1>
                            <p className="mb-6 md:mb-8 md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
                            </p>
                            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                                <div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Subheading one</h6>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                        eros.
                                    </p>
                                </div>
                                <div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Subheading two</h6>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                        eros.
                                    </p>
                                </div>
                            </div>
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
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: '0px' }}>
                <div className="container">
                    <div
                        className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
                    >
                        <div>
                            <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                            <h1 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Medium length section heading goes here
                            </h1>
                            <p className="mb-6 md:mb-8 md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
                            </p>
                            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                                <div>
                                    <div className="mb-3 md:mb-4">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            className="size-12"
                                            alt="Relume logo 1"
                                        />
                                    </div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Subheading one</h6>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                        eros.
                                    </p>
                                </div>
                                <div>
                                    <div className="mb-3 md:mb-4">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            className="size-12"
                                            alt="Relume logo 2"
                                        />
                                    </div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Subheading two</h6>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                        eros.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                                <button
                                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                    title="Button"
                                >
                                    Button</button
                                ><button
                                    className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0"
                                    title="Button"
                                >
                                    Button<svg
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-width="0"
                                        viewBox="0 0 15 15"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
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
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: '0px' }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
                        <div className="order-1 lg:order-2">
                            <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Medium length section heading goes here
                            </h2>
                            <p className="md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                                <button
                                    className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                    title="Button"
                                >
                                    Button</button
                                ><button
                                    className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0"
                                    title="Button"
                                >
                                    Button<svg
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-width="0"
                                        viewBox="0 0 15 15"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: '0px' }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <h3 className="mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                Long heading is what you see here in this feature section
                            </h3>
                            <p className="mb-5 md:mb-6 md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
                            </p>
                            <ul className="grid grid-cols-1 gap-4 py-2">
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 1"
                                            className="size-6"
                                        />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 2"
                                            className="size-6"
                                        />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 3"
                                            className="size-6"
                                        />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </li>
                            </ul>
                        </div>
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                            className="w-full object-cover"
                            alt="Relume placeholder image"
                        />
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