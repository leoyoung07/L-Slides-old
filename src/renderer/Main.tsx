import * as monaco from 'monaco-editor';
import React from 'react';
class Main extends React.Component {
  private editorRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    if (this.editorRef && this.editorRef.current) {
      monaco.editor.create(this.editorRef.current, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join(
          '\n'
        ),
        language: 'javascript'
      });
    }
  }

  render() {
    return (
      <div
        ref={this.editorRef}
        style={{
          width: '500px',
          height: '500px'
        }}
      >
        L-Slides
      </div>
    );
  }
}

export default Main;
