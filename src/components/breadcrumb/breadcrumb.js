import React from 'react';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(event) {
    this.props.onClickItem(event.target.dataset.clickid);
  }
  
  render () {
    return (
      <div>
        {this.props.itemArray.map(item=>(
          <button onClick={this.handleItemClick} key={item.clickId} data-clickid={item.clickId}>{item.title}</button>
        ))}
      </div>
    )
  }
}

export default Breadcrumb;