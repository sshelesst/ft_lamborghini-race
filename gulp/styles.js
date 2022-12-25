const { src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sourceMaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const gulpif = require('gulp-if')
const cleanCss = require('gulp-clean-css')
const replace = require('gulp-replace')
const bs = require('browser-sync')

const MODE = process.env.NODE_ENV
const argv = process.argv.slice(2)

function scss2css() {
  let source
  argv[1]
    ? (source = `src/pages/${argv[1]}/*.scss`)
    : (source = 'src/pages/**/*.scss')

  return src(source)
    .pipe(gulpif(MODE === 'DEVELOPMENT', sourceMaps.init()))
    .pipe(
      gulpif(
        MODE === 'DEVELOPMENT',
        sass().on('error', sass.logError),
        sass({ outputStyle: 'compressed' }).on('error', sass.logError),
      ),
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      gulpif(
        MODE === 'PRODUCTION',
        cleanCss({
          compatibility: 'ie8',
          level: {
            1: {
              specialComments: 0,
              removeEmpty: true,
              removeWhitespace: true,
            },
            2: {
              mergeMedia: true,
              removeEmpty: true,
              removeDuplicateFontRules: true,
              removeDuplicateMediaBlocks: true,
              removeDuplicateRules: true,
              removeUnusedAtRules: false,
            },
          },
        }),
      ),
    )
    .pipe(gulpif(MODE === 'DEVELOPMENT', sourceMaps.write()))
    .pipe(
      dest('build/styles', {
        mode: function (f) {
          f.dirname = f.dirname.replace(f.stem, '')
          if (MODE === 'PRODUCTION') f.extname = '.min.css'

          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

module.exports = { scss2css }
