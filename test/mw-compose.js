var assert = require('assert');

var mw = require('../mw-compose');


describe('mw', function() {
	it('should create a handler of composed handlers', function() {
		var res = runHandler(mw(handler1, handler2, handler3));

		assert(res.handler1);
		assert(res.handler2);
		assert(res.handler3);
		assert(!res.handler4);
	});

	it('should take an array as well', function() {
		var res = runHandler(mw([handler1, handler2, handler3]));

		assert(res.handler1);
		assert(res.handler2);
		assert(res.handler3);
		assert(!res.handler4);
	});

	it('should take arrays as arguments', function() {
		var res = runHandler(mw([handler1, handler2], [handler3]));

		assert(res.handler1);
		assert(res.handler2);
		assert(res.handler3);
		assert(!res.handler4);
	});

	it('should take an array and handler as arguments', function() {
		var res = runHandler(mw([handler1, handler2], handler3));

		assert(res.handler1);
		assert(res.handler2);
		assert(res.handler3);
		assert(!res.handler4);
	});

	it('should take an array and handlers as arguments', function() {
		var res = runHandler(mw([handler1], handler2, handler3));

		assert(res.handler1);
		assert(res.handler2);
		assert(res.handler3);
		assert(!res.handler4);
	});

	it('should call next if no handlers handled the request', function(done) {
		var res = runHandler(mw(handler1));

		setTimeout(function() {
			assert(res.nextCalled);

			done();
		}, 20);
	});

	it('should throw an error on being givena a non-function handler', function() {
		assert.throws(function() {
			mw('not a function');
		}, function(err) {
			return err.message === 'mw-compose argument was not a function: not a function';
		});
	});
});


function handler1(req, res, next) {
	res.handler1 = true;

	next();
}

function handler2(req, res, next) {
	res.handler2 = true;

	next();
}

function handler3(req, res) {
	res.handler3 = true;
}

function handler4(req, res) {
	res.handler4 = true;
}

function runHandler(handler) {
	var req = {};

	var res = {};

	handler(req, res, function() {
		res.nextCalled = true;
	});

	return res;
}
