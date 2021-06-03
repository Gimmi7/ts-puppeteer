#! /usr/bin/sh

env=$1
[ -z $env ] && echo 'please input env argument: dev/test/prod' && exit 1

gitPath='git@github.com:Gimmi7/ts-init.git'
serverName='ts-puppeteer'
codePath='/data/code'


# acquire deployed pid; $()替换命令
pid=$(ps -ef | grep node | grep $serverName | awk '{print $2}')

# close deployed pid
if [ ! -n "$pid" ];then
  echo 'pid not exist'
else 
  kill -9 $pid
fi

# ensure codePath exists
if [ ! -d "$codePath" ];then
  mkdir -p $codePath && echo `create dir ${codePath}`
fi

# acquire latest code
serverPath=${codePath}/$serverName
if [ ! -d "$serverPath" ]; then
  cd $codePath
  echo 'code not exists, clone from git'
  git clone $gitPath $serverName
  cd $serverPath
else
  cd $serverPath
  git pull $gitPath
  echo 'pull latest code from git'
fi

# ensure tsc exists
type tsc
if [ "$?" != "0" ];then
  npm install -g --force typescript && echo 'intall typescript global'
fi


# install the dependencies
npm install

# compile code & run code
tsc && cd './dist/src'
node index.js $env $serverName &>/dev/null &
echo "success deploy ${serverName}"

