import React from 'react';
import TitleBar from 'components/titleBar/titleBar';
import TitleInputBar from 'components/titleInputBar/titleInputBar';

class CardListItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleRemove = this.handleRemove.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleDefocus = this.handleDefocus.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    
    
    
    

    this.state = {
      title: props.title,
      isFocused:false
    };
  }
  
  handleFocus() {
    this.setState({isFocused:true});
  }

  handleDefocus() {
    this.setState(
      {
        isFocused:false
      }
    );
  }

  async handleUpdate(data) {
    this.setState(data);
    this.props.handleUpdate(this.props._id,data);

    this.setState({isFocused:false});
  }


  //傳遞onRemove
  handleRemove(_id) {
    this.props.onRemove(_id);
  }
  
  render() {
    if(!this.state.isFocused){
      return (
        <TitleBar
          onClick={this.handleFocus}
          onCheck={this.handleUpdate}
          onRemove={this.handleRemove}
          title={this.state.title}
          checked={this.props.checked}
          _id={this.props._id}/>
      );
    }
    else {
      return (
        <TitleInputBar onSubmit={this.handleUpdate} onBlur={this.handleDefocus} _id={this.props._id} title={this.state.title}/>
      );
    }
  }
}

export default CardListItem;