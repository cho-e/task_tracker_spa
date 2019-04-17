
import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Provider } from 'react-redux';

import api from './api';
import Header from './header';
import UserList from './user_list';

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
    api.fetch_session();
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
            </div>
            <div className="col-4">

            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
