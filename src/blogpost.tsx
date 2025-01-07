import React from 'react';
import Nav from './components/nav';
import Footer from './components/footer';



export default function BlogPost() {
    return (
        <div className="bg-white">
            <Nav />
            <section id="relume" className="flex flex-col justify-center items-center relative px-[5%] py-16 md:py-24 lg:py-28" >
                <div className="container max-w-lg text-center">
                    <h2 className="rb-5 mb-5 text-4xl font-bold text-text-alternative md:mb-6 md:text-5xl lg:text-6xl">
                        Medium length heading goes here
                    </h2>
                    <p className="text-text-alternative md:text-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique.
                    </p>
                    <div className="mx-auto mt-6 w-full max-w-sm md:mt-8">
                        <form
                            className="rb-4 mb-4 grid max-w-sm grid-cols-1 gap-y-3 sm:grid-cols-[1fr_max-content] sm:gap-4"
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
                                className="focus-visible:ring-border-primary inline-flex gap-3 whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative items-center justify-center px-6 py-3"
                                title="Sign up"
                            >
                                Sign up
                            </button>
                        </form>
                        <div>
                            <p className="text-xs text-text-alternative">
                                By clicking Sign Up you're confirming that you agree with our
                                <a href="#" className="underline">Terms and Conditions</a>.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 -z-10">
                    <img
                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                        className="size-full object-cover"
                        alt="Relume placeholder image"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
            </section>

        </div>

    );
}