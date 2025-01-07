import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white  lg:min-h-18 lg:px-[5%] h-20 p-4 ">
            <div className="size-full lg:flex lg:items-center lg:justify-between">
                <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
                    <Link to="/" >
                        <img
                            src="https://d22po4pjz3o32e.cloudfront.net/logo-image.svg"
                            alt="Logo image"
                            className="h-8"
                        />
                    </Link>
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
                        <Link
                            to="/features"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                        >
                            Features
                        </Link>
                    </div>
                    <div className="first:pt-4 lg:first:pt-0">
                        <Link
                            to="/integrations"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                        >
                            Integrations
                        </Link>
                    </div>
                    <div className="first:pt-4 lg:first:pt-0">
                        <Link
                            to="/pricing"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                        >
                            Pricing
                        </Link>
                    </div>
                    <div className="first:pt-4 lg:first:pt-0">
                        <Link
                            to="/blog"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base"
                        >
                            Blog
                        </Link>
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
    );
}