# CD Q & A: https://stackoverflow.com/questions/29045140/env-bash-r-no-such-file-or-directory/53943650

yarn build --production
cd ./build
yarn install --production
pm2 restart server.js