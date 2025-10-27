const { test, expect, request } = require('@playwright/test');
//This read data and loads the .json file as a JavaScript object.
//const data=JSON.parse(JSON.stringify(require("../../testData/BasicData.json")));
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));
const alertData=JSON.parse(JSON.stringify(require("../../testData/invalidAlertInputs.json")));
//It directly loads the test data from the same JSON file again, without copying and can be used to test each data set
const testData = require("../../testData/invalidAlertInputs.json");

let Output = "The response from the API is :"

const baseURL = data.baseUrl;
const write_token = data.write_token
const createAlert = '/AlertRules/create_api';

    testData.forEach((alertdata, index) => {    
        test(`Add AlertRule: ${index}`, async ({ request }) => {
        
        const response = await request.post(`${baseURL}${createAlert}`, {
            data: {
            "search_params": {
                "query": alertdata.query,
                "timerange_day": 0,
                "timerange_hour": 0,
                "timerange_minute": 1,
                "repos": [
                "127.0.0.1:5504/_logpoint"
                ],
                "limit": alertdata.limit,
                "flush_on_trigger": false,
                "search_interval_minute": 1,
                "delay_interval_minute": 0,
                "throttling_enabled": false,
                "throttling_field": "",
                "throttling_time_range": 0
            },
            "incident_condition": {
                "condition_option": "greaterthan",
                "condition_value": 0,
                "risk": "low",
                "aggregate": "max"
            },
            "taxonomy": {
                "attack_tag_hashes": [],
                "logsources": [],
                "metadata": [
                {
                    "field": "string",
                    "value": "string"
                }
                ]
            },
            "incident_ownership": {
                "assignee": "admin",
                "visible_to_usergroups": []
            },
            "incident_display_data": {
                "apply_jinja_template": false,
                "simple_view": false,
                "jinja_template": ""
            },
            "foureyes": {
                "original_data": false
            },
            "name": alertdata.name,
            "description": "This is the description"
            },
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${write_token}`
            },
            // Disable SSL certificate verification
            ignoreHTTPSErrors: true
        });
        
        //expect(response.ok()).toBeTruthy(); // Check if status is 2xx
        const responseBody = await response.json();
        console.log(Output);
        console.log(responseBody);

        //assert individual fields
        expect(responseBody.success).toBe(false);
        expect(responseBody.validationErrors).toBeDefined();
        expect(responseBody.message).toBe("Invalid Request");
        });
    });



    //npx playwright test ./02_CreateAlert_invalidData.spec.js --reporter=line,allure-playwright