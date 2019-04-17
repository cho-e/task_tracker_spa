import React from 'react';
import { connect } from 'react-redux';
import api from './api';
import _ from 'lodash';
import store from './store';
import { Link, withRouter } from 'react-router-dom';

function NewTask(props) {

  function updateValue(ev) {
      let newValue = $(ev.target).val();
      let data;
      switch (ev.target.name) {
          case "title":
              data = {
                  title: newValue
              };
              break;
          case "description":
              data = {
                  description: newValue
              };
              break;
          case "duration":
              data = {
                  duration: newValue
              };
              break;
          case "completed":
              data = {
                  completed: newValue
              };
              break;
          case "user_id":
              data = {
                  user_id: newValue
              };
              break;
      }
      props.dispatch({
          type: 'UPDATE_NEW_TASK_FORM',
          data: data
      });

    }

    function createNewTask(event) {
        event.preventDefault();
        if (props.form.duration >= 0 && props.form.duration % 15 == 0) {
          let data = {
            task: {
              title: props.form.title,
              description: props.form.description,
              duration: props.form.duration,
              user_id: props.form.user_id ? props.form.user_id : props.users[0].id,
              completed: props.form.completed
            }
          };
          api.send_post("/api/v1/tasks", data,
              (resp) => {
                  store.dispatch({
                      type: "CLEAR_TASK_FORM",
                      data: null,
                  });
              },
              (resp) => {
                  alert("Unable to create task.");
              })
        }
        else {
            alert("Duration must be a multiple of 15.");
        }
    }
    function getUserOptions() {

      let allUsers = [];
      for (let i = 0; i < props.users.length; i++) {
          allUsers.push(props.users[i]);
      }

      let userOptions = _.map(allUsers, (user) => <option key={user.id} value={user.id}>{user.id} ({user.email})</option>);
      return [ userOptions];
    }
      let userOptions = <select name="user_id" value={getUserOptions()} onChange={() => updateValue(event)}>{getUserOptions()}</select>

      return <div>
        <form>
            <div>
                <span>Title:</span>
                <input type="text" name="title" value={props.form.title} onChange={() => updateValue(event)} />
            </div>
            <div>
                <span>Description:</span>
                <input type="text" name="description" value={props.form.description} onChange={() => updateValue(event)} />
            </div>
            <div>
                <span>Duration:</span>
                <input type="number" name="duration" min="0" step="15" value={props.form.duration} onChange={() => updateValue(event)} />
            </div>
            <div>
                <span>Completed?:</span>
                <input type="checkbox" name="completed" value={props.form.completed} onChange={() => updateValue(event)} />
            </div>
            <div>
                <span>Assigned To:</span>
                {userOptions}
            </div>
            <button className="btn btn-primary" onClick={() => createNewTask(event)}>Create</button>
        </form>
    </div>;
}

function state2props(state) {
  console.log("STATE", state);
    return {
        form: state.form,
        users: state.users,
    };
}

export default connect(state2props)(NewTask);
