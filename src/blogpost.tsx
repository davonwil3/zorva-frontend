import React from 'react';
import Nav from './components/nav';
import Footer from './components/footer';
import { useParams } from 'react-router-dom';



export default function BlogPost() {
    const { slug } = useParams();

    return (
        <div className="bg-white">
            <Nav />
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "110px" }}>
                <div className="container">
                    <div className="mx-auto mb-12 flex w-full max-w-3xl flex-col items-start justify-start md:mb-16 lg:mb-20">
                        {/* Breadcrumb navigation */}
                        <nav aria-label="breadcrumb" className="mb-6 flex w-full items-center">
                            <ol className="flex flex-wrap items-center gap-1.5 break-words text-text-primary sm:gap-2">
                                <li className="inline-flex items-center gap-1.5">
                                    <a href="#">Blog</a>
                                </li>
                                <li role="presentation" aria-hidden="true" className="text-text-primary [&amp;&gt;svg]:size-4">
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
                                </li>
                                <li className="inline-flex items-center gap-1.5">
                                    <a href="#">Category</a>
                                </li>
                            </ol>
                        </nav>
                        {/* Blog title */}
                        <h1 className="mb-8 text-3xl font-bold md:mb-10 md:text-4xl lg:mb-12 lg:text-5xl">
                            Blog title heading will go here
                        </h1>
                        {/* Author info */}
                        <div className="flex w-full flex-col items-start justify-between sm:flex-row sm:items-end">
                            <div className="rb-4 mb-4 flex items-center sm:mb-0">
                                <div className="mr-4 shrink-0">
                                    <img
                                        src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                        alt="Relume placeholder avatar"
                                        className="size-14 min-h-14 min-w-14 rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h6 className="font-semibold">Full name</h6>
                                    <div className="mt-1 flex">
                                        <p className="text-sm">11 Jan 2022</p>
                                        <span className="mx-2">•</span>
                                        <p className="text-sm">5 min read</p>
                                    </div>
                                </div>
                            </div>
                            {/* Social media sharing icons */}
                            <div className="rt-4 mt-4 grid grid-flow-col grid-cols-[max-content] items-start gap-2">
                                <a href="#" className="rounded-[1.25rem] bg-background-secondary p-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        className="size-6"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M4.222 19.778a4.983 4.983 0 0 0 3.535 1.462 4.986 4.986 0 0 0 3.536-1.462l2.828-2.829-1.414-1.414-2.828 2.829a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.829-2.828-1.414-1.414-2.829 2.828a5.006 5.006 0 0 0 0 7.071zm15.556-8.485a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0L9.879 7.051l1.414 1.414 2.828-2.829a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.829 2.828 1.414 1.414 2.829-2.828z"
                                        ></path>
                                        <path d="m8.464 16.95-1.415-1.414 8.487-8.486 1.414 1.415z"></path>
                                    </svg>
                                </a>
                                <a href="#" className="rounded-[1.25rem] bg-background-secondary p-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        className="size-6"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
                                        ></path>
                                    </svg>
                                </a>
                                <a href="#" className="rounded-[1.25rem] bg-background-secondary p-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 512 512"
                                        className="size-6 p-0.5"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                        ></path>
                                    </svg>
                                </a>
                                <a href="#" className="rounded-[1.25rem] bg-background-secondary p-1">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 24 24"
                                        className="size-6"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Blog Content */}
                    <div className="flex flex-col justify-center items-center mx-auto w-full overflow-hidden">
                        <div className="flex flex-col justify-center items-center w-full max-w-4xl h-auto">
                            <img
                                src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg"
                                className="w-full h-auto object-cover aspect-[2]"
                                alt="Relume placeholder image"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "10px" }}>
                <div className="container">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:gap-x-20">
                        <div className="order-last lg:order-none">
                            <div className="lg:sticky lg:top-20 lg:max-w-xxs">
                                <div>
                                    <h6 className="mb-3 font-bold md:mb-4 md:text-md">Subscribe to newsletter</h6>
                                    <form className="mb-4 flex flex-col gap-3 sm:gap-4">
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
                                            className="focus-visible:ring-border-primary inline-flex gap-3 items-center justify-center whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-border-primary bg-background-alternative text-text-alternative px-5 py-2"
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
                                    <div className="my-8 h-px bg-border-primary"></div>
                                    <p className="font-bold md:text-md">Share</p>
                                    <div className="mt-5 flex items-start gap-2 md:mt-6">
                                        <a href="#" className="size-8 rounded-[1.25rem] bg-background-secondary p-1"
                                        ><svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            className="size-6"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                                <path
                                                    d="M4.222 19.778a4.983 4.983 0 0 0 3.535 1.462 4.986 4.986 0 0 0 3.536-1.462l2.828-2.829-1.414-1.414-2.828 2.829a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.829-2.828-1.414-1.414-2.829 2.828a5.006 5.006 0 0 0 0 7.071zm15.556-8.485a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0L9.879 7.051l1.414 1.414 2.828-2.829a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.829 2.828 1.414 1.414 2.829-2.828z"
                                                ></path>
                                                <path d="m8.464 16.95-1.415-1.414 8.487-8.486 1.414 1.415z"></path></svg></a
                                        ><a href="#" className="size-8 rounded-[1.25rem] bg-background-secondary p-1"
                                        ><svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            className="size-6"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                                <path
                                                    d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
                                                ></path></svg>
                                        </a>
                                        <a href="#" className="size-8 rounded-[1.25rem] bg-background-secondary p-1"
                                        ><svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 512 512"
                                            className="size-6 p-0.5"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                                <path
                                                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                                ></path></svg></a
                                        ><a href="#" className="size-8 rounded-[1.25rem] bg-background-secondary p-1"
                                        ><svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            stroke-width="0"
                                            viewBox="0 0 24 24"
                                            className="size-6"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                                <path
                                                    d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"
                                                ></path></svg
                                            ></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="prose md:prose-md lg:prose-lg">
                            <h3>Introduction</h3>
                            <p>
                                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend
                                faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna,
                                etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien
                                varius id.
                            </p>
                            <p>
                                Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat
                                lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant
                                diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum
                                molestie aliquet sodales id est ac volutpat.
                            </p>
                            <figure>
                                <img
                                    src="https://d22po4pjz3o32e.cloudfront.net/placeholder-image-landscape.svg"
                                    alt="Relume placeholder image"
                                />
                                <figcaption>Image caption goes here</figcaption>
                            </figure>
                            <h6>
                                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In
                                aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam
                                in vitae malesuada fringilla.
                            </h6>
                            <p>
                                Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur
                                convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna.
                                Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue
                                convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies
                                eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra,
                                porttitor.
                            </p>
                            <blockquote>
                                &quot;Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non
                                pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam
                                elit, orci, tincidunt aenean tempus.&quot;
                            </blockquote>
                            <p>
                                Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies
                                vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed
                                mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum
                                faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.
                            </p>
                            <h4>Conclusion</h4>
                            <p>
                                Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est
                                ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique
                                consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.
                            </p>
                            <p>
                                Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In
                                tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis
                                lobortis at sit dictum eget nibh tortor commodo cursus.
                            </p>
                            <p>
                                Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna
                                nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id
                                eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc
                                tortor.Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus
                                diam.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="relume" className="flex flex-col justify-center items-center px-[5%] py-16 md:py-24 lg:py-28" style={{ paddingTop: "10px" }}>
                <div className="container">
                    <div className="flex flex-col items-center border border-border-primary p-8 md:p-12 lg:p-16">
                        <div className="max-w-lg text-center">
                            <h2 className="rb-5 mb-5 text-3xl font-bold md:mb-6 md:text-4xl lg:text-5xl">
                                Medium length heading goes here
                            </h2>
                            <p className="md:text-md">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                                elementum tristique.
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
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
                </div>
            </section>
            <Footer />

        </div>

    );
}