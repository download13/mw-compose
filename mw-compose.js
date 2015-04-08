var once = require('once');


var concat = Array.prototype.concat;


function composeMiddleware() {
	var list = concat.apply([], arguments);

	return function(req, res, next) {
		var wares = list.slice(0);

		_next();

		function _next() {
			if(wares.length > 0) {
				wares.shift()(req, res, once(_next));
			} else if(next) {
				next();
			}
		}
	}
}


module.exports = composeMiddleware;
