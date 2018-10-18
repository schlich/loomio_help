# Loomio Help Documentation

This is a [Hugo](https://gohugo.io) project.

## Setup

Install Hugo (on MacOS):

```
brew install hugo
```

Fetch this repo

```
git clone git@github.com:loomio/loomio_help.git
```

Fetch the theme repo

```
cd themes/
git clone git@github.com:loomio/loomio-hugo-theme.git
```

## Development

Run hugo
```
hugo serve --disableFastRender
```

And open [http://localhost:1313/](http://localhost:1313) and edit some content. It will live reload.

## Publish

For Loomio devs, You'll need your public ssh key added to docs.loomio.org, then

```
./publish.sh
```
