# CD Q & A: https://stackoverflow.com/questions/29045140/env-bash-r-no-such-file-or-directory/53943650
sudo yarn

sudo yarn build --production

cd ./build

sudo yarn install --production

sudo pm2 stop server.js
sudo pm2 start server.js