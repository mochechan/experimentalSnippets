#!/bin/bash

echo installing golang for ubuntu16.04.

function ec {
    errorlevel=$?
    echo errorlevel: $errorlevel 
    if [ "$errorlevel" -gt "0" ]; then 
        echo Install: The current errorlevel code is invalid. Please check. 
        exit $errorlevel;
    else 
        echo Install: so far so good. 
    fi
}


while [ 1 -eq 1 ] 
do

	apt_check=$(ps aux | grep apt | wc -l) 
	if [ $apt_check -gt 1 ]; then
		sleep 1
	else
		break
	fi

done

cd ~

echo Installing golang
wget https://storage.googleapis.com/golang/go1.10.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.10.linux-amd64.tar.gz

sudo apt -y install golang-doc golang-go.tools

mkdir -pv ~/.go
tee -a ~/.bashrc <<EOF

export GOROOT=/usr/local/go
export GOPATH=$HOME/.go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

EOF

export GOROOT=/usr/local/go
export GOPATH=$HOME/.go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

# https://github.com/golang/tools
go get -u golang.org/x/tools/...

tee -a ~/.vimrc <<EOF
set number
set tabstop=2 
EOF

sudo dpkg --configure -a 
ec 
sudo apt-get -y update 
ec 
sudo apt-get -y dist-upgrade 
ec 
echo "Defaults timestamp_timeout=999" | sudo tee -a /etc/sudoers.d/timeout
ec 

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
ec 
sudo apt install -y nodejs
ec 

sudo apt -y install software-properties-common ssh vim htop git socat expect build-essential meld screen git mercurial unzip zip make 
ec 
git config --global user.email "chan@alumni.ncu.edu.tw"
git config --global user.name "Mo-Che Chan"
git config --global push.default simple
#git config --global core.autocrlf true 
git config --global core.editor vi
#git config --global core.eol lf
git config --global help.autocorrect 1
git config --global color.ui true
git config --global credential.helper cache
git config --global credential.helper "cache --timeout=99999999"
ec 


sync 

