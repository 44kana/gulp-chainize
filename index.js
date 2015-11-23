'use strict';
/* jshint node:true */

module.exports = function(gulp, option, option2){
	function Chain(){
		this._stream = undefined;
	}

	Chain.prototype.src = function(){
		this._stream = gulp.src.apply(this, arguments);
		return this;
	};
	Chain.prototype.pipe = function(func){
		this._stream = this._stream.pipe(func);
		return this;
	};
	Chain.prototype.dest = function(){
		this._stream = this._stream.pipe(gulp.dest.apply(this, arguments));
		return this;
	};

	[option, option2].filter(function(option){
		return option !== undefined;
	}).forEach(function(option){
		Object.getOwnPropertyNames(option).forEach(function(prop){
			if(Chain.prototype[prop] || prop==='_stream'){
				throw new Error(
					'method "' + prop + '" is exist. ' +
					'Use different property name instead of "' + prop + '".');
			}
			Chain.prototype[prop] = (function(func){
				return function(){
					this._stream = this._stream.pipe(func.apply(this, arguments));
					return this;
				};
			})(option[prop]);
		});
	});

	return new Chain();
};
