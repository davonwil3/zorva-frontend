import React from "react";
import { Link } from "react-router-dom";



export default function BlogCard(props: any){

    const imageUrl = props.imageUrl;
    const altText = props.altText;
    const category = props.category;
    const readTime = props.readTime;
    const title = props.title;
    const description = props.description;
    const href = props.href;


    return (
      <div className="flex size-full flex-col items-center justify-start border border-border-primary">
        {/* Image + link */}
       <Link to={`/blogpost/${href}`}>
          <img src={imageUrl} alt={altText} className="aspect-[3/2] size-full object-cover" />
        </Link>

  
        {/* Card Content */}
        <div className="px-5 py-6 md:p-6">
          <div className="rb-4 mb-4 flex w-full items-center justify-start">
            <p className="mr-4 bg-background-secondary px-2 py-1 text-sm font-semibold">
              {category}
            </p>
            <p className="inline text-sm font-semibold">{readTime}</p>
          </div>
          <div className="flex w-full flex-col items-start justify-start">
            <a className="mb-2" href={href}>
              <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
            </a>
            <p>{description}</p>
            <button
              className="focus-visible:ring-border-primary whitespace-nowrap ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 text-text-primary gap-2 p-0 mt-6 flex items-center justify-center gap-x-2"
              title="Read more"
            >
              Read more
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
    );
  }