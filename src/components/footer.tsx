import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-center  px-[5%] py-12 md:py-18 lg:py-20" style={{ paddingTop: "20px" }}>
            <div className="container">
                <div
                    className="grid grid-cols-1 items-start justify-between gap-x-[8vw] gap-y-12 pb-12 sm:gap-y-10 md:gap-y-14 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:pb-20"
                >
                    <div className="flex flex-col items-start">
                        <Link to="/" className="flex items-center space-x-2 lg:space-x-1">
                            <img
                                src="/assets/logosymbol.png"
                                alt="Logo image"
                                className="w-8 h-8 lg:w-[50px] lg:h-[50px]"
                            />
                            <p className="text-2xl font-semibold lg:text-2xl ">Zorva</p> 
                        </Link>
                        <ul
                            className="grid grid-flow-row grid-cols-1 items-start justify-center justify-items-start  gap-y-4 md:grid-flow-col md:grid-cols-[max-content] md:justify-start md:justify-items-start md:gap-x-6" 
                            style={{ marginTop: "35px", marginLeft: "10px" }}
                        >
                            <li className="font-semibold"><Link to={'/pricing'}>Pricing</Link></li>
                            <li className="font-semibold"><a href="#">Blog</a></li>
                            <li className="font-semibold"><a href="#">Sign in</a></li>
                            <li className="font-semibold"><a href="#">Sign up</a></li>
                        </ul>
                    </div>
                    <div className="max-w-md lg:min-w-[25rem]">
                        <p className="mb-3 font-semibold md:mb-4">Subscribe</p>
                        <form
                            className="mb-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-y-4 md:gap-4"
                        >
                            <div className="relative flex size-full items-center">
                                <input
                                    type="email"
                                    className="flex size-full min-h-11 border border-border-primary bg-background-primary py-2 align-middle file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 px-3"
                                    id="email"
                                    placeholder="Enter your email"
                                    value=""
                                />
                            </div>
                            <button
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-5 py-2"
                                title="Subscribe"
                            >
                                Subscribe
                            </button>
                        </form>
                        <div>
                            <p className="text-xs">
                                By subscribing you agree to with our
                                <a href="#" className="underline">Privacy Policy</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-black"></div>
                <div
                    className="flex flex-col items-start justify-start pb-4 pt-6 text-sm md:flex-row md:items-center md:justify-between md:pb-0 md:pt-8 md:text-center"
                >
                    <ul
                        className="grid grid-flow-row grid-cols-[max-content] gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0 lg:justify-center"
                    >
                        <li className="underline decoration-black underline-offset-1">
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li className="underline decoration-black underline-offset-1">
                            <a href="#">Terms of Service</a>
                        </li>
                        <li className="underline decoration-black underline-offset-1">
                            <a href="#">Cookies Settings</a>
                        </li>
                    </ul>
                    <p className="mt-8 md:mt-0">© 2024 Zorva. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
