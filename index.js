const parseUrl = require('url').parse
const http = require('http')
const https = require('https')

function unshortOneTime (url, options) {
	return new Promise((resolve, reject) => {
		var parsed_url = parseUrl(url)
		var protocol = (parsed_url.protocol === "https:") ? https : http
		var host = parsed_url.host
		var path = parsed_url.pathname

		options = Object.assign(options, {host, path})

		var req = protocol.request(options, (response) => {
			resolve(response.headers && response.headers.location || url)
		})

		req.on('error', (e) => {
			reject(e)
		})

		req.end()
	})
}

function unshortRecursive (urls, options, resolve, reject, depth=0) {
	if(options.max_depth === depth)
		return resolve(urls)

	var long_url = urls[urls.length-1]

	unshortOneTime(long_url, options)
	.then(unshorted_url => {
		if (unshorted_url === long_url) 
			resolve(urls)
		else {
			urls.push(unshorted_url)
			unshortRecursive(urls, options, resolve, reject, depth+1)
		}
	})
	.catch(reject)
}

function unshort (url, options={}) {
	options.method = options.method || "GET"
	options.max_depth = options.max_depth || 10

	var urls = []
	urls.push(url)

	return new Promise((resolve, reject) => {
		unshortRecursive(urls, options, resolve, reject)
	})
}


module.exports = unshort