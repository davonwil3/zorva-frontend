import React from 'react';

function FeatureItem(props : any) {
  const { text } = props;
  return (
    <div className="flex self-start">
      <div className="mr-4 flex-none self-start">
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
          <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
        </svg>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default FeatureItem;