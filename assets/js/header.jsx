
import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';

function Header(props) {
  let {session} = props;
  let session_info;
  let user = props.session ? _.find(props.users, (u) => u.id == props.session.user_id) : null;
  console.log("PROOOPS", props);
  if (session == null) {
    session_info = <LoginForm/>
  }
  else {
    console.log(session);
    session_info = <div className="my-2">
    Hello, {session.user_id}
    </div>
  }

  return <div className="row my-2">
    <div className="col-4">
      <h1>
        <Link to={"/"}>Task Tracker</Link>
      </h1>
    </div>
    <div className="col-2">
      <p>
        <Link to={"/users"} onClick={() => api.fetch_users()}>Users</Link>
      </p>
    </div>
    <div className="col-2">
      <Link to={"/tasks"} onClick={() => api.fetch_tasks()}>Tasks</Link>
    </div>
    <div className="col-3">
      {session_info}
    </div>

  </div>;
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  changeEmail(ev) {
    this.setState({email: ev.target.value})
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
        name: "Placeholder",
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
