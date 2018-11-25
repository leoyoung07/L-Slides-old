import React from 'react';
declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    module: any;
    // tslint:disable-next-line:no-any
    monaco: any;
  }
}
class Main extends React.Component {
  private editorRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    (function() {
      const path = require('path');
      const amdLoader = require('../../node_modules/monaco-editor/min/vs/loader.js');
      const amdRequire = amdLoader.require;
      const amdDefine = amdLoader.require.define;
      function uriFromPath(_path: string) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
          pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
      }
      amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
      });
      // workaround monaco-css not understanding the environment
      self.module = undefined;
      amdRequire(['vs/editor/editor.main'], function() {
        var editor = self.monaco.editor.create(document.getElementById('container'), {
          value: [
            'function x() {',
            '\tconsole.log("Hello world!");',
            '}'
          ].join('\n'),
          language: 'javascript'
        });
      });
    })();
  }

  render() {
    return (
      <div
        ref={this.editorRef}
        id="container"
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
