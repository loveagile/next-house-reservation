import React from "react";
import DOMPurify from "dompurify";
import "../molecules/CKEditor/CKEditorFC.css";

interface IHTMLContentProps {
  content: string;
}

const HTMLContent: React.FC<IHTMLContentProps> = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div
      className="w-full h-auto"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

export default HTMLContent;
