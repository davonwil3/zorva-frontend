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
                        className={`px-[5%] lg:flex lg:items-center lg:px-0 transition-all duration-300 ${
                            isOpen
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
            <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28 pt-28 lg:pt-28">
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
        </div>
    );
}

export default LandingPage;
