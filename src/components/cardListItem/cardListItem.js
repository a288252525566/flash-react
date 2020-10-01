import React from 'react';
import FlashApi from 'api/FlashApi';

class CardListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.textInput = React.createRef();
    
    
    

    this.state = {
      title: props.title,
      newTitle:props.title,
      isFocused:false
    };
  }
  
  handleFocus() {
    this.setState({isFocused:true}, ()=>{
      this.textInput.current.focus();
    });
  }

  handleBlur() {
    this.setState(
      {
        isFocused:false,
        newTitle:this.state.title
      }
    );
  }
  handleChange(event) {
    this.setState(
      {
        newTitle:event.target.value
      }
    );
  }

  async handleSubmit() {
    if(this.state.title===this.state.newTitle) {
      this.setState({isFocused:false});
      return;
    }
    const data = {title:this.state.newTitle}
    const {result,error} = await FlashApi.updateCard(this.props._id,data);
    if(result) {
      this.setState(
        {
          title:this.state.newTitle
        }
      );
      this.props.handleUpdate(this.props._id,data);
    }
    else {
      this.setState(
        {
          newTitle:this.state.title
        }
      );
    }
    this.setState({isFocused:false});
  }

  async handleRemove() {
    const {result,error} = await FlashApi.removeCard(this.props._id);
    if(result) {
      this.props.handleRemove(this.props._id);
    }
  }
  
  render() {
    if(!this.state.isFocused){
      return (
        <div>
          <span onClick={this.handleFocus}> {this.state.title}</span>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <input value={this.state.newTitle} onChange={this.handleChange} ref={this.textInput}/>
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleBlur}>Cancel</button>
        </div>
      );
    }
  }
}

export default CardListItem;