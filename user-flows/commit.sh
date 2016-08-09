if [[ $(git rev-parse --abbrev-ref HEAD) = 'master' ]]
then
  git add user-flows/visuals
  git commit -m "[CI] Updating UI test snapshots with latest"
  git push origin master
fi
