import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white lg:min-h-18 lg:px-[5%] h-[75px] p-4">
            <div className="size-full lg:flex lg:items-center lg:justify-between">
                <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
                    <Link to="/" className="flex items-center space-x-2 lg:space-x-1 cursor-pointer">
                        <img
                            src="/assets/logosymbol.png"
                            alt="Logo image"
                            className="w-8 h-8 lg:w-[50px] lg:h-[50px]" // Adjusted logo size
                        />
                        <p className="text-2xl font-semibold lg:text-2xl">Zorva</p> {/* Adjusted font size */}
                    </Link>
                    <button
                        className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                        <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                        <span className="my-[3px] h-0.5 w-6 bg-black"></span>
                    </button>
                </div>
                <div
                    className={`px-[5%] lg:flex lg:items-center lg:px-0 transition-all duration-300 ${isOpen ? "max-h-screen bg-white" : "max-h-0"
                        } lg:max-h-none lg:bg-transparent overflow-hidden`}
                    style={{
                        backgroundColor: isOpen ? "white" : "transparent",
                    }}
                >
                    <div className="first:pt-4 lg:first:pt-0">
                        <Link
                            to="/pricing"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base cursor-pointer"
                        >
                            Pricing
                        </Link>
                    </div>
                    <div className="first:pt-4 lg:first:pt-0">
                        <Link
                            to="/blog"
                            className="block py-3 text-md lg:px-4 lg:py-2 lg:text-base cursor-pointer"
                        >
                            Blog
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
                        <Link
                            to="/signin"
                            className="focus-visible:ring-[rgb(59,133,237)] cursor-pointer inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[rgb(59,133,237)] text-[rgb(59,133,237)] bg-transparent hover:bg-[rgb(59,133,237)] hover:text-white px-5 py-2 w-full rounded-lg"
                            title="Sign In"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="focus-visible:ring-[rgb(59,133,237)] cursor-pointer inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[rgb(59,133,237)] text-white bg-[rgb(59,133,237)] hover:bg-[rgb(45,101,189)] px-5 py-2 w-full rounded-lg"
                            title="Start for Free"
                        >
                            Start for Free
                        </Link>
                    </div>

                </div>
            </div>
        </nav>


    );
}