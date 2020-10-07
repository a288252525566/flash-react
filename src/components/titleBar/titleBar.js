import React from 'react';
import FlashApi from 'api/FlashApi';
import styles from './titleBar.module.scss';
import { ReactComponent as Enter } from 'images/enter.svg';

class TitleBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.state = {
      checked:this.props.checked,
    }
    
  }
  
  handleEnter() {
    this.props.onEnter();
  }
  handleClick() {
    this.props.onClick();
  }

  async handleCheck(event) {
    const checked = event.target.checked;
    this.setState({checked:checked});
    const data = {isDone:checked};
    const {result} = await FlashApi.updateCard(this.props._id,data);
    if(result) {
      this.props.onCheck(data);
    }
  }

  async handleRemove() {
    const {result} = await FlashApi.removeCard(this.props._id);
    if(result) {
      this.props.onRemove(this.props._id);
    }
  }

  render() {
    const className = this.state.checked? styles.checked:styles;
    return (
      <div className={className} >
        <Enter onClick={this.handleEnter}/>
        <input type="checkbox" onChange={this.handleCheck} checked={this.state.checked}/>
        <span onClick={this.handleClick}> {this.props.title}</span>
        <button className={styles.removeButton} onClick={this.handleRemove}>Remove</button>
      </div>
    )
  }
}

export default TitleBar;