import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/markdown/markdown';
import React from 'react';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {}
}

class Main extends React.Component {
  private editorRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.editorRef.current) {
      const editor = CodeMirror(this.editorRef.current, {
        value: '# Hello, world!',
        mode: {
          name: 'gfm',
          highlightFormatting: true
        },
        lineNumbers: true,
        theme: 'material'
      });
    }
  }

  render() {
    return (
      <div
        ref={this.editorRef}
        id="container"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    );
  }
}

export default Main;
