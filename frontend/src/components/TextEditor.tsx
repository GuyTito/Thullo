import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useState, useCallback } from "react";


interface TextEditorProps{
  text: string
  getEditorContent: (content: string) => void
  showEditor: (value: boolean) => void
}

const TOOLBAR_OPTIONS = [
  // [{ header: [1, 2, 3, 4, 5, 6, false] }],
  // [{ font: [] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }],
  // [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  // ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor(props: TextEditorProps) {
  const { text, getEditorContent, showEditor } = props
  const [quill, setQuill] = useState<Quill>()


  const wrapperRef = useCallback((wrapper: HTMLDivElement) => {
    if (wrapper == null) return
    wrapper.innerHTML = ""
    const editor = document.createElement('div')
    wrapper.append(editor)

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q)
    document.querySelector('.ql-editor')!.innerHTML = text
  }, [])

  function returnContent(){
    if (quill == null) return
    
    getEditorContent(quill.root.innerHTML)
  }

  
  return (
    <>
      <Editor ref={wrapperRef}></Editor>
      <Div >
        <button onClick={() => returnContent()} className="btn-pad btn-main">Save</button>
        <button onClick={() => showEditor(false)}>Cancel</button>
      </Div>
    </>
  )
}


const Editor = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  .ql-toolbar{
    border: 0;
    border-bottom: 1px solid #ccc;
  }
  .ql-container{
    border: 0;
    width: 100%;
  }
`

const Div = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  margin-top:8px;
`
