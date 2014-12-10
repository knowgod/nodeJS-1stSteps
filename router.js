function route(handle, pathname) {
    console.log("About to route a request for " + pathname);
    var ret;
    if (typeof handle[pathname] === 'function') {
        ret = handle[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
        ret = "404 Not found";
    }
    console.log("");
    return ret;
}

exports.route = route;