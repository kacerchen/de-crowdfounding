import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import QuillEditor from './styles/editor.style';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    const { selectedProject } = props;
    const initVal = selectedProject.additional.value ? selectedProject.additional.value : '';
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: initVal };
    this.quillModules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }, { font: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    };
  }

  handleChange(value) {
    const { selectedProject } = this.props;
    selectedProject['additional'] = { value };
    this.setState({ value });
  }

  render() {
    const options = {
      theme: 'snow',
      formats: Editor.formats,
      placeholder: 'Write Something',
      value: this.state.value,
      onChange: this.handleChange,
      modules: this.quillModules,
    };
    return (
      <QuillEditor>
        <ReactQuill {...options} />
      </QuillEditor>
    );
  }
}
