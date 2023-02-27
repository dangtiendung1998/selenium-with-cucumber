var {defineParameterType} = require('@cucumber/cucumber');

const dataPool = [];

defineParameterType({
    regexp: /"([^"]*)"/,
    transformer: function (str, separator = undefined) {
        console.log('defineParameterType - cucumber: ', str, separator)
        if (typeof str === "string") {
            return str ? str.split(separator || ',').map(el => el.trim()) : [];
        }
        return str;
    },
    name: "array",
    useForSnippets: false
});

defineParameterType({
    regexp: /"([^"]*)"/,
    transformer: function (str) {
        if(str.toLowerCase().includes('disable')) {
            return false;
        }
        if(str.toLowerCase().includes('enable')) {
            return true;
        }
    },
    name: "status",
    useForSnippets: false
});

defineParameterType({
    regexp: /"([^"]*)"/,
    transformer: function (str) {
        if (typeof str === "string" && str !== '') {
            if (dataPool[str]) {
                console.log('fake string: ', dataPool[str]);
                return dataPool[str];
            }

            const timestamp = Date.now();
            dataPool[str] = `${str}-${timestamp}`;
            console.log('fake string: ', dataPool[str]);
            return dataPool[str];
        }
        return str;
    },
    name: "fakeString",
    useForSnippets: false
});

module.exports = {
    fakeStringTransformer: function (str, verify = false) {
        if (typeof str === "string") {
            if (verify && dataPool[str]) {
                return dataPool[str];
            }

            const timestamp = Date.now();
            dataPool[str] = `${str}-${timestamp}`;
            return dataPool[str];
        }
        return str;
    },

    fakeEmailTransformer: function (str, verify = false) {
        if (typeof str === "string") {
            if (verify && dataPool[str]) {
                return dataPool[str];
            }
            const email = str.split('@');
            const prefixEmail = email[0];
            const suffixes = email[1];
            const timestamp = Date.now();
            dataPool[str] = `${prefixEmail}-${timestamp}@${suffixes}`;
            return dataPool[str];
        }
        return str;
    },
}
