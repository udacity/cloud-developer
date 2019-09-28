var gulp= require('gulp');
gulp.task('travis', ['build', 'testServerJS'] , function() {
process.exit(0);
});	
