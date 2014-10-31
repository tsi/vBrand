var requireDir = require('require-dir');
// Path Variables
var paths = {
  pages: ['src/*', 'src/**/*'],
  scss: ['sass/*', 'sass/partials/**/*']
};
// Require all tasks in gulp/tasks, including subfolders
requireDir('./tasks', { recurse: true });
