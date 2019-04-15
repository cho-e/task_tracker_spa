defmodule TaskTrackerSpa.Repo do
  use Ecto.Repo,
    otp_app: :task_tracker_spa,
    adapter: Ecto.Adapters.Postgres
end
