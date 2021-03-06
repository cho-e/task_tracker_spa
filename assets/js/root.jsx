
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';
import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';
import NewTask from './new_task';
import EditTask from './edit_task';

export default function root_init(node, store) {
  let tasks = window.tasks;
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={tasks} />
    </Provider>, node);
}



class Root extends React.Component {
  constructor(props) {
    super(props);

    api.fetch_users();
    api.fetch_tasks();
  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
              <Route path="/tasks" exact={true} render={() =>
                  <TaskList />
              } />
              <Route path="/tasks/new" exact={true} render={() =>
                  <NewTask />
              } />
              <Route path="/tasks/edit/:id" exact={true} render={(props) =>
                  <EditTask id={props.match.params.id}/>
              } />

            </div>
            <div className="col-4">
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
