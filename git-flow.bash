## List out directory tree
tree -I 'node_modules|dist|.git'

## On start
# Switch to main
git checkout main

# Pull any changes that landed since you last worked
git pull origin main

# Create new branch from main
# -b new branch
# Branching naming convention
# feature/   ← new functionality
# fix/       ← fixing a bug
# chore/     ← config, tooling, non-code changes
# docs/      ← documentation only
git checkout -b feature/server-foundation

## Working
# See what's changed
git status

# Stage everything
git add .
# alternatively stage specific files
git add src/app.ts src/server.ts

# Commit with message
git commit -m "Add Express app setup with middleware stack"

## Pushing
# -u flag to link local branch to remote
git push -u origin feature/server-foundation

# After all pushes like this
git push

## After merge
# Switch back to main
git checkout main

# Pull the merge commit that just landed
git pull origin main

# Delete local branch
git branch -d feature/server-foundation

# -----------------
## Accidentally on main
# Stash your changes
git stash

# Create the proper branch
git checkout -b feature/whatever

# Apply your stashed changes onto the new branch
git stash pop

## See all branches
# Local branches
git branch

# Remote branches
git branch -r

# All branches
git branch -a

## See commit history
# Clean one-line view
git log --oneline

# With branch graph
git log --oneline --graph --all

## On CI fail --> Fix everything
git add .
git commit -m "Fix lint error in app.ts"
git push

## Delete stale remote tracking references
git fetch --prune