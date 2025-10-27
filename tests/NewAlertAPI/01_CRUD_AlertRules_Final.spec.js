const { test, expect, request } = require('@playwright/test');

const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));
//const data=JSON.parse(JSON.stringify(require("../../testData/BasicData.json")));

let _objectid;
let Output = "The response from the API is :"

const baseURL = data.baseUrl;
const write_token = data.write_token
const read_token = data.read_token

const createAlert = '/AlertRules/create_api';
const viewAlert = '/AlertRules/read_api?id=';
const updateAlert = '/AlertRules/update_api';

const listAlert = '/AlertRules/lists_api';
const activateAlert = '/AlertRules/activate_api';
const deactivateAlert = '/AlertRules/deactivate_api';
const deleteAlert = '/AlertRules/delete_api';

test.describe.serial('AlertAPI', () => {
  console.log("****Performing Test on Machine: ****"+baseURL) 

    test('Add AlertRules from NewAPI', async ({ request }) => {
      console.log("****Testing Create Alert Rules****")
      const response = await request.post(`${baseURL}/AlertRules/create_api`, {
        data: {
          "search_params": {
            "query": data.query,
            "timerange_day": 0,
            "timerange_hour": 0,
            "timerange_minute": data.timerange_minute,
            "repos": [
              "127.0.0.1:5504/_logpoint"
            ],
            "limit": data.limit,
            "flush_on_trigger": false,
            "search_interval_minute": data.search_interval_minute,
            "delay_interval_minute": 0,
            "throttling_enabled": false,
            "throttling_field": data.throttling_time_range,
            "throttling_time_range": 0
          },
          "incident_condition": {
            "condition_option": data.condition_option,
            "condition_value": 0,
            "risk": "low",
            "aggregate": data.aggregate
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
            "apply_jinja_template": true,
            "simple_view": false,
            "jinja_template": data.jinja_template
          },
          "foureyes": {
            "original_data": false
          },
          "name": data.alertName,
          "description": data.description
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

      expect(responseBody.message).toBe('Alertrule created successfully');
      expect(responseBody.id).toBeDefined();
      expect(responseBody.name).toBeDefined();
      _objectid = responseBody.id;
      console.log(_objectid);
    });

    test('View AlertRules from NewAPI', async ({ request }) => {
      console.log("****Testing View Alert Rules****")
      console.log("The added new alert rule id is : "+_objectid);
      console.log(_objectid);
      const response = await request.post(`${baseURL}/AlertRules/read_api?id=${_objectid}`, {
        headers: {
          'Authorization': `Bearer ${read_token}`  // Use the actual token here
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true
      });

      //expect(response.ok()).toBeTruthy(); // Check if status is 2xx
      const responseBody = await response.json();
      console.log(Output);
      console.log(responseBody);
      const data = responseBody.data; 
      expect(responseBody.data.alert_id).toBeDefined();
      expect(responseBody.data.search_params.query).toBeDefined();
      expect(responseBody.data.search_params.repos).toBeDefined();
      expect(responseBody.data.search_params.timerange_minute).toBeDefined();

      const alert_id = responseBody.data.alert_id;
    });

    test('Update AlertRules from NewAPI', async ({ request }) => {
      console.log("****Testing Update Alert Rules****") 
      const response = await request.post(`${baseURL}${updateAlert}`, {
        data: {
          "search_params": {
            "query": data.update_query,
            "timerange_day": 0,
            "timerange_hour": 20,
            "timerange_minute": 0,
            "repos": [
              "127.0.0.1:5504/default"
            ],
            "limit": 100,
            "flush_on_trigger": false,
            "search_interval_trigger": false,
            "search_interval_minute": 10,
            "delay_interval_trigger": false,
            "delay_interval_minute": 0,
            "throttling_enabled": false,
            "throttling_field": "",
            "throttling_time_range": 0
          },
          "incident_condition": {
            "condition_option": "greaterthan",
            "condition_value": 1,
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
            "visible_to_users": []
          },
          "incident_display_data": {
            "apply_jinja_template": false,
            "simple_view": false,
            "jinja_template": ""
          },
          "foureyes": {
            "original_data": false
          },
          "name": data.updatedAlertName,
          "description": "This is the description of the alert rules which has been updated one UI alert updated",
          "id": `${_objectid}`
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
      expect(responseBody.message).toBe('Alertrule updated successfully');
      expect(responseBody.id).toBeDefined();
      expect(responseBody.name).toBeDefined();

      const message = responseBody.alert_id;
    });

    test('View Alert list from NewAPI', async ({ request }) => {
      console.log("****Testing View Alert Rules Lists****") 
      const response = await request.post(`${baseURL}/AlertRules/lists_api`, {
      
        headers: {
          'Authorization': `Bearer ${read_token}`,
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true
      });
      //expect(response.ok()).toBeTruthy(); // Check if status is 2xx
      const responseBody = await response.json();
      console.log("the response is:" );
      console.log(responseBody);
      expect(response.ok()).toBeTruthy(); // Check if status is 2xx
      expect(responseBody.rows).toBeDefined();
      expect(Array.isArray(responseBody.rows)).toBe(true);
        // Example: validate the first row
        const firstRow = responseBody.rows[0];
        expect(firstRow.active).toBeDefined();
        expect(firstRow.description).toBeDefined();
        expect(firstRow.id).toBeDefined();
        expect(firstRow.name).toBeDefined();
        expect(firstRow.user).toBeDefined();
    });

    test('Deactivate Alert Rules', async ({ request }) => {
      console.log("****Testing Deativate Alert Rules****") 
      const response = await request.post(`${baseURL}${deactivateAlert}`, {
        data: {
            "ids": [
              `${_objectid}`
            ]
        },

        headers: {
          'Authorization': `Bearer ${write_token}`,
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true

      });
      const responseBody = await response.json();
      console.log(Output);
      console.log(responseBody);
      expect(response.ok()).toBeTruthy(); // Check if status is 2xx

      expect(responseBody.ids).toBeDefined();
      expect(responseBody.message).toBe('Alertrule(s) deactivated');
      expect(responseBody.success).toBe(true);

    });

    test('Activate Alert Rules', async ({ request }) => {
      console.log("****Testing Activate Alert Rules****") 
      const response = await request.post(`${baseURL}${activateAlert}`, {
        data: {
            "ids": [
              `${_objectid}`
            ]
        },

        headers: {
          'Authorization': `Bearer ${write_token}`,
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true

      });
      const responseBody = await response.json();
      console.log(Output);
      console.log(responseBody);
      expect(response.ok()).toBeTruthy(); // Check if status is 2xx

      expect(responseBody.ids).toBeDefined();
      expect(responseBody.message).toBe('Alertrule(s) activated');
      expect(responseBody.success).toBe(true);
    });

    test('Delete Alert Rules', async ({ request }) => {
      console.log("****Testing Delete Alert Rules****") 
      const response = await request.post(`${baseURL}${deleteAlert}`, {
        data: {
            "ids": [
              `${_objectid}`
            ]
        },

        headers: {
          'Authorization': `Bearer ${write_token}`,
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true

      });
      const responseBody = await response.json();
      console.log(Output);
      console.log(responseBody);
      expect(response.ok()).toBeTruthy(); // Check if status is 2xx

      expect(responseBody.ids).toBeDefined();
      expect(responseBody.message).toBe('Alertrule(s) deleted');
      expect(responseBody.success).toBe(true);
    });

    test.afterAll(async ({ request }) => {
        console.log('Clearing test data AlertRules');
        await deleteAlertRule(request);
        console.log('**********All the added Alert Rules has been Deleted Successfuly***********');
    });
});

async function deleteAlertRule(request) {
  console.log("Deleting the created AlertRules and the alert rule id is: ");
  console.log(_objectid);
  const response = await request.post(`${baseURL}${deleteAlert}`, {
    data: {
            "ids": [ `${_objectid}`]
    },
    headers: {
      'Authorization': `Bearer ${write_token}`,
    },
    ignoreHTTPSErrors: true
  });
}


//use this to run TestCases
//npx playwright test --bail=0 ./01_CRUD_AlertRules_Final.spec.js --reporter=line,allure-playwright
//allure generate ./allure-results --clean
//allure open ./allure-report