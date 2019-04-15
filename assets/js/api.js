import store from './store';

class TheServer {
  fetch_path(path, callback) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: callback,
    });
  }

  send_post(path, data, successCallback, errorCallback) {
      $.ajax(path, {
          method: "POST",
          dataType: "json",
          contentType: "application/json; charset=UTF-8",
          data: JSON.stringify(data),
          success: successCallback,
          error: errorCallback
      });
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }

  fetch_tasks() {
    this.fetch_path("/api/v1/tasks",
        (resp) => {
            store.dispatch({
                type: 'GET_TASK_LIST',
                data: resp.data,
            });
        }
    );
  }

  create_session(email, password) {
    this.send_post(
      "/api/v1/sessions",
      {email, password},
      {},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }

}

export default new TheServer();
