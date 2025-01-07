import React from "react";

export default function BlogCard2(props: any) {

    const imageUrl = props.imageUrl;
    const altText = props.altText;
    const category = props.category;
    const readTime = props.readTime;
    const title = props.title;
    const description = props.description;
    const href = props.href;
    const authorName = props.authorName;
    const avatarUrl = props.avatarUrl;
    const date = props.date;

  return (
    <div>
      {/* Image Link */}
      <a href={href} className="mb-6 inline-block w-full max-w-full">
        <div className="w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className="aspect-[3/2] size-full object-cover"
          />
        </div>
      </a>

      {/* Category Link */}
      <a href={href} className="mb-2 mr-4 inline-block max-w-full text-sm font-semibold">
        {category}
      </a>

      {/* Title Link */}
      <a href={href} className="mb-2 block max-w-full">
        <h5 className="text-xl font-bold md:text-2xl">{title}</h5>
      </a>

      {/* Description */}
      <p>{description}</p>

      {/* Author Info */}
      <div className="mt-6 flex items-center">
        <div className="mr-4 shrink-0">
          <img
            src={avatarUrl}
            alt="Author avatar"
            className="size-12 min-h-12 min-w-12 rounded-full object-cover"
          />
        </div>
        <div>
          <h6 className="text-sm font-semibold">{authorName}</h6>
          <div className="flex items-center">
            <p className="text-sm">{date}</p>
            <span className="mx-2">•</span>
            <p className="text-sm">{readTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
