# Loomio Help Documentation

This is a [Hugo](https://gohugo.io) project.

It uses Hugo's [asset pipeline](https://gohugo.io/hugo-pipes/) to build the stylesheet and [webpack](https://webpack.js.org/guides/) to build the javascript.

## Setup

install Hugo (on MacOS):

```
brew install hugo
```

fetch the node modules (from project root)
```
cd themes/material
yarn
```

## Development

Run hugo
```
hugo serve --disableFastRender
```

and run webpack
```
cd themes/material
npx webpack
```

And open [http://localhost:1313/](http://localhost:1313)

## Publish

You'll need your public ssh key added to docs.loomio.org, then

```
./publish.sh
```


To run webpack



To build the project during dev
