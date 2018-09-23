var reporter = require('cucumber-html-reporter');
 
var options = {
        title: 'Curl',
        brandTitle: 'Talking Pickle',
        theme: 'bootstrap',
        jsonFile: './test/cucumber_report.json',
        output: './test/cucumber_report.html',
        reportSuiteAsScenarios: false,
        launchReport: true,
        metadata: {
            "Version":"0.0.1"
        }
    };
 
    reporter.generate(options);
