import React from "react";
import DOMPurify from "dompurify";

interface IHTMLContentProps {
  content: string;
}

const HTMLContent: React.FC<IHTMLContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div
      className="w-full"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default HTMLContent;
