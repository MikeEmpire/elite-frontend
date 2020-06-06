#!/bin/sh
git add .
git add -u
read -r -p 'Commit message: ' desc  # prompt user for commit message
branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
read -p "Do you wish to run git commit hooks? (y/n)? " answer
git commit -m "$desc"
git push origin $branch
