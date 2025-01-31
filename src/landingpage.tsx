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
            <section
                className="px-[5%] py-16 md:py-24 lg:py-28 pt-45 lg:pt-45"
                style={{
                    paddingTop: "165px",
                    backgroundColor: "rgb(57, 65, 150)",
                }}
            >
                <div className="container mx-auto">
                    <div className="flex flex-col items-center">
                        {/* Text Section */}
                        <div className="mb-12 text-center md:mb-18 lg:mb-20 text-white">
                            <div className="w-full max-w-3xl mx-auto">
                                <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-7xl">
                                    Simplify Your Data, Grow Your Business
                                </h1>
                                <p className="text-base md:text-xl">
                                    AI-powered platform that turns your data into actionable insights — effortlessly.
                                </p>
                                <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                                    <button
                                        className="focus-visible:ring-[rgb(59,133,237)] cursor-pointer inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  disabled:opacity-50 border border-[rgb(59,133,237)] bg-[rgb(59,133,237)] text-white px-6 py-3 rounded-lg"
                                        title="Get Started for Free"
                                    >
                                        Get Started for Free
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
                className="flex flex-col justify-center items-center px-[5%] bg-white pt-0px"
                style={{ paddingTop: "150px" }}
            >
                <div className="container">
                    <div className="flex flex-col items-center">
                        {/* Text Section */}
                        <div className="rb-12 mb-12 text-center md:mb-18 lg:mb-38">
                            <div className="w-full max-w-xl">
                                <p className="mb-3 font-semibold md:mb-4">Powerful Tools for Smarter Decisions</p>
                                <h2 className="rb-5 mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl"
                                    style={{
                                        background: "linear-gradient(to bottom right, rgb(89,60,230), rgb(52,150,238))",
                                        WebkitBackgroundClip: "text",
                                        color: "transparent"
                                    }}>
                                    Unleash the Power of Your Data
                                </h2>

                                <p className=" text-lg md:text-lg lg:text-lg">
                                    Turn messy spreadsheets into clear insights, stunning visuals, and shareable reports—effortlessly.
                                    Perfect for small businesses, startups, and teams seeking actionable insights
                                </p>
                            </div>
                        </div>

                        {/* Grid Section */}
                        <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12" style={{ paddingTop: "45px" }}>
                            {/* Grid Item 1 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="/assets/light-bulb.png"
                                        className="size-12"
                                        alt="Relume logo 1"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Instant Insights at Your Fingertips
                                </h3>
                                <p>
                                    Ask your data questions and get actionable insights, stunning visuals, and tailored recommendations—no expertise required
                                </p>
                            </div>

                            {/* Grid Item 2 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="/assets/pie-chart.png"
                                        className="size-12"
                                        alt="Relume logo 2"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Graphs Made Simple With AI
                                </h3>
                                <p>
                                    Our AI not only generates stunning graphs and charts but also helps you uncover trends and patterns, turning your data into clear, actionable visuals in just seconds.
                                </p>
                            </div>

                            {/* Grid Item 3 */}
                            <div className="flex w-full flex-col items-center text-center">
                                <div className="rb-5 mb-5 md:mb-6">
                                    <img
                                        src="/assets/document.png"
                                        className="size-12"
                                        alt="Relume logo 3"
                                    />
                                </div>
                                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                                    Generate and Share Reports with Ease
                                </h3>
                                <p>
                                    Combine powerful insights and professional visuals into polished, shareable reports—ideal for teams, stakeholders, and impactful presentations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "40px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <img
                                src="/assets/illustration-integration.png"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
                        <div>
                            <div className="rb-5 mb-5 md:mb-6">
                                <img
                                    src="/assets/integration.png"
                                    className="size-12"
                                    alt="Relume logo"
                                />
                            </div>
                            <h3 className="mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                Connect Your Favorite Platforms
                            </h3>
                            <p className="md:text-lg lg:text-lg">
                                Integrate with popular platforms like Shopify, Google Sheets, and QuickBooks
                                to effortlessly retrieve your documents and access live data.
                                Stay updated and let your data flow automatically into one powerful analytics platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28 " style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
                        <div>
                            <p className="mb-3 font-semibold md:mb-4">Insights You Can Trust, Powered by AI</p>
                            <h1 className="mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Empower Your Decisions with AI Insights
                            </h1>
                            <p className="mb-5 text-base md:text-lg lg:text-lg">
                                Discover meaningful insights hidden within your data. Our AI-powered platform analyzes complex datasets
                                to deliver actionable recommendations, empowering you to make smarter decisions with confidence.
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
                                    <span>Extract deep insights effortlessly from your data.</span>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 2"
                                            className="size-6"
                                        />
                                    </div>
                                    <span>Understand trends and patterns like never before.</span>
                                </li>
                                <li className="flex self-start">
                                    <div className="mr-4 flex-none self-start">
                                        <img
                                            src="https://d22po4pjz3o32e.cloudfront.net/relume-icon.svg"
                                            alt="Relume logo 3"
                                            className="size-6"
                                        />
                                    </div>
                                    <span>Enhance decision-making with AI-backed recommendations.</span>
                                </li>
                            </ul>
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
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "0px" }}>
                <div className="container">
                    <div
                        className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20"
                    >
                        <div>
                            <h2 className="rb-5 mb-5 text-3xl font-bold leading-[1.2] md:mb-6 md:text-4xl lg:text-5xl">
                                Clean and Prepare Your Data Automatically
                            </h2>
                            <p className="mb-6 md:mb-8 md:text-lg lg:text-lg">
                                Upload raw data, and let our platform handle the hard work—removing duplicates,
                                fixing formatting errors, and filling missing values. Start every analysis with clean, reliable data.
                            </p>

                        </div>
                        <div>
                            <video
                                className="w-full object-cover"
                                src={'assets/graphanimation.mp4'}
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
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
                            <p className="mb-3 font-semibold md:mb-4">Simple And Easy To Use</p>
                            <h1 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Visualize and Understand Your Data Effortlessly
                            </h1>
                            <p className="mb-6 md:mb-8 md:text-lg lg:text-lg">
                                Our AI transforms your data into clear graphs and detailed reports,
                                helping you uncover insights and make smarter decisions faster.
                            </p>
                            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
                                <div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Create graphs</h6>
                                    <p>
                                        Create AI-assisted graphs that highlight trends and make your data easy to understand.
                                    </p>
                                </div>
                                <div>
                                    <h6 className="mb-3 text-md font-bold leading-[1.4] md:mb-4 md:text-xl">Generate Reports</h6>
                                    <p>
                                        Generate clear, professional reports with actionable insights in seconds.
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
            <section className="flex flex-col justify-center items-center px-[5%] py-12 md:py-16 lg:py-20" style={{ paddingTop: "90px" }}>
                <div className="container">
                    <h1
                        className="mx-auto mb-6 w-full max-w-lg text-center text-base font-bold leading-[1.2] md:mb-8 md:text-2xl lg:text-2xl md:leading-[1.2]"
                    >
                        Our Integrations
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pb-2 pt-4 md:pt-2">
                        <img
                            src="/assets/quickbooks.png"
                            alt="Webflow logo 1"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="/assets/salesforce.png"
                            alt="Relume logo 1"
                            className="h-[95px] w-[160px] "
                        /><img
                            src="/assets/airtablelogo.png"
                            alt="Webflow logo 2"
                            className="h-[75px] w-[150px]"
                        /><img
                            src="/assets/Shopify.png"
                            alt="Relume logo 2"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="/assets/Hubspot.png"
                            alt="Webflow logo 3"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="/assets/googledrive.png"
                            alt="Relume logo 3"
                            className="h-[75px] w-[150px]"
                        /><img
                            src="/assets/mailchimp.png"
                            alt="Webflow logo 4"
                            className="h-[75px] w-[150px] mb-1"
                        /><img
                            src="/assets/goglesheets.png"
                            alt="Relume logo 4"
                            className="h-[85px] w-[190px]"
                        /><img
                            src="/assets/Dropbox.png"
                            alt="Webflow logo 5"
                            className="max-h-12 md:max-h-14"
                        /><img
                            src="/assets/googleanalytics.png"
                            alt="Relume logo 5"
                            className="h-[85px] w-[190px]"
                        /><img
                            src="/assets/onedrive.png"
                            alt="Webflow logo 6"
                            className="h-[85px] w-[190px]"
                        />
                        <img
                            src="/assets/postgres.png"
                            alt="Webflow logo 6"
                            className="h-[85px] w-[190px]"
                        />
                        <img
                            src="/assets/mysql.png"
                            alt="Webflow logo 6"
                            className="h-[85px] w-[190px] mb-8"
                        />
                    </div>
                </div>
            </section>

            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "40px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Start Making Data-Driven Decisions Today
                            </h2>
                            <p className="md:text-lg lg:text-lg">
                                Ready to unlock actionable insights and streamline your decision-making?
                                Let our AI-powered tools transform the way you work with data."
                            </p>
                            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                                <button
                                    className="focus-visible:ring-[rgb(59,133,237)] inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-all duration-300 ease-in-out transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[rgb(59,133,237)] bg-[rgb(59,133,237)] text-white px-6 py-3 rounded-lg"
                                    title="Get Started for Free"
                                >
                                    Get Started for Free
                                </button>

                            </div>
                        </div>
                        <div>
                            <img
                                src="/assets/businessmen.png"
                                className="w-full object-cover"
                                alt="Relume placeholder image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "10px" }}>
                <div className="container">
                    <div className="mb-12 md:mb-18 lg:mb-20">
                        <div className="mx-auto w-full max-w-lg text-center">
                            <p className="mb-3 font-semibold md:mb-4">Blog</p>
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Stay Ahead with Expert Tips
                            </h2>
                            <p className="md:text-md">Explore our blog for tips, trends, and expert advice to help you make the most of your data.</p>
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
