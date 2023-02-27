const axios = require("axios");
const fs = require("fs");

const query = new URLSearchParams({
    custom_task_ids: 'false',
    include_subtasks: 'true'
}).toString();

const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'pk_55642375_VLUZO89SYRQ3AMPKESS77XQ4J7TCSIKB'
    }
}

const taskId = '865bt8v9x';


// get test plan
axios.get(`https://api.clickup.com/api/v2/task/${taskId}?${query}`, config).then(async (response) => {
    // const {subtasks} = response.data
    for (const feature of response.data.subtasks) {
        let str = feature['name'] + '\n';
        for (const scenario of feature['subtasks']) {
            let detail = await axios.get(`https://api.clickup.com/api/v2/task/${scenario.id}?${query}`, config)
            str += detail['data']['name'] + '\n' + detail['data']['text_content'] + '\n';
        }
        console.log(str)
        fs.writeFile("../src/features/" + feature['id'].replace(/\s/g, '-') + '.feature', str, "utf8", (error, data) => {
        });
    }
})

