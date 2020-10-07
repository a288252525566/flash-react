import React from 'react';
import FlashApi from 'api/FlashApi';
import CardListItem from 'components/cardListItem/cardListItem';

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.addCard = this.addCard.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    
    

    this.state = {
      list: [],
      error: null,
      isLoaded:true,
      newCardTitle:''
    };
  }


  async loadList() {
    const {result,error} = await FlashApi.getCardList();
    
    if(result) {
      this.setState({
        isLoaded:false,
        list: result,
      });
    }
    else if(error) {
      this.setState({
        isLoaded: false,
        error:error
      });
    }
  }

  async addCard() {
    const data = {title:this.state.newCardTitle};
    this.setState({newCardTitle:''});
    const {result,error} = await FlashApi.addCard(data);
    if(result) {
      this.setState({newCardTitle:''});
      this.loadList();
    }
    else if(error) {
    }
  }


  handleChange(event){
    this.setState({newCardTitle: event.target.value});
  }

  handleRemove(_id) {
    //find index and remove
    this.setState((state)=>{
      const list = [...state.list];
      const removeIndex = list.findIndex(item=>{
        return (item._id===_id);
      });
      if(removeIndex<0) return;
      const newList = [...list.slice(0,removeIndex),...list.slice(removeIndex+1)];
      return {list:newList}
    });
  }

  handleUpdateItem(_id,data) {
    //find index and remove
    this.setState((state)=>{
      const newList = state.list.map(item=>{
        if(item._id!==_id) return item;
        return  {...item,...data};
      });
      return {list:newList}
    });
  }
  


  render() {
    const { error, isLoaded, list, newCardTitle} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (isLoaded) {
      this.loadList();
      return <div>Loading...</div>;
    } else {
      return (
        <div className='listbody'>
          {list.map(item => (
            <CardListItem
              key={item._id}
              onRemove={this.handleRemove}
              handleUpdate={this.handleUpdateItem}
              _id={item._id}
              title={item.title}
              checked={item.isDone}/>
          ))}
          <input value={newCardTitle} onChange={this.handleChange}/>
          <button className='createButton' onClick={this.addCard} >create</button>
        </div>
      );
    }
  }
}

export default CardList;