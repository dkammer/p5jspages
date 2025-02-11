# p5js Sample Project for Github Pages

Deploy a p5js app to Github Pages using Jekyll.

## Technologies

### p5js

Find your information on the [official web site](https://p5js.org/) of the project.

### Jekyll

[Jekyll](https://jekyllrb.com/) is based on Ruby and is used by Github for deploying Github pages.

### Github Pages

If used on Github, you can setup your repository with [Github pages](https://pages.github.com/) to automatically deploy your p5js app online. 

## Development

Fork this repository and modify the p5js sketch in `assets/js/sketch.js`. Be sure to include `baseurl` when addressing images and other assets, in case your Github pages project is not in the root.

```javascript
let image = loadImage(baseurl + '/assets/img/myimage.png');
```

Each time you push to your Github repository, the site will be updated automatically if you setup [Github pages](https://pages.github.com/) accordingly. 

Recommended for local Ruby development:

```shell
bundle config set --local path 'vendor/bundle'
bundle install --path vendor/bundle
bundle exec jekyll serve
```
