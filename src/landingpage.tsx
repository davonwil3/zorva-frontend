import React from "react";
import { useState } from "react";
import './index.css';

function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white">
            <nav className="fixed top-0 left-0 w-full z-50 bg-white  lg:min-h-18 lg:px-[5%] h-20 p-4 ">
                <div className="size-full lg:flex lg:items-center lg:justify-between">
                    <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
                        <a href="#">
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                                alt="Logo image"
                            />
                        </a>
                        <button
                            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                            <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                        </button>
                    </div>
                    <div
                        className={`px-[5%] lg:flex lg:items-center lg:px-0 transition-all duration-300 ${isOpen
                            ? "max-h-screen bg-white"
                            : "max-h-0"
                            } lg:max-h-none lg:bg-transparent overflow-hidden`}
                        style={{
                            backgroundColor: isOpen ? "white" : "transparent", // Fallback for inline styles
                        }}
                    >
                        <div className="first:pt-4 lg:first:pt-0">
                            <a
                                href="#"
                                className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                            >
                                Link One
                            </a>
                        </div>
                        <div className="first:pt-4 lg:first:pt-0">
                            <a
                                href="#"
                                className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                            >
                                Link Two
                            </a>
                        </div>
                        <div className="first:pt-4 lg:first:pt-0">
                            <a
                                href="#"
                                className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                            >
                                Link Three
                            </a>
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-5 py-2 w-full"
                                title="Button"
                            >
                                Button
                            </button>
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-5 py-2 w-full"
                                title="Button"
                            >
                                Button
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 pt-30 lg:pt-30">
                <div className="container mx-auto  ">
                    <div className="flex flex-col items-center">
                        {/* Text Section */}
                        <div className="mb-12 text-center md:mb-18 lg:mb-20">
                            <div className="w-full max-w-3xl mx-auto">
                                <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-6xl lg:text-7xl">
                                    Medium length hero heading goes here
                                </h1>
                                <p className="text-base md:text-lg">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                    elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                    commodo diam libero vitae erat.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-6 py-3"
                                        title="Button"
                                    >
                                        Button
                                    </button>
                                    <button
                                        className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                        title="Button"
                                    >
                                        Button
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="w-full max-w-5xl">
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                className="w-full h-auto object-cover rounded-lg"
                                alt="Relume placeholder image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section
                id="relume"
                className="flex flex-col justify-center items-center px-[5%] bg-white pt-0px"
            >
                <div className="container">
                    <div className="flex flex-col items-center">
                        {/* Text Section */}
                        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-20">
                            <div className="w-full max-w-lg">
                                <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                                <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
                                    Medium length section heading goes here
                                </h2>
                                <p className="md:text-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    varius enim in eros elementum tristique. Duis cursus, mi quis
                                    viverra ornare, eros dolor interdum nulla, ut commodo diam libero
                                    vitae erat.
                                </p>
                            </div>
                        </div>

                        {/* Grid Section */}
                        <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
                            {/* Grid Item 1 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                        className="size-12"
                                        alt="Relume logo 1"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Unique Section Heading 1
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    varius enim in eros elementum tristique. Duis cursus, mi quis
                                    viverra ornare, eros dolor interdum nulla.
                                </p>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                        className="size-12"
                                        alt="Relume logo 2"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Unique Section Heading 2
                                </h3>
                                <p>
                                    Different content for this grid item, tailored to its purpose or
                                    function.
                                </p>
                            </div>

                            {/* Grid Item 3 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                        className="size-12"
                                        alt="Relume logo 3"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Unique Section Heading 3
                                </h3>
                                <p>
                                    You can add completely different text or content here as required by
                                    your design.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex items-center gap-4 md:mt-14 lg:mt-16">
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3"
                                title="Button"
                            >
                                Button
                            </button>
                            <button
                                className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0"
                                title="Button"
                            >
                                Button
                                <svg
                                    stroke="currentColor"
                                    fill="none"
                                    strokeWidth="0"
                                    viewBox="0 0 15 15"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28">
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
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
                    </div>
                </div>
            </section>
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div
                        className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
                    >
                        <div>
                            <h2 className="rb-5 mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                Long heading is what you see here in this feature section
                            </h2>
                            <p className="mb-6 md:mb-8 md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                                commodo diam libero vitae erat.
                            </p>
                            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                                <div>
                                    <h3 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">50%</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                                <div>
                                    <h3 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">50%</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28 " style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                            <h1 className="mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Medium length section heading goes here
                            </h1>
                            <p className="mb-5 text-base md:mb-6 md:text-md">
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
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 2"
                                            className="size-6"
                                        />
                                    </div>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 3"
                                            className="size-6"
                                        />
                                    </div>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </li>
                            </ul>
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
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-12 md:py-16 lg:py-20" style={{ paddingTop: "0px" }}>
                <div className="container">
                    <h1
                        className="mx-auto mb-6 w-full max-w-lg text-center text-base font-bold leading-[1.2] md:mb-8 md:text-md md:leading-[1.2]"
                    >
                        Used by the world&#x27;s leading companies
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-2 pt-4 md:pt-2">
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 1"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 1"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 2"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 2"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 3"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 3"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 4"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 4"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 5"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 5"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 6"
                            className="max-h-12 md:max-h-14"
                        />
                    </div>
                </div>
            </section>
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "40px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Medium length heading goes here
                            </h2>
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
                        <div>
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LandingPage;
