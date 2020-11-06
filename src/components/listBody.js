import React from 'react';
import ListItem from 'containers/listItem';




const ListBody = ({todos,children}) => {
  return (
    <div>
      {todos.map(todo=>{
        return <ListItem
          key={todo._id}
          _id={todo._id}
          title={todo.title}
          isDone={todo.isDone}
          />
      })}
      {children}
    </div>
  );
}

export default ListBody;