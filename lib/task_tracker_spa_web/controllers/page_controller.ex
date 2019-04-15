defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.Tasks
  def index(conn, _params) do
    tasks = Tasks.list_tasks()
    |> Enum.map(&(Map.take(&1, [:title, :description, :duration, :completed, :id])))
    render(conn, "index.html", tasks: tasks)
  end
end
