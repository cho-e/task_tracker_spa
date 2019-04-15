import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import api from './api';

function Task(props) {
    let {task} = props;

    function deleteTask(ev) {
        api.delete_task(task.id);
        $(ev.target).parent().parent().parent().hide();
    }

    function editTask() {
        api.edit_task(task.id)
    }

    return <div className="card col-3">
                <div className="card-body">
                    <div className="card-text">
                        <h4 className="card-title task-border">
                            <span className="task-bold">Task ID: </span>
                            {task.id}
                        </h4>
                        <p>
                            <span className="task-bold">Title: </span>
                            {task.title}
                        </p>
                        <p>
                            <span className="task-bold">Description: </span>
                            {task.desc}
                        </p>
                        <p>
                            <span className="task-bold">Time: </span>
                            {task.time}
                        </p>
                        <p>
                            <span className="task-bold">Completed: </span>
                            {task.completed.toString()}
                        </p>
                        <p>
                            <span className="task-bold">Assigned to: </span>
                            {task.user_id}
                        </p>
                    </div>
                    <p className="form-inline">
                        <Link to={"tasks/edit/" + task.id} className="btn btn-primary" onClick={() => editTask()}>Edit</Link>
                        <button className="btn btn-danger" onClick={(ev) => deleteTask(ev)}>Delete</button>
                    </p>
                </div>
            </div>;
}

export default Task;
