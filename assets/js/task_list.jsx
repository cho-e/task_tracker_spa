import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import api from './api';

function TaskList(props) {

  function deleteTask(event, id) {
    api.delete_task(id);
    $(event.target).parent().parent().hide();
  }

  function editTask(event, id) {
    api.edit_task(id);
  }

  let rows = _.map(props.tasks, (task) =>
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>{task.description}</td>
      <td>{task.user_id}</td>
      <td>{task.completed ? "Yes" : "No"}</td>
      <td>{task.duration}</td>

      {props.current_user ?
        <td>
          <button className="btn btn-danger" onClick={(ev) => deleteTask(ev, task.id)}>Delete</button>
          { props.current_user ? <Link to={"/tasks/edit/" + task.id} className="btn btn-primary">Edit Task</Link> : false }
        </td>
      : null}

    </tr>
  );
  return <div>
    <div className="row">
      <div className="col-12">
      <h1>Tasks</h1>
      { props.current_user ? <Link to={"/tasks/new"} className="btn btn-primary">New Task</Link> : false }
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned to</th>
              <th>Completed</th>
              <th>Time spent</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div>
  </div>;
}

export default connect((state) => {
  return {
    token: state.session ? state.session.token : null,
    current_user: state.session ? _.find(state.users, (u) => u.id == state.session.user_id) : null,
    tasks: state.tasks
  };
})(TaskList);
