# Rec Ninja

[![Stories in Ready](https://badge.waffle.io/ivthefourth/project-1.svg?label=ready&title=Ready)](https://waffle.io/ivthefourth/project-1)


## Contents
* [About](#about)
* [Important Links](#important-links)
* [GitHub/Waffle Workflow](#github-and-waffle-workflow)
* [Dev Server](#dev-server)


## About

### Contributors:
* Elizabeth
* Jon Caviness
* Howard
* Trevor Nelson


## Important Links

### Project Info
* [Milestones](https://github.com/ivthefourth/project-1/milestones)
* [Waffle (Task Manager)](https://waffle.io/ivthefourth/project-1)
* [User Stories](https://docs.google.com/document/d/1YPNBCu6e3rBdH7EmJNTHmhsZOrDXebbFNvsH5ubqLFg/)
* [Project Proposal](https://docs.google.com/document/d/1MgKZKyFO4m7cpf0CrR8cDIUgZWh9oPvnBqRZu461Bfw/)

### Library Docs
* [Materialize Docs](http://materializecss.com/)
* [jQuery Docs](https://api.jquery.com/)
* [webpack](https://webpack.js.org/)

### API Docs
* [RIDB API Docs (recreation.gov)](https://usda.github.io/RIDB/)
	- API Key: 2C1B2AC69E1945DE815B69BBCC9C7B19
* [Google Places Autocomplete](https://developers.google.com/maps/documentation/javascript/places-autocomplete)
    - [Places](https://developers.google.com/maps/documentation/javascript/places)
* [Google Directions](https://developers.google.com/maps/documentation/javascript/directions)
* [Google Maps JS](https://developers.google.com/maps/documentation/javascript/)
    - [Polylines](https://developers.google.com/maps/documentation/javascript/examples/polyline-simple)
* [Google Distance Matrix](https://developers.google.com/maps/documentation/javascript/distancematrix)



## GitHub and Waffle Workflow

When Completing a new task:
1. Make sure you're on the master branch
    * `git checkout master`
2. Pull from GitHub so you're up to date
    * `git pull`
3. Look at items in the **Ready** column (not Backlog) on [Waffle](https://waffle.io/ivthefourth/project-1) and choose a task to work on that is either assigned to you or unassigned. If your choice is unassigned, assign yourself by clicking the user icon at the top right of the task and then selecting yourself
    * ![Example Task](docs/example-task.png)
4. Create a branch, and name it starting with the number of the chosen task (top left) followed by a '-' and then a short description 
    * `git branch 31-howard-test`
5. Checkout this new branch and push it to GitHub; this will move the task to the **In Progress** column 
    * `git checkout 31-howard-test`
    * `git push --set-upstream origin 31-howard-test`
        * Note: `git push` will tell you to do the above command, so no need to remember
6. Do work, yo; commit and push to GitHub as desired
7. When you've completed the task, commit and push the latest changes to GitHub
    * `git commit -m "description"` 
    * `git push`
8. Once branch is up to date on GitHub, submit a [pull request on GitHub](https://github.com/ivthefourth/project-1/branches) from your branch, and use the phrase "Closes #n" in the title; this will move the task into the **Under Review** column
    > Closes #31 added howard to contributors
9. You can start working on another task (return to step 1) until code is reviewed
10. If a review shows that changes need to be made before the branch can merge, make those changes on the appropriate branch (31-howard-test in this case), then commit and push again. You don't have to open another pull request. You can click the pull request icon on a task (bottom left) in the **Under Review** column on Waffle to view the pull request in GitHub.
11. Once you've seen that your branch has been merged (task will move to **Done** column), you can delete the local branch if you want. 
    * `git branch -d 31-howard-test`

[Read more about Waffle workflow.](https://help.waffle.io/automatic-work-tracking/auto-work-tracking-basics/recommended-workflow-using-pull-requests-automatic-work-tracking)

## Dev Server
* **Start the server** by opening a new terminal window and entering `npm start`. 
* Server will be on http://localhost:8080/ with auto-refresh enabled.
* **Stop the server** by pressing `ctrl` + `C` on the terminal window that is running the server.

