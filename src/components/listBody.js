import React from 'react';
import ListItem from 'containers/listItem';
import {Droppable} from 'react-beautiful-dnd';




const ListBody = ({todos,children}) => {
  return (
    <div>
      <Droppable droppableId={'onlyoneList'}>
        { provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
          {todos.map((todo, index) => (
            <ListItem
            dragIndex={index}
            todo={todo}
            key={todo._id}
            _id={todo._id}
            parent_id={todo.parent_id}
            content={todo.content}
            title={todo.title}
            isDone={todo.isDone}
            />
          ))}
          {provided.placeholder}
        </div>
        )}
      </Droppable>
      {children}
    </div>
  );
}

export default ListBody;