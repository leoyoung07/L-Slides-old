import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/markdown/markdown';
import React from 'react';
import showdown from 'showdown';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {}
}

class Main extends React.Component {
  private editorRef = React.createRef<HTMLDivElement>();
  private previewRef = React.createRef<HTMLDivElement>();

  private editor: CodeMirror.Editor | null = null;

  private converter: showdown.Converter | null = null;

  constructor() {
    super({});
    this.converter = new showdown.Converter();
  }

  componentDidMount() {
    const initValue = '# Hello, world!';
    this.updatePreview(initValue);
    if (this.editorRef.current) {
      this.editor = CodeMirror(this.editorRef.current, {
        value: initValue,
        mode: {
          name: 'gfm',
          highlightFormatting: true
        },
        lineNumbers: true,
        theme: 'material'
      });
      this.editor.on('change', (editor, change) => {
        const value = editor.getValue();
        this.updatePreview(value);
      });
    }
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-around'
        }}
      >
        <div
          ref={this.editorRef}
          id="container"
          style={{
            width: '50%',
            height: '100%'
          }}
        />
        <div
          ref={this.previewRef}
          style={{
            width: '50%',
            height: '100%'
          }}
        />
      </div>
    );
  }

  private updatePreview(value: string) {
    if (this.previewRef.current && this.converter) {
      this.previewRef.current.innerHTML = this.converter.makeHtml(value);
    }
  }
}

export default Main;
