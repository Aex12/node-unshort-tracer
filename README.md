# unshort-tracer
### What can do this library?
unshort-tracer is a simple, dependency-less, promise-based library that can follow HTTP redirects and trace where is the url redirecting to. The main function returns an array with all the url redirections. Being the first element on this array the url suplied to the function, and the last element the final url.


## Installation
`$ npm install unshort-tracer --save`


## Usage
Most simple use case would be unshorting an url and printing all the redirections: 
```javascript 
var unshort = require('unshort-tracer')

unshort('http://bit.ly/2Os3Tiw')
.then(urls => {
    console.log(urls[0]) // http://bit.ly/2Os3Tiw
    
    console.log(urls) // [ 'http://bit.ly/2Os3Tiw', 'https://goo.gl/6cwyTp',
                      // 'http://google.es/', 'http://www.google.es/',
                      // 'https://www.google.es/?gws_rd=ssl' ]
                      
    console.log(urls.length-1) // https://www.google.es/?gws_rd=ssl
})
```


## Options
We can supply options to the main function as second argument to modify the behaviour of the library. 
```javascript
var unshort = require('unshort-tracer') 

var options = {
    method: "HEAD", // Specify the HTTP method that will be used to make the HTTP request. Default: GET
    max_depth: 20, // Specify how many redirections are we going to follow. Default: 10
    headers: {'User-Agent': 'Mozilla/5.0'} // Specify the headers that we will be sending in our request, for example an User-Agent.
}

unshort('http://bit.ly/2Os3Tiw', options)
.then(processRedirections)
```

You can also use any of the options of the native http.request function, take a look at them here: https://nodejs.org/api/http.html#http_http_request_options_callback
