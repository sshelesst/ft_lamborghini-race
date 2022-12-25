const { src, dest } = require('gulp')
const { join, extname } = require('path')
const gulpif = require('gulp-if')
const newer = require('gulp-newer')
const paths = require('./paths')
const bs = require('browser-sync')

const MODE = process.env.NODE_ENV

async function img2img() {
  const imagemin = await import('gulp-imagemin')
  return src(paths.images.src)
    .pipe(newer('build/images'))
    .pipe(
      gulpif(
        MODE === 'PRODUCTION',
        imagemin.default([
          imagemin.gifsicle({ interlaced: true }),
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { removeUnusedNS: false },
              { removeUselessStrokeAndFill: false },
              { cleanupIDs: false },
              { removeComments: true },
              { removeEmptyAttrs: true },
              { removeEmptyText: true },
              { collapseGroups: true },
            ],
          }),
        ]),
      ),
    )
    .pipe(
      dest(paths.images.dest, {
        mode: function (f) {
          f.path = join(f.base, f.basename)

          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

async function fav2fav() {
  const imagemin = await import('gulp-imagemin')

  return src(paths.favicons.src)
    .pipe(
      dest(paths.favicons.dest, {
        mode: function (f) {
          if (f.extname !== '.ico')
            f.path = join(f.base, 'images', 'favicons', f.basename)

          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

module.exports = { img2img, fav2fav }
