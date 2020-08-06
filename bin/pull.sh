#!/bin/sh

read -r -p 'Branch to pull from: ' pulledBranch  # prompt user for commit message

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

git pull origin $pulledBranch
git push origin $branch
