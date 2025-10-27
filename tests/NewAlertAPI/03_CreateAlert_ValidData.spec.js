const { test, expect, request } = require('@playwright/test');
//This read data and loads the .json file as a JavaScript object.
//const data=JSON.parse(JSON.stringify(require("../../testData/BasicData.json")));
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));
const alertData=JSON.parse(JSON.stringify(require("../../testData/validAlertInputs.json")));
//It directly loads the test data from the same JSON file again, without copying and can be used to test each data set

const testData = require("../../testData/validAlertInputs.json");
const { captureRejectionSymbol } = require('events');

let Output = "The response from the API is :"
let _objectid;
const idList = [];

const baseURL = data.baseUrl;
const write_token = data.write_token
const deleteAlert = '/AlertRules/delete_api';
const createAlert = '/AlertRules/create_api';

test.describe.serial('Add Multiple Alerts and Delete all the added alertrules', () => {
  testData.forEach((alertdata, index) => {
    test(`Add AlertRule: ${index}`, async ({ request }) => {
      const response = await request.post(`${baseURL}${createAlert}`, {
        data: {
          name: alertdata.name,
          description: "This is the description",
          search_params: {
            query: alertdata.query,
            timerange_day: 0,
            timerange_hour: 0,
            timerange_minute: 1,
            repos: ["127.0.0.1:5504/_logpoint"],
            limit: alertdata.limit,
            flush_on_trigger: false,
            search_interval_minute: 1,
            delay_interval_minute: 0,
            throttling_enabled: false,
            throttling_field: "",
            throttling_time_range: 0
          },
          incident_condition: {
            condition_option: "greaterthan",
            condition_value: 0,
            risk: "low",
            aggregate: "max"
          },
          taxonomy: {
            attack_tag_hashes: [],
            logsources: [],
            metadata: [
              {
                field: "string",
                value: "string"
              }
            ]
          },
          incident_ownership: {
            assignee: "admin",
            visible_to_usergroups: []
          },
          incident_display_data: {
            apply_jinja_template: false,
            simple_view: false,
            jinja_template: ""
          },
          foureyes: {
            original_data: false
          }
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${write_token}`
        },
        ignoreHTTPSErrors: true
      });

      const responseBody = await response.json();
      console.log("The response from the API is :");
      console.log(responseBody);

      expect(response.ok()).toBeTruthy();
      expect(responseBody.message).toBe('Alertrule created successfully');
      expect(responseBody.id).toBeDefined();
      expect(responseBody.name).toBeDefined();

      idList.push(responseBody.id);
    });
  });

  test.afterAll(async ({ request }) => {
    console.log('Clearing all AlertRules');
    await deleteAlertRule(request);
    console.log('**********All the added Alert Rules has been Deleted Successfuly***********');
  });
});

async function deleteAlertRule(request) {
  console.log("Deleting all the created AlertRules And the list of Alert Rules id are: ");
  console.log(idList);
  const response = await request.post(`${baseURL}${deleteAlert}`, {
    data: {
      ids: idList
    },
    headers: {
      'Authorization': `Bearer ${write_token}`,
    },
    ignoreHTTPSErrors: true
  });
  const responseBody = await response.json();
  console.log("The response from the API is :");
  console.log(responseBody);
  expect(response.ok()).toBeTruthy();
  expect(responseBody.success).toBe(true);
  expect(responseBody.message).toBe('Alertrule(s) deleted');
  
}



