const { join, basename, resolve } = require('path')
const { promises } = require('fs')
const { src, dest } = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const bs = require('browser-sync')

const MODE = process.env.NODE_ENV.toLowerCase()
const argv = process.argv.slice(2)

async function getFiles(dir) {
  const dirents = await promises.readdir(dir, { withFileTypes: true })

  const files = await Promise.all(
    dirents.map(d => {
      const p = resolve(dir, d.name)
      return d.isDirectory() ? getFiles(p) : p
    }),
  )

  return files.flat().filter(item => /.+\.js/.test(item))
}

async function js2js() {
  let source
  let entries = {}

  if (argv[1]) {
    source = `src/pages/${argv[1]}/${argv[1]}.js`
    entries = { [argv[1]]: `./src/pages/${argv[1]}/${argv[1]}.js` }
  } else {
    source = 'src/pages/**/*.js'
    const files = await getFiles(join(__dirname, '..', 'src', 'pages'))
    for (const file of files) {
      const key = basename(file, '.js')
      entries[key] = file
    }
  }

  return src(source)
    .pipe(
      webpackStream({
        entry: entries,
        output: {
          filename: MODE === 'production' ? '[name].min.js' : '[name].js',
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: { loader: 'babel-loader' },
            },
          ],
        },
        mode: MODE,
        devtool: MODE === 'production' ? false : 'source-map',
      }),
      webpack,
    )
    .pipe(
      dest('build/scripts', {
        mode: function (f) {
          return f.path
        },
      }),
    )
    .pipe(bs.stream())
}

module.exports = { js2js }
