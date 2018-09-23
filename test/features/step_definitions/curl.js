const {
    Given,
    When,
    Then,
    AfterAll
} = require('cucumber');

const {
    Docker
} = require('docker-cli-js');
const containerName = 'talking-pickle-test';
const fs = require('fs');

Given('I have a running talking-pickle instance', function() {
    let docker = new Docker();
    return docker.command('run --name ' + containerName + ' -itd talking-pickle/env');
});

When('I make a curl request to HTTP Bin', function() {
    return runCommand('curl https://httpbin.org/get', this);
});

Then('I receive a JSON response', function(cb) {
    this.attach("   <i>JSON.parse</i>");
    this.attach("   <i>JSON.parse</i>");

    this.attach(fs.readFileSync('./test/screenshot.png'), 'image/png');
    //return JSON.parse(this.response);
    cb.fail();
});

AfterAll(function() {
    let docker = new Docker();
    return docker.command('rm -f ' + containerName);
});

const runCommand = function (command, ctx) {
    ctx.attach("Command: " + command);
    let docker = new Docker();
    return docker.command('exec ' + containerName + ' ' + command).then(function(data) {
        ctx.response = data.raw;
    });
};

