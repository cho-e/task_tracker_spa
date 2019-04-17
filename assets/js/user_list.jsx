import { Link } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';


function UserList(props) {

  let rows = _.map(props.users, (uu) =>
    <tr key={uu.id}>
      <td>{uu.id}</td>
      <td>{uu.email}</td>
    </tr>
  );

  return <div>
    <div className="row">
      <div className="col-12">
      <h1>Users</h1>
      { props.current_user ? <Link to={"/users/new"} className="btn btn-primary">New User</Link> : false }
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
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
    current_user: state.session ? _.find(state.users, (u) => u.id == state.session.user_id) : null,
    token: state.session ? state.session.token : null,
    users: state.users
  };
})(UserList);
