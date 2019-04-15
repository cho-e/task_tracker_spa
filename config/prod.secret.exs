use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :task_tracker_spa, TaskTrackerSpaWeb.Endpoint,
  secret_key_base: "hOs9JCh81sMEvwvMneo7OaYLf5JCe+J4LGVhDxl+vpshcgVZDBiQQs+sk+1qletr"

# Configure your database
config :task_tracker_spa, TaskTrackerSpa.Repo,
  username: "postgres",
  password: "241025",
  database: "task_tracker_spa_prod",
  pool_size: 15
