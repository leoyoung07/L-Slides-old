import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/markdown/markdown';
import _ from 'lodash';
import React from 'react';
import showdown from 'showdown';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {}
}

interface IMainProps {}

interface IMainState {
  slides: string[];
  currentSlideIndex: number;
}

const DEFAULT_SLIDE_SEPARATOR = /^\r?\n---\r?\n$/gim;

class Main extends React.Component<IMainProps, IMainState> {
  private editorRef = React.createRef<HTMLDivElement>();
  private previewRef = React.createRef<HTMLDivElement>();

  private editor: CodeMirror.Editor | null = null;

  private converter: showdown.Converter | null = null;

  constructor(props: IMainProps) {
    super(props);
    this.state = {
      slides: [],
      currentSlideIndex: 0
    };
    this.converter = new showdown.Converter();
  }

  componentDidMount() {
    const initValue = '# Hello, world!';
    const updateSlides = _.throttle(this.updateSlides, 300);
    updateSlides(initValue);
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
        updateSlides(value);
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
          style={{
            width: '50%',
            height: '100%'
          }}
        >
          <div style={{ width: '100%', height: '100%' }} ref={this.editorRef} />
        </div>
        <div
          style={{
            width: '50%',
            height: '100%',
            position: 'relative'
          }}
          className="reveal"
        >
          <div
            style={{ width: '100%', height: '100%' }}
            ref={this.previewRef}
          />
          <div
            style={
              {
                // position: 'absolute',
                // bottom: 0,
                // right: 0
              }
            }
            className="controls"
          >
            <button onClick={this.onPrev} className="navigate-left enabled">
              <div className="controls-arrow" />
            </button>
            <button onClick={this.onNext} className="navigate-right enabled">
              <div className="controls-arrow" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  private updatePreview = (value: string) => {
    if (this.previewRef.current && this.converter) {
      this.previewRef.current.innerHTML = this.converter.makeHtml(value);
    }
  };

  private updateSlides = (value: string) => {
    const slides = value.split(DEFAULT_SLIDE_SEPARATOR);
    const currentSlideIndex = 0;
    const previewValue =
      slides.length > currentSlideIndex ? slides[currentSlideIndex] : '';
    this.setState(
      {
        slides,
        currentSlideIndex
      },
      () => {
        this.updatePreview(previewValue);
      }
    );
  };

  private onPrev = () => {
    const index = Math.max(this.state.currentSlideIndex - 1, 0);
    const previewValue = this.state.slides[index];
    this.setState(
      {
        currentSlideIndex: index
      },
      () => {
        this.updatePreview(previewValue);
      }
    );
  };

  private onNext = () => {
    const index = Math.min(
      this.state.currentSlideIndex + 1,
      this.state.slides.length - 1
    );
    const previewValue = this.state.slides[index];
    this.setState(
      {
        currentSlideIndex: index
      },
      () => {
        this.updatePreview(previewValue);
      }
    );
  };
}

export default Main;
