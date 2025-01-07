import React from "react";
import Nav from "./components/nav";
import Footer from "./components/footer";
import BlogCard from "./components/blogcard";
import BlogCard2 from "./components/blogcard2";


export default function Blog() {
    return (
        <div className="bg-white">
            <Nav />
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28">
                <div className="container">
                    <div className="mb-12 md:mb-18 lg:mb-20">
                        <div className="mx-auto w-full max-w-lg text-center">
                            <p className="mb-3 font-semibold md:mb-4">Blog</p>
                            <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">
                                Short heading goes here
                            </h1>
                            <p className="md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-start">
                        {/* Category Nav */}
                        <div className="no-scrollbar mb-12 ml-[-5vw] flex w-screen items-center justify-start overflow-scroll pl-[5vw] md:mb-16 md:ml-0 md:w-full md:justify-center md:overflow-hidden md:pl-0">
                            <a
                                href="#"
                                className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary bg-background-primary border px-4 py-2 border-border-primary"
                                title="View all"
                            >
                                View all
                            </a>
                            <a
                                href="#"
                                className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
                                title="Category one"
                            >
                                Category one
                            </a>
                            <a
                                href="#"
                                className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
                                title="Category two"
                            >
                                Category two
                            </a>
                            <a
                                href="#"
                                className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
                                title="Category three"
                            >
                                Category three
                            </a>
                            <a
                                href="#"
                                className="focus-visible:ring-border-primary inline-flex items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-text-primary gap-2 border px-4 py-2 border-transparent"
                                title="Category four"
                            >
                                Category four
                            </a>
                        </div>

                        {/* Blog Cards Grid */}
                        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                            {/* Example usage of BlogCard component */}
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 1"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href={1}
                            />
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 2"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href="#"
                            />
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 3"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href="#"
                            />
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 4"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href="#"
                            />
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 5"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href="#"
                            />
                            <BlogCard
                                imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                altText="Relume placeholder image 6"
                                category="Category"
                                readTime="5 min read"
                                title="Blog title heading will go here"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                                href="#"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section  className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div className="mb-12 md:mb-18 lg:mb-20">
                        <div className="w-full max-w-lg">
                            <p className="mb-3 font-semibold md:mb-4">Blog</p>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Short heading goes here
                            </h2>
                            <p className="md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                        </div>
                    </div>

                    {/* Blog Cards Grid */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
                        <BlogCard2
                            href="#"
                            imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                            altText="Relume placeholder image"
                            category="Category"
                            title="Blog title heading will go here"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                            avatarUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                            authorName="Full name"
                            date="11 Jan 2022"
                            readTime="5 min read"
                        />

                        <BlogCard2
                            href="#"
                            imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                            altText="Relume placeholder image"
                            category="Category"
                            title="Blog title heading will go here"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                            avatarUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                            authorName="Full name"
                            date="11 Jan 2022"
                            readTime="5 min read"
                        />

                        <BlogCard2
                            href="#"
                            imageUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                            altText="Relume placeholder image"
                            category="Category"
                            title="Blog title heading will go here"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
                            avatarUrl="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                            authorName="Full name"
                            date="11 Jan 2022"
                            readTime="5 min read"
                        />
                    </div>

                    {/* "View all" button */}
                    <div className="flex items-center justify-end">
                        <button
                            className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary text-text-primary bg-background-primary px-6 py-3 mt-10 md:mt-14 lg:mt-16"
                            title="View all"
                        >
                            View all
                        </button>
                    </div>
                </div>
            </section>
            <section  className="flex flex-col justify-center items-center relative px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container max-w-lg text-center">
                    <h2 className="rb-5 mb-5 text-3xl font-bold text-text-alternative md:mb-6 md:text-4xl lg:text-5xl">
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
            <Footer />
        </div>
    );
}