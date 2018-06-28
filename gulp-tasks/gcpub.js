var gulp = require('gulp');
var gcPub = require('gulp-gcloud-publish');
var gzip = require('gulp-gzip'); // optional 
 
gulp.task('publish', function() {
 
  return gulp.src('build')
      .pipe(gzip()) // optional 
      .pipe(gcPub({
        bucket: 'www.someawesomesite.com',
        keyFilename: 'path/to/keyFile.json',
        projectId: 'reactCrypto',
        base: '/',
        public: true
      })); // => File will be uploaded to /www.someawesomesite.com/
});

gulp.task('build', function() {
  gulp.src('scripts/*.js')
      .pipe(build({ GA_ID: '123456' }))
      .pipe(gulp.dest('dist'))
});