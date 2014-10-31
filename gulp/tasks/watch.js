// Rerun the file-include & sass compilation on file changes
var gulp = require('gulp');
var watch = require('gulp-watch');
// var lr = require('tiny-lr');
// var server = lr();
// var livereload = require('gulp-livereload')
// Path Variables
var paths = {
  scss: ['sass/*', 'sass/partials/**/*'],
  images: ['images/*'],
  scripts: ['scripts/modules/*']
};

gulp.task('watch', function() {
  // gulp.watch(paths.pages, ['fileinclude']);
  gulp.watch(paths.scss, ['compass','images']);
  // gulp.watch(paths.images, ['images']);
  // gulp.watch(paths.scripts, ['concat']);
});
