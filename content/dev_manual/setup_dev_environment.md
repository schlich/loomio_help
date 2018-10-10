---
title: Setup a Loomio development environment
weight: 20
---

There are 3 parts to this document: MacOS X system setup, Ubuntu system setup, and Application setup. You'll need to complete one of the system setups, and then the application setup after that.

## MacOS X system setup

First install [homebrew](http://brew.sh)

```
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You then need to install __Command Line Tools for XCode__ from https://developer.apple.com/downloads.

With that done, use Homebrew to install Git and PostgreSQL

```
$ brew install git postgresql pkgconfig
$ brew install ImageMagick --with-perl
$ brew services start postgresql
```

And that's it. You can jump to 'Install rbenv and ruby-build'

## Ubuntu system setup

You will need PostgreSQL 9.4+ for the `jsonb` data type.

### Ubuntu 12.04, 14.04, 16.04

`postgresql-9.6` and `postgresql-contrib-9.6` is not in the repo, [ask ubuntu](https://askubuntu.com/questions/831292/how-do-i-install-postgresql-9-6-on-any-ubuntu-version) has the commands for adding the ppa and installing version 9.6.

If you do not have wget installed, install it using `sudo apt-get install wget`.

### All Ubuntu

```
$ sudo apt-get update
$ sudo apt-get install git-core postgresql-9.6 postgresql-contrib-9.6 build-essential \
                       libssl-dev libpq-dev libffi-dev libmagickwand-dev \
                       libreadline-gplv2-dev imagemagick wget libsqlite3-dev autoconf
```

## Install Ruby with rbenv

From here onwards the instructions apply to both OSX and Linux.

### Install rbenv and ruby-build

I recommend that you don't use managed (Homebrew, APT etc) versions of ruby, rbenv and ruby-build. They're no easier to use, and they tend to be out of date just when you need the latest version.

First we install [rbenv](https://github.com/sstephenson/rbenv#installation).

Test if rbenv is installed correctly:
```
$ type rbenv
```

You should see:
```
#=> "rbenv is a function"
```

Now install [ruby-build](https://github.com/sstephenson/ruby-build#readme) using the rbenv plugin instructions.

When a new version of ruby is released, you can update ruby-build with
```
$ cd ~/.rbenv/plugins/ruby-build
$ git pull
```

### Build and Install Ruby and dependencies

At the time of writing 2.3.5 is the latest version. Check the required version in ```.ruby-version``` at the root of this repository and use it in the commands below:
Note that installing ruby may take a long time.

```
$ rbenv install 2.3.5
$ rbenv global 2.3.5
$ gem install bundler
```

## Install Node.js

You'll need Node.js and it's best if you use `nvm` to install it. From [https://github.com/creationix/nvm](https://github.com/creationix/nvm) You'll find that you need to run:

### MacOS X:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

### Ubuntu:

```
wget -O - https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
```

## Clone the Loomio repo from github

```
git clone git@github.com:loomio/loomio.git && cd loomio
```

## Install the required node version
Check the node version required by ensuring your node version matches with the version specified in the `engines` field of `client/package.json`
```
$ grep client/package.json -e 'engines' -A 3
```

We will now build and install that node version (at the time of writing 8.4.0):

```
$ nvm install 8.4.0
$ nvm alias default 8.4.0
```

### Install two packages required for this project

```
$ npm install -g yarn gulp
```

## Create database user

### On OSX
If you're on OSX then you can run the following bootstrap task to setup your system with postgresql, npm, bundler and gulp. It will then create an admin user. If you need help installing ruby, or more detail on installing the dependencies, please read [Setup Environment](setup_environment.md)

If you are setting up with PostgreSQL for the first time, you would have to create a superuser.

```
[sudo] su postgres -c 'createuser -P --superuser <username>'
```
### On Linux
If running Linux, you'll use:
```
$ sudo -u postgres psql postgres
postgres=# CREATE USER <youruseraccount> WITH SUPERUSER;
\q
$ logout
```
## Install loomio specific dependencies

### Setup transfer encryption with Bundler
```bundle config github.https true```

### Install dependencies

```
bundle install
cd client
yarn
```

## Run the bootstrap task
```
rake bootstrap
```

_NB: Take note of the email and password generated at the end of this task; you'll need it to log in once setup is complete_

## Build the frontend client
```
gulp compile
```
## Launch the server
```
gulp dev
```
And then in a new terminal instance
```
rails s
```

If you do not run ```gulp dev``` your browser will connect to (and apparently load) the page served by rails, but the page itself will be blank.
If you feel like your changes to the application aren't being picked up, try restarting this process.

The rails server may tell you that it's listening on 0.0.0.0:[port], but attempting to log in at that page will result in 403 Forbidden and a redirect. Use localhost:[port] instead.

### Other things to know
- There are several other gulp commands you can run to make your development go. These can be run from the `angular` folder.
  - `gulp nightwatch`: Run the automated frontend tests
  - `PRIVATE_PUB_SECRET_TOKEN=abc123 bundle exec rackup private_pub.ru -E production` is how to start faye (live updating) in development
  - `npm rebuild node-sass` has been known to be very useful
  - if you ever get into problems, then `rm -rf node_modules && yarn`

### Having trouble?

- Make sure ruby (2.3.5), node (7.4.0), postgres (9.4+), and [ImageMagick](http://stackoverflow.com/questions/3704919/installing-rmagick-on-ubuntu) are installed
- Let us know in the [product development](https://www.loomio.org/g/GN7EFQTK/loomio-community-product-development) group on Loomio.
