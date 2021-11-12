git status

git add -A
git commit -m "publish"
git push -f git@github.com:ngwszsd/blog-github.git main

cd publish
git init 
git branch -M main
git add .
git commit -m 'publish status'
git push -f git@github.com:ngwszsd/ngwszsd.github.io.git main