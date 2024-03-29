import express = require('express');
import http = require('http');
import path = require('path');
import crypto = require('crypto');
import fs = require('fs');
import chalk = require('chalk');
var App = express();
var server = http.createServer(App);
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')).toString());
const front = path.join(__dirname, '../front');

function log_httpget(msg: string, code: number = 200) {
    console.log(chalk.green(`[HTTP GET ${code}] `) + msg);
}

App.get('/open-source', (req, res) => {
    log_httpget('/open-source ==> https://github.com/YHBZ/yhoj-code-base', 301);
    // 301 - 永久重定向
    // 302 - 临时重定向
    res.redirect(301, "https://github.com/YHBZ/yhoj-code-base");
});

App.get('/', (req, res) => {
    log_httpget('/');
    res.sendFile(path.join(front, 'index.html'));
});

server.listen(config.port, config.host, () => {
    console.log("Start listening...");
});
