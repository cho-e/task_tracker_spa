import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function tasks(state = [], action) {
    switch (action.type) {
        case 'GET_TASK_LIST':
            return action.data;
        case 'NEW_TASK':
            return state.concat(action.task);
        default:
            return state;
    }
}

function users(state = [], action) {
    switch (action.type) {
    case 'GET_USER_LIST':
        return action.data;
    default:
        return state;
    }
}

let default_form_state = {
    user_id: "",
    title: "",
    description: "",
    duration: 0,
    completed: false
}

let default_session_state = {
    token: "",
    email: "",
    user_id: ""
}

function session(state = null, action) {
  switch (action.type) {
    case 'NEW_SESSION':
      return action.data;
    case 'DELETE_SESSION':
      return action.data;
    default:
      return state;
  }
}

let default_user_state = {
    email: "",
    password: ""
}

function login(state = default_user_state, action) {
    switch(action.type) {
        case 'UPDATE_LOGIN_CREDENTIALS':
            return Object.assign({}, state, action.data);
        case 'CLEAR_LOGIN_CREDENTIALS':
            return default_user_state;
        default:
            return state;
    }
}

function form(state = default_form_state, action) {
    switch (action.type) {
        case 'UPDATE_NEW_TASK_FORM':
            return Object.assign({}, state, action.data);
        case 'CLEAR_TASK_FORM':
            return default_form_state;
        default:
            return state;
    }
}

function edit_task_form(state = default_form_state, action) {
    switch (action.type) {
      case 'UPDATE_EDIT_FORM':
        return Object.assign({}, state, action.data);
      case 'EDIT_TASK':
        return Object.assign({}, state, action.task);
      default:
        return state;
    }
}


function root_reducer(state0, action) {
    console.log("reducer", state0, action);
    let reducer = combineReducers({tasks, users, form, session, edit_task_form, login});
    let state1 = reducer(state0, action);
    console.log("reducer1", state1);
    return deepFreeze(state1);
}

let store = createStore(root_reducer);

export default store;
