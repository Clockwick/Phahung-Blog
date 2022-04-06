import React, { Dispatch, SetStateAction, useRef } from 'react';

import ReactEditorJS from 'react-editor-js';
import EditorJS from '@editorjs/editorjs';
import DragDrop from 'editorjs-drag-drop';

import { EDITOR_JS_TOOLS } from './config';

import 'styles/editor.css';

interface Props {
  placeholder?: string;
  initialData?: EditorJS.OutputData;
  callback: Dispatch<SetStateAction<EditorJS.OutputData>>;
}

const defaultProps = {
  placeholder: undefined,
  initialData: undefined,
};

const Editor: React.FC<Props> = ({ placeholder, initialData, callback }) => {
  const editorJSRef = useRef<ReactEditorJS>(null);

  return (
    <ReactEditorJS
      ref={editorJSRef}
      placeholder={placeholder}
      data={initialData}
      tools={EDITOR_JS_TOOLS}
      onReady={(instance?: EditorJS) => {
        new DragDrop(instance); // eslint-disable-line
      }}
      onChange={async () => {
        const outputData: EditorJS.OutputData =
          (await editorJSRef.current?.instance?.save()) as EditorJS.OutputData;
        callback(outputData);
      }}
      autofocus
    />
  );
};
Editor.defaultProps = defaultProps;

export default Editor;
