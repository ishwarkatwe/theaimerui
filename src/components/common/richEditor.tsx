import { useState } from "react";
import { Editor } from "primereact/editor";

import "./richEditor.css";

export default function RichEditor(props: any) {
  const [text, setText] = useState(
    "<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>"
  );

  // const renderHeader = () => {
  //   return (
  //     <span className="ql-formats">
  //       <button className="ql-bold" aria-label="Bold"></button>
  //       <button className="ql-italic" aria-label="Italic"></button>
  //       <button className="ql-underline" aria-label="Underline"></button>
  //     </span>
  //   );
  // };

  // const header = renderHeader();

  return (
    <div className="card">
      <Editor
        value={text}
        onTextChange={(e) => setText(e.textValue)}
        // headerTemplate={header}
        style={{ height: "320px" }}
        {...props}
      />
    </div>
  );
}
