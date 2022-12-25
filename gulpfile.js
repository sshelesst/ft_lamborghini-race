const { src, dest, parallel, series, watch } = require('gulp')
const { scss2css } = require('./gulp/styles')
const { pug2html } = require('./gulp/views')
const { js2js } = require('./gulp/scripts')
const { img2img, fav2fav } = require('./gulp/images')
const { svg2sprite } = require('./gulp/sprites')
const { fonts2fonts } = require('./gulp/fonts')
const { clean } = require('./gulp/clean')
const { sync } = require('./gulp/sync')

// module.exports.build = series(clean, scss2css, pug2html, js2js, img2img)
module.exports.build = series(
  clean,
  parallel([
    scss2css,
    pug2html,
    js2js,
    img2img,
    fav2fav,
    svg2sprite,
    fonts2fonts,
  ]),
)
module.exports.default = series(
  clean,
  parallel([
    scss2css,
    pug2html,
    js2js,
    img2img,
    fav2fav,
    svg2sprite,
    fonts2fonts,
  ]),
  sync,
)
