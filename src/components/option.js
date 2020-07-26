import React, { Component } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
        <div>
            <h1>{this.props.question}</h1>
            <FormControl component="fieldset">
              <RadioGroup row value={this.props.values} onChange={e => this.props.changeValue(e, this.props.number)}>
                <FormControlLabel value="1" control={<Radio />} label={this.props.responses[0]} labelPlacement="bottom" />
                <FormControlLabel value="2" control={<Radio />} label="" labelPlacement="bottom"/>
                <FormControlLabel value="3" control={<Radio />} label={this.props.responses[1]} labelPlacement="bottom"/>
                <FormControlLabel value="4" control={<Radio />} label="" labelPlacement="bottom"/>
                <FormControlLabel value="5" control={<Radio />} label={this.props.responses[2]} labelPlacement="bottom"/>
              </RadioGroup>
            </FormControl>
        </div>
    );
  }
}

export default Options;
