var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        var chunkCounter = 0;
        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + (++chunkCounter) + "' (" + (postDataChunk.length) + " bytes).");
        });

        request.addListener("end", function () {
            route(handle, pathname, response, postData);
            console.log("Complete receiving POST data - " + postData.length + " bytes.");
        });

    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;