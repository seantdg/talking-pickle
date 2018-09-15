const {
    Given,
    When,
    Then,
    AfterAll
} = require('cucumber');

const {
    Docker
} = require('docker-cli-js');
const exec = util.promisify(require('child_process').exec);
const containerName = 'talking-pickle-test';

Given('I have a running talking-pickle instance', function() {
    //what if this tested using docker, AND local debian?

    //check if .picklerc is present? or check if talking-pickle binary is present?
    let docker = new Docker();
    return docker.command('run --name ' + containerName + ' -itd talking-pickle/env');
});

When('I make a curl request to HTTP Bin', function() {
    return runTestCommand('curl https://httpbin.org/get', this);
});

Then('I receive a JSON response', function() {
    return testResponse(JSON.parse, this);
});

AfterAll(function() {
    let docker = new Docker();
    return docker.command('rm -f ' + containerName);
});

const runTestCommand = function (command, ctx) {
    let docker = new Docker();
    return Promise.all([
        docker.command('exec ' + containerName + ' ' + command).then(function(data) {
            ctx.dockerResponse = data.raw;
        }),
        exec(command).then(function(data) {
            ctx.localResponse = data.raw;
        }); 
    ]);
};

const testResponse = function (testFunction, ctx) {
    return testFunction(ctx.dockerResponse) && testFunction(ctx.localResponse);
};
