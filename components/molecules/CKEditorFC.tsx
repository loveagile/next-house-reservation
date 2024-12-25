import axios from "axios";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditorBase from "ckeditor5-classic-plus";
import { Editor } from "@ckeditor/ckeditor5-core";

interface ICKEditorProps {
  article: string;
  setArticle: React.Dispatch<React.SetStateAction<string>>;
}

const ClassicEditor = ClassicEditorBase as unknown as {
  new(...args: any[]): Editor;
  create(...args: any[]): Promise<Editor>;
  EditorWatchdog: typeof Editor.EditorWatchdog;
  ContextWatchdog: typeof Editor.ContextWatchdog;
};

class MyUploadAdapter {
  loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    try {
      const file = await this.loader.file;

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/ckeditor/upload-file", formData);

      if (!res.data.url) {
        throw new Error("Failed to upload file. Server did not return a URL.");
      }

      return {
        default: res.data.url,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader);
  };
}

const CKEditorFC: React.FC<ICKEditorProps> = ({ article, setArticle }) => {
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
        extraPlugins: [MyCustomUploadAdapterPlugin],
      }}
    />
  );
};
export default CKEditorFC;
