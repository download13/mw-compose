# mw-compose

Compose several middleware handlers into one.
	mw1 -> mw2 -> m3 -> finalHandler

## Install:
	npm i mw-compose

## Example:
```javascript
var http = require('http');
var mw = require('mw-compose');
var swsend = require('sw-send');


function indexPage(req, res) {
	res.send('Page Contents!');
}


http.createServer(mw(swsend, indexPage)).listen(80);
```


## API:
* mw() - Creates a handler that runs any handlers passed to it in a `req, res, next` sequence

## License: MIT
