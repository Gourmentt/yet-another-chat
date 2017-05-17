module.exports = function(grunt) {
	grunt.config.set('jst', {
		dev: {
			files: {
				'frontend/jst.js': [
					'frontend/templates/**/*.html'
				]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jst');
};