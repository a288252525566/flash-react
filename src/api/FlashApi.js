class FlashApi{
  //新增卡片
  static async addTodo(data) {
    let result = null;
    let error = null;
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/add",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }

  //取得卡片列表
  static async getTodoList(parent_id) {
    let result = null;
    let error = null;
    const data = {parent_id:parent_id};
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/list",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }

  //取得路徑上的所有卡
  static async getPath(_id) {
    let result = null;
    let error = null;
    const data = {_id:_id};
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/path",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }

  
  //修改卡片
  static async updateTodo(_id,data) {
    let result = null;
    let error = null;
    data._id=_id;
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/update",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify(data)
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }

  //刪除卡片
  static async removeTodo(_id) {
    let result = null;
    let error = null;
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/remove",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify({_id:_id})
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }
  
  //從刪除節點底下已經完成的卡片
  static async removeCompletedTodo(nodeId) {
    let result = null;
    let error = null;
    await fetch(
      process.env.REACT_APP_API_HOST+"todo/removecompleted",
      {
        method:'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body:JSON.stringify({_id:(nodeId?nodeId:null)})
      }
    )
      .then(res => res.json())
      .then(
        (res) => {
          result = res;
        },
        (err) => {
          error = err;
        });
    return {result,error};
  }
  
}

export default FlashApi