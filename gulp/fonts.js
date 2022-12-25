const { src, dest } = require('gulp')
const paths = require('./paths')
const bs = require('browser-sync')

function fonts2fonts() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest)).pipe(bs.stream())
}

module.exports = { fonts2fonts }
