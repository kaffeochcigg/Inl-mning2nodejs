/* Includes: */
var http = require('http');
var fs = require('fs');
var url = require('url');

function calcPage(res) {
    fs.readFile('jsCalc.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

function count(res) {
    fs.readFile('rokna.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

function computePage(adr, res) {
    var q = url.parse(adr, true);


    res.write("<!DOCTYPE html >");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>" + q.search + "</title>");
    res.write("</head>");
    res.write("<body>");

    var X = q.query.x * 1, Y = q.query.y * 1, Z;
    switch (q.query.op) {
        case "plus": Z = X + Y; break;
        case "minus": Z = X - Y; break;
        case "times": Z = X * Y; break;
        case "div": Z = X / Y; break;
    }
    var oP = q.query.op
    switch (q.query.op) {
        case "plus": oP = "+"; break;
        case "minus": oP = "-"; break;
        case "times": oP = "*"; break;
        case "div": oP = "/"; break;
    }

    var expr = X + " " + oP + " " + Y + " = " + Z;

    res.write("<h1>" + expr + "</h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end();
}
/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //res.write(req.url);
    console.log("Serving " + req.url);
    var p = url.parse(req.url, true);

    if (req.url == "/") {
        count(res);
    }
    else if (req.url == "/calc") {
        calcPage(res);
    }
    else if (p.pathname == "/compute") {
        computePage(req.url, res);
    }
    else {
        res.write("404")
        res.end();
    }

}).listen(8080);