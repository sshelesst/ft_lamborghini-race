const { join } = require('path')
const { src, dest } = require('gulp')
const svg = require('gulp-svg-sprite')
const paths = require('./paths')
const bs = require('browser-sync')

function svg2sprite() {
  return src(paths.sprites.src)
    .pipe(
      svg({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      }),
    )
    .pipe(
      dest(paths.sprites.dest, {
        mode: function (f) {
          console.log(f.base)
          f.path = join(f.base, f.basename)
          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

module.exports = { svg2sprite }
