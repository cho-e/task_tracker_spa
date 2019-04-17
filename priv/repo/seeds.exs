# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TaskTrackerSpa.Repo
alias TaskTrackerSpa.Users.User

Repo.insert!(%User{name: "yo", email: "liz@example.com", password_hash: "password"})
Repo.insert!(%User{name: "plz", email: "nat@example.com", password_hash: "password"})

alias TaskTrackerSpa.Tasks.Task

Repo.insert!(%Task{title: "test1", description: "test1", duration: 0, completed: false, user_id: 1})
Repo.insert!(%Task{title: "test2", description: "test2", duration: 30, completed: true, user_id: 1})
