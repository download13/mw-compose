var once = require('once');


var concat = Array.prototype.concat;


function composeMiddleware() {
	var list = concat.apply([], arguments);

	list.forEach(functionsOnly);

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

function functionsOnly(item) {
	if(typeof item !== 'function') {
		throw new Error('mw-compose argument was not a function: ' + item);
	}
}


module.exports = composeMiddleware;
