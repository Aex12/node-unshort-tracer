const unshort = require(".")

var options = {
	method: "GET",
	max_depth: 20,
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0'
	}
}

unshort("http://bit.ly/2Os3Tiw", options)
.then(console.log)
.catch(console.error)