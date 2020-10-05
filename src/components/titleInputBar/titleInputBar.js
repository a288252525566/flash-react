import React from 'react';
import FlashApi from 'api/FlashApi';

class TitleInputBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.textInput = React.createRef();

    this.state = {
      newTitle:props.title
    }
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  async handleSubmit() {
    
    if(this.props.title===this.state.newTitle) {
      this.handleBlur();
      return;
    }

    const data = {title:this.state.newTitle}
    const {result,error} = await FlashApi.updateCard(this.props._id,data);
    if(result) {
      this.props.onSubmit(data);
    }
    else if(error) {
      console.log(error);
    }
  }

  handleBlur() {
    this.props.onBlur();
  }

  handleChange(event) {
    this.setState(
      {
        newTitle:event.target.value
      }
    );
  }
  
  render() {
    return (
      <div>
        <input value={this.state.newTitle} onChange={this.handleChange} ref={this.textInput}/>
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.handleBlur}>Cancel</button>
      </div>
    )
  }
}

export default TitleInputBar;