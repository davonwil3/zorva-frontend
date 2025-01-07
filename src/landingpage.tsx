import React from "react";
import { useState } from "react";
import './index.css';
import { Link } from "react-router-dom";
import Nav from "./components/nav";
import Footer from "./components/footer";

function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white">
            <Nav />
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
                style={{ paddingTop: "0px" }}
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
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container max-w-[700px] text-center">
                    <p className="mb-3 font-semibold md:mb-4">Tagline</p>
                    <h2 className="mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                        Medium length section heading goes here
                    </h2>
                    <p className="mb-5 md:mb-6 md:text-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                        commodo diam libero vitae erat.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 py-2">
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 1"
                            className="max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 1"
                            className="max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/webflow-logo.svg"
                            alt="Webflow logo 2"
                            className="max-h-14"
                        /><img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 2"
                            className="max-h-14"
                        />
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 2"
                            className="max-h-14"
                        />
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 2"
                            className="max-h-14"
                        />
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/relume-logo.svg"
                            alt="Relume logo 2"
                            className="max-h-14"
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
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "10px" }}>
                <div className="container">
                    <div className="mb-12 md:mb-18 lg:mb-20">
                        <div className="mx-auto w-full max-w-lg text-center">
                            <p className="mb-3 font-semibold md:mb-4">Blog</p>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Short heading goes here
                            </h2>
                            <p className="md:text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                        <div className="border border-border-primary">
                            <a href="#" className="w-full max-w-full"
                            ><div className="w-full overflow-hidden">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                        alt="Relume placeholder image"
                                        className="aspect-[3/2] size-full object-cover"
                                    /></div
                                ></a>
                            <div className="px-5 py-6 md:p-6">
                                <a href="#" className="mb-2 flex text-sm font-semibold">Category</a
                                ><a href="#" className="mb-2 block max-w-full"
                                ><h5 className="text-xl font-bold md:text-2xl">Blog title heading will go here</h5></a
                                >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                    eros.
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="mr-4 shrink-0">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                            alt="Relume placeholder avatar"
                                            className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h6 className="text-sm font-semibold">Full name</h6>
                                        <div className="flex items-center">
                                            <p className="text-sm">11 Jan 2022</p>
                                            <span className="mx-2">•</span>
                                            <p className="text-sm">5 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-border-primary">
                            <a href="#" className="w-full max-w-full"
                            ><div className="w-full overflow-hidden">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                        alt="Relume placeholder image"
                                        className="aspect-[3/2] size-full object-cover"
                                    /></div
                                ></a>
                            <div className="px-5 py-6 md:p-6">
                                <a href="#" className="mb-2 flex text-sm font-semibold">Category</a
                                ><a href="#" className="mb-2 block max-w-full"
                                ><h5 className="text-xl font-bold md:text-2xl">Blog title heading will go here</h5></a
                                >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                    eros.
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="mr-4 shrink-0">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                            alt="Relume placeholder avatar"
                                            className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h6 className="text-sm font-semibold">Full name</h6>
                                        <div className="flex items-center">
                                            <p className="text-sm">11 Jan 2022</p>
                                            <span className="mx-2">•</span>
                                            <p className="text-sm">5 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border border-border-primary">
                            <a href="#" className="w-full max-w-full"
                            ><div className="w-full overflow-hidden">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                        alt="Relume placeholder image"
                                        className="aspect-[3/2] size-full object-cover"
                                    /></div
                                ></a>
                            <div className="px-5 py-6 md:p-6">
                                <a href="#" className="mb-2 flex text-sm font-semibold">Category</a
                                ><a href="#" className="mb-2 block max-w-full"
                                ><h5 className="text-xl font-bold md:text-2xl">Blog title heading will go here</h5></a
                                >
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
                                    eros.
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="mr-4 shrink-0">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                            alt="Relume placeholder avatar"
                                            className="size-12 min-h-12 min-w-12 rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h6 className="text-sm font-semibold">Full name</h6>
                                        <div className="flex items-center">
                                            <p className="text-sm">11 Jan 2022</p>
                                            <span className="mx-2">•</span>
                                            <p className="text-sm">5 min read</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3 mt-10 md:mt-14 lg:mt-16"
                            title="View all"
                        >
                            View all
                        </button>
                    </div>
                </div>
            </section>
            <Footer />

        </div>
    );
}

export default LandingPage;
