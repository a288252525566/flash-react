export const getNextTodo = (list) => {
  const result = list.find(item=>(!item.isDone));
  if(result) return result;
  return {};
}