const gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  rigger = require('gulp-rigger')

let build = 'build',
  source = 'src'

/* include Header.html Footer.html  */
gulp.task('fileinclude', function () {
  gulp
    .src([source + '/*.html'])
    .on('error', function (err) {
      this.emit('end')
    })
    .pipe(rigger())
    .pipe(gulp.dest('./build/'))
})

//css bundle here
gulp.task('bundleCss', () => {
  gulp
    .src([
      source + '/libs/components-bootstrap/css/bootstrap.min.css',
      source + '/libs/owl-carousel/owl.theme.default.min.css',
      source + '/libs/owl-carousel/owl.carousel.min.css',
      // plugin`s css
    ])
    .pipe(cleanCSS()) //minify
    .pipe(concat('plugins.min.css'))
    .pipe(gulp.dest(build + '/assets/css'))
})

//sass compiles here
gulp.task('sass', () => {
  gulp
    .src([
      source + '/assets/sass/imports.scss', // Always at the end
    ])

    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false,
      })
    )
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(build + '/assets/css'))
})

// scripts bundle starts
gulp.task('bundleScript', function () {
  return gulp
    .src([
      source + '/libs/jquery/jquery.min.js',
      source + '/libs/components-bootstrap/js/popper.min.js',
      source + '/libs/components-bootstrap/js/bootstrap.min.js',
      source + '/libs/owl-carousel/owl.carousel.min.js',
      // Plugin`s js here
    ])
    .pipe(uglify()) //minify
    .pipe(concat('plugins.min.js'))
    .pipe(gulp.dest(build + '/assets/js'))
})

// scripts copy starts
gulp.task('script', function () {
  return gulp
    .src([
      source + '/assets/js/script.js', // Always at the end
    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(build + '/assets/js'))
})

//icon min
gulp.task('icons', () =>
  gulp
    .src(source + '/assets/css-dep/icons/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest(build + '/assets/css/icons'))
)

//fonts copy
gulp.task('fonts', () =>
  gulp
    .src(source + '/assets/css-dep/fonts/**/*')
    .pipe(gulp.dest(build + '/assets/css/fonts'))
)

// img copy
gulp.task('imgs', () =>
  gulp.src(source + '/assets/img/**/*').pipe(gulp.dest(build + '/assets/img'))
)

//watch files
gulp.task('watch', function () {
  browserSync.init({
    server: './build',
  })

  gulp.watch(source + '/*.html', ['fileinclude'])
  gulp.watch(source + '/assets/**/*.scss', ['sass'])
  gulp.watch(source + '/assets/**/*.js', ['script'])
  gulp.watch(source + '/assets/img/**/*', ['imgs'])
  gulp.watch(source + '/assets/css-dep/icons/**/*', ['icons'])
  gulp.watch(source + '/assets/css-dep/fonts/**/*', ['fonts'])
  gulp.watch('build/**/*').on('change', browserSync.reload)
})

//gulp default test
gulp.task('default', [
  'fileinclude',
  'bundleCss',
  'bundleScript',
  'sass',
  'script',
  'imgs',
  'icons',
  'fonts',
  'watch',
])
