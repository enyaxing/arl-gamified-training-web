import React, { Component } from "react";
import ReactFileReader from 'react-file-reader';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Use reader.result
          alert(reader.result)
      }
      reader.readAsText(files[0]);
  }

  render() {
    return (
      <div>
        <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
            <button className='btn'>Upload</button>
        </ReactFileReader>
      </div>
    );
  }
}

export default Upload;
