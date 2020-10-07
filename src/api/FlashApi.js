class FlashApi{
  //新增卡片
  static async addCard(data) {
    let result = null;
    let error = null;
    await fetch(
      process.env.REACT_APP_API_HOST+"card/add",
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
  static async getCardList(parent_id) {
    let result = null;
    let error = null;
    const data = {parent_id:parent_id};
    await fetch(
      process.env.REACT_APP_API_HOST+"card/list",
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
  static async updateCard(_id,data) {
    let result = null;
    let error = null;
    data._id=_id;
    await fetch(
      process.env.REACT_APP_API_HOST+"card/update",
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
  static async removeCard(_id) {
    let result = null;
    let error = null;
    await fetch(
      process.env.REACT_APP_API_HOST+"card/remove",
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
}

export default FlashApi