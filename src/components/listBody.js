import React from 'react';
import ListItem from 'containers/listItem';




const ListBody = ({cards,children}) => {
  return (
    <div>
      {cards.map(card=>{
        return <ListItem
          key={card._id}
          _id={card._id}
          title={card.title}
          isDone={card.isDone}
          />
      })}
      {children}
    </div>
  );
}

export default ListBody;