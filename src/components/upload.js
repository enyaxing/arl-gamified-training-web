import React, { Component } from "react";
import ReactFileReader from "react-file-reader";

// Pass in handleFiles as props
/** Upload button that lets you upload a csv. */
class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleFiles = files => {
  //     var reader = new FileReader();
  //     reader.onload = function(e) {
  //         // Use reader.result
  //         alert(reader.result)
  //     }
  //     reader.readAsText(files[0]);
  // }

  render() {
    const { handleFiles, uploadText } = this.props;
    return (
      <div>
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <button className="btn">{uploadText}</button>
        </ReactFileReader>
      </div>
    );
  }
}

export default Upload;
