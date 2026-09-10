import React, { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";
import "jodit/es2021/jodit.min.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  height?: number | string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder,
  className = "",
  height,
}) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      showPlaceholder: false,
      toolbarAdaptive: false,
      defaultColor: "", // Forces explicit color styling (e.g. #000000) instead of clearing style attribute

      enter: "P",          // ✅ Important
      enterBlock: "li",    // ✅ Forces new <li> on Enter inside lists
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,

      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "copyformat", // ✅ Match Property / Format Painter
        "eraser",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        "hr",
      ],
      height: height || 300,
    }),
    [placeholder, height]
  );

  return (
    <div className={`rich-text-editor ${className}`}>
      <style>
        {`
          .rich-text-editor .jodit-wysiwyg ul,
          .rich-text-editor .jodit-container ul,
          .rich-text-editor .jodit-workplace ul,
          .rich-text-editor ul {
            list-style-type: disc !important;
            list-style-position: outside !important;
            padding-left: 2rem !important;
            margin-top: 8px !important;
            margin-bottom: 8px !important;
          }
          .rich-text-editor .jodit-wysiwyg ol,
          .rich-text-editor .jodit-container ol,
          .rich-text-editor .jodit-workplace ol,
          .rich-text-editor ol {
            list-style-type: decimal !important;
            list-style-position: outside !important;
            padding-left: 2rem !important;
            margin-top: 8px !important;
            margin-bottom: 8px !important;
          }
          .rich-text-editor .jodit-wysiwyg li,
          .rich-text-editor .jodit-container li,
          .rich-text-editor .jodit-workplace li,
          .rich-text-editor li {
            display: list-item !important;
            list-style-position: outside !important;
          }
        `}
      </style>
      <JoditEditor
        ref={editor}
        value={value}
        config={config as any}
        onBlur={(newContent) => onChange(newContent)}
        onChange={(newContent) => onChange(newContent)}
      />
    </div>
  );
};

export default RichTextEditor;
