const { parallel, watch } = require('gulp')
const { pug2html } = require('./views')
const { scss2css } = require('./styles')
const { js2js } = require('./scripts')
const { svg2sprite } = require('./sprites')
const { img2img, fav2fav } = require('./images')
const { fonts2fonts } = require('./fonts')
const browsersync = require('browser-sync')
const paths = require('./paths')

const argv = process.argv.slice(2)

function sync() {
  browsersync.init({
    server: './build/',
    startPath: `${argv[1] || 'index'}.html`,
    port: 4000,
    notify: true,
  })

  watch(paths.views.watch, parallel(pug2html))
  watch(paths.styles.watch, parallel(scss2css))
  watch(paths.scripts.watch, parallel(js2js))
  watch(paths.sprites.watch, parallel(svg2sprite))
  watch(paths.images.watch, parallel(img2img))
  watch(paths.favicons.watch, parallel(fav2fav))
  watch(paths.fonts.watch, parallel(fonts2fonts))
}

module.exports = { sync }
