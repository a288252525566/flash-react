import * as actionTypes from 'actionTypes/ui';

export const showEditor = () => dispatch => {
  dispatch({type:actionTypes.SHOW_EDITOR});
}

export const hideEditor = () => dispatch => {
  dispatch({type:actionTypes.HIDE_EDITOR});
}

export const setEditorData = data => dispatch => {
  dispatch({type:actionTypes.SET_EDITOR_DATA,data});
}