import React from 'react';
import FlashApi from 'api/FlashApi';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    
  }
  

  handleClick() {
    this.props.onClick();
  }

  async handleRemove() {
    const {result} = await FlashApi.removeCard(this.props._id);
    if(result) {
      this.props.onRemove(this.props._id);
    }
  }

  render() {
    return (
      <div>
        <span onClick={this.handleClick}> {this.props.title}</span>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    )
  }
}

export default TitleBar;