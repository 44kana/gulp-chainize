'use strict';
/* jshint node:true */

module.exports = function(gulp, option, option2){
	function Chain(){
		this.stream = {};
	}

	Chain.prototype.src = function(glob){
		this.stream = gulp.src(glob);
		return this;
	};
	Chain.prototype.pipe = function(func){
		this.stream = this.stream.pipe(func);
		return this;
	};
	Chain.prototype.dest = function(dest){
		this.stream = this.stream.pipe(gulp.dest(dest));
		return this;
	};

	[option, option2].filter(function(option){
		return option !== undefined;
	}).forEach(function(option){
		Object.getOwnPropertyNames(option).forEach(function(prop){
			if(Chain.prototype[prop]){
				throw new Error(
					'method "' + prop + '" is exist. ' +
					'Use different property name instead of "' + prop + '".');
			}
			Chain.prototype[prop] = (function(prop){
				return function(argv){
					argv = arguments;
					this.stream = this.stream.pipe(option[prop].apply(this, argv));
					return this;
				};
			})(prop);
		});
	});

	return new Chain();
};
