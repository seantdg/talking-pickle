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

Given('I have a running talking-pickle instance', function() {
    let docker = new Docker();
    return docker.command('run --name ' + containerName + ' -itd talking-pickle/env');
});

When('I make a curl request to HTTP Bin', function() {
    return runTestCommand('curl https://httpbin.org/get', this);
});

Then('I receive a JSON response', function() {
    return JSON.parse(this.response);
});

AfterAll(function() {
    let docker = new Docker();
    return docker.command('rm -f ' + containerName);
});

const runTestCommand = function (command, ctx) {
    let docker = new Docker();
    return docker.command('exec ' + containerName + ' ' + command).then(function(data) {
        ctx.response = data.raw;
    });
};
