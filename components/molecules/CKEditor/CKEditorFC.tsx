import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditorBase from "ckeditor5-classic-plus";
import { Editor } from "@ckeditor/ckeditor5-core";

interface ICKEditorProps {
  article: string;
  setArticle: React.Dispatch<React.SetStateAction<string>>;
}

const ClassicEditor = ClassicEditorBase as unknown as {
  new (...args: any[]): Editor;
  create(...args: any[]): Promise<Editor>;
  EditorWatchdog: typeof Editor.EditorWatchdog;
  ContextWatchdog: typeof Editor.ContextWatchdog;
};

const CKEditorFC: React.FC<ICKEditorProps> = ({ article, setArticle }) => {
  console.log(article);
  return (
    <CKEditor
      editor={ClassicEditor}
      data={article}
      onReady={(editor) => {
        // You can store the "editor" and use it when it is needed.
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setArticle(data);
      }}
      config={{
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: "http://localhost:3000/",
          // Enable the XMLHttpRequest.withCredentials property if required.
          withCredentials: true,
          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            "X-CSRF-Token": "CSRF-Token",
            Authorization: "Bearer [JSON Web Token]",
          },
        },
      }}
    />
  );
};
export default CKEditorFC;
