import React from 'react';
import FlashApi from 'api/FlashApi';
import Breadcrumb from 'components/breadcrumb/breadcrumb';

class CardListHead extends React.Component {
  constructor(props) {
    super(props);
    
    this.loadPath = this.loadPath.bind(this);
    this.handleEnter = this.handleEnter.bind(this);

    this.state = {
      isLoading:this.props.listId?true:false,
      path:[]
    }
  }
  loadPath() {
    FlashApi.getPath(this.props.listId).then(res=>{
      this.setState({path:res.result,isLoading:false});
    });
  }


  handleEnter(_id) {
    if(!_id) this.props.onEnter(null);
    else this.props.onEnter(_id);
  }

  render () {
    if(this.state.isLoading){
      this.loadPath();
      return (<div>loading...</div>)
    }
    const breadcrumbArray = [{title:'root',clickId:null},...this.state.path.map(item=>{
      return {title:item.title,clickId:item._id};
    })];
    return (
      <div>
        <Breadcrumb onClickItem={this.handleEnter} itemArray={breadcrumbArray}/>
      </div>
    )
  }
}

export default CardListHead;