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
	grunt.config.set('concat', {
		options: {
			separator: ';\n',
			stripBanners: true
		},
		jsFiles: {
			src: [
				'frontend/jst.js',
				'frontend/js/libs/underscore-min.js',
				'frontend/js/libs/jquery*',
				'frontend/js/libs/*.js',
				'frontend/js/app.js',
				'frontend/js/models/*.js',
				'frontend/js/collections/*.js',
				'frontend/js/views/*.js',
			],
			dest: 'frontend/minified/built.js',
		}
	});
	grunt.config.set('uglify', {
		jsFiles: {
			files: {
				'frontend/minified/all.min.js': ['frontend/minified/built.js']
			}
		}
	});
	grunt.config.set('cssmin', {
		target: {
			files: {
				'frontend/minified/all.min.css': ['frontend/css/*.min.css', 'frontend/css/*.css']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jst');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('buildProdAssets', ['jst', 'concat', 'uglify', 'cssmin']);
};