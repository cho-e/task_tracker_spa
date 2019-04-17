import React from 'react';
import { connect } from 'react-redux';
import api from './api';
import _ from 'lodash';

function EditTask(props) {
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
          type: 'UPDATE_EDIT_FORM',
          data: data
      });
    }

    function editTask(event) {
      event.preventDefault();
      if(props.edit_task_form.duration >= 0 && props.edit_task_form.duration % 15 == 0) {
        let editedTask = {
          task: {
              title: props.edit_task_form.title,
              description: props.edit_task_form.description,
              duration: props.edit_task_form.duration,
              completed: props.edit_task_form.completed,
              user_id: props.edit_task_form.user_id ? props.edit_task_form.user_id : props.users[0].id
          }
        };
        $.ajax("/api/v1/tasks/" + props.id, {
            method: "DELETE",
            error: (resp) => {
                alert("Error deleting task " + props.id);
            },
            success: () => {
              api.send_post("/api/v1/tasks", editedTask,
                  (resp) => {
                    alert("success!");
                  },
                  (resp) => {
                      alert("Unable to edit task.");
                  })
            }
        });

      }
      else {
          alert("Duration of task must be a multiple of 15.");
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
    console.log("propz",props);
    return <div>
                <form>
                    <div>
                        <span>Title:</span>
                        <input type="text" name="title" value={props.edit_task_form.title} onChange={() => updateValue(event)}/>
                    </div>
                    <div>
                        <span>Description:</span>
                        <input type="text" name="description" value={props.edit_task_form.desc} onChange={() => updateValue(event)}/>
                    </div>
                    <div>
                        <span>Time worked on:</span>
                        <input type="number" name="duration" min="0" step="15" value={props.edit_task_form.time} onChange={() => updateValue(event)}/>
                    </div>
                    <div>
                        <span>Completed?:</span>
                        <input type="checkbox" name="completed" checked={props.edit_task_form.completed} onChange={() => updateValue(event)}/>
                    </div>
                    <div>
                        <span>Assigned To:</span>
                        {userOptions}
                    </div>
                    <button className="btn btn-primary" onClick={() => editTask(event)}>Edit Task</button>
                </form>
            </div>;
}


function state2props(state) {
  console.log("STATE", state);
    return {
        edit_task_form: state.edit_task_form,
        users: state.users,
    };
}

export default connect(state2props)(EditTask);
