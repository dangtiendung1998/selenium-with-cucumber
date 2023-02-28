var reporter = require('cucumber-html-reporter');
var fs = require('fs');
var path = require('path');
var options = {
    theme: 'bootstrap',
    jsonDir: 'test-reports',
    jsonFile: 'test-reports/results/reports.json',
    output: 'test-reports/results.html',
    screenshotsDirectory: 'test-reports/screenshots',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: false,
    ignoreBadJsonFile: true,
    storeScreenshots: true
};

function validateJSON(body) {
    try {
        // if came to here, then valid
        return JSON.parse(body);
    } catch (e) {
        // failed to parse
        return null;
    }
}

function validateJsonFile(filePath) {
    let rawData = fs.readFileSync(filePath);
    return validateJSON(rawData);
}

function getAllJsonFiles(folder) {
    const files = fs.readdirSync(folder);
    return files.filter(function (file) {
        return file.endsWith('.json');
    });
}

function tweakReportJson(content) {
    return content.map(function (ctn) {
        return {
            ...ctn,
            elements: ctn.elements.map(function (elm) {
                if (elm.steps[elm.steps.length - 2].result.status === 'skipped') {
                    elm.steps[elm.steps.length - 1].result.status = 'skipped';
                }
                return elm;
            })
        }
    })
}

const JSON_DIR = 'test-reports/';

function fixBadJsonFiles(folder) {
    const jsonFiles = getAllJsonFiles(folder);
    for (const file of jsonFiles) {
        const filePath = path.join(folder, file);
        const json = validateJsonFile(filePath);
        if (!json) {
            fs.unlinkSync(filePath);
        } else {
            const tweakedJson = tweakReportJson(json);
            fs.writeFileSync(filePath, JSON.stringify(tweakedJson));
        }
    }
}

// function exportReport() {
    fixBadJsonFiles(JSON_DIR);
    reporter.generate(options);
// }

// module.exports = exportReport;


//more info on `metadata` is available in `options` section below.

//to generate consodilated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`. More info is available in `options` section below.
