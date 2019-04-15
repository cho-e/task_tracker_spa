
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function Header(props) {
  let {session} = props;
  let session_info;
  let user = props.session ? _.find(props.users, (u) => u.id == props.session.user_id) : null;

  function userInfo() {
    return
    <p className="my-3">
      Logged in as {user.name} | <a className="text-primary" onClick={() => api.delete_session()}>Logout</a>
    </p>;
  }

  if (session == null) {
    session_info = <div className="form-inline my-2">
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button className="btn btn-secondary">Login</button>
    </div>;
  }
  else {
    session_info = <div className="my-2">
      <p>Logged in as {session.user_id}</p>
    </div>
  }

  return <div className="row my-2">
    <div className="col-3">
      <h1>
        <Link to={"/"}>Task Tracker</Link>
      </h1>
    </div>
    <div className="col-3">
      <p>
        <Link to={"/users"}>Users</Link>
      </p>
    </div>
    <div className="col-3">
      <Link to={"/tasks"} onClick={() => api.fetch_tasks()}>Tasks</Link>
    </div>
    <div className="col-3">
      { user ? userInfo() : <LoginForm /> }
    </div>

  </div>;
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    }
  }

  changeEmail(ev) {
    this.setState({email: ev.target.value})
  }

  changeName(ev) {
    this.setState({name: ev.target.value})
  }

  changePassword(ev) {
    this.setState({password: ev.target.value})
  }

  login(event) {
    api.create_session(this.state.email, this.state.password);
    event.preventDefault();
  }

  register(event) {
    // api.register_user(props.login.name, props.login.email, props.login.password);
    let newUser = {
      user: {
        name: this.state.name,
        email: this.state.email,
        password_hash: this.state.password
      }
    };

    api.send_post("/api/v1/users", newUser,
    (data) => {
        window.location.reload();
    },
    (data) => {
        alert("Error creating account :( Try again.")
    });
    event.preventDefault();
  }


  render() {
    return <form className="form-inline login-register mt-4">
      <input required type="text" name="name" placeholder="Name" className="form-control mr-2" value={this.state.name} onChange={() => this.changeName(event)}/>
      <input required type="email" name="email" placeholder="Email" className="form-control mr-2" value={this.state.email} onChange={() => this.changeEmail(event)}/>
      <input required type="password" name="password" placeholder="Password" className="form-control" value={this.state.password} onChange={() => this.changePassword(event)}/>
      <button className="btn btn-primary" onClick={() => this.login(event)}>Login</button>
      <button className="btn btn-secondary" onClick={() => this.register(event)}>Register</button>
    </form>;
  }
}

function state2props(state) {
  return { session: state.session };
}

export default connect(state2props)(Header);
