import * as actionTypes from 'actionTypes/ui';

const initialState = {
  isEditorDisplay:false,
  editorData:{}
}
const ui = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SHOW_EDITOR:
      return {...state,isEditorDisplay:true};
    case actionTypes.HIDE_EDITOR:
      return {...state,isEditorDisplay:false};
    case actionTypes.SET_EDITOR_DATA:
      return {...state,editorData:action.data};
    default:
      return state;
  }
}

export default ui;