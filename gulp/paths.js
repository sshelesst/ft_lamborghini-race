const paths = {
  views: {
    watch: 'src/**/*.pug',
  },
  styles: {
    watch: 'src/**/*.scss',
  },
  scripts: {
    watch: 'src/pages/**/*.js',
  },
  images: {
    src: [
      'src/**/*.{jpg,jpeg,png,gif,svg}',
      '!src/assets/favicons/*.{png,svg,ico}',
      '!src/assets/sprites/*.svg',
    ],
    dest: 'build/images',
    watch: [
      'src/**/*.{jpg,jpeg,png,gif,svg}',
      '!src/assets/favicons/*.{png,svg,ico}',
      '!src/assets/sprites/*.svg',
    ],
  },
  sprites: {
    src: 'src/assets/sprites/*.svg',
    dest: 'build/images/sprites',
    watch: 'src/assets/sprites/*.svg',
  },
  favicons: {
    src: 'src/assets/favicons/*.{png,svg,ico}',
    dest: 'build/',
    watch: 'src/assets/favicons/*.{png,svg,ico}',
  },
  fonts: {
    src: 'src/assets/fonts/**/*.{woff,woff2}',
    dest: 'build/fonts',
    watch: 'src/assets/fonts/**/*.{woff,woff2}',
  },
}

module.exports = paths
