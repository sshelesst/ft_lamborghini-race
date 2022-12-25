const { src, dest } = require('gulp')
const pug = require('gulp-pug')
const gulpif = require('gulp-if')
const replace = require('gulp-replace')
const bs = require('browser-sync')

const MODE = process.env.NODE_ENV
const argv = process.argv.slice(2)

function pug2html() {
  let source
  argv[1]
    ? (source = `src/pages/${argv[1]}/*.pug`)
    : (source = 'src/pages/**/*.pug')

  return src(source)
    .pipe(pug())
    .pipe(gulpif(MODE === 'PRODUCTION', replace('.css', '.min.css')))
    .pipe(gulpif(MODE === 'PRODUCTION', replace('.js', '.min.js')))
    .pipe(
      dest('build', {
        mode: function (f) {
          f.dirname = f.dirname.replace(f.stem, '')
          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

module.exports = { pug2html }
