// tests/emailNotification.spec.js

const { test, expect } = require('@playwright/test');
const FormData = require('form-data');
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));

let _objectid;
let Output = "The response from the API is :"

const baseURL = data.baseUrl;
const write_token = data.write_token
const read_token = data.read_token
const deleteAlert = '/AlertRules/delete_api';
const httpNotification = "/pluggables/Notification/HTTPNotification/create_api";

test.describe.serial('AlertNotification', () => {
  test.beforeAll(async ({ request }) => {
        console.log('Createing AlertRules');
        await addAlertRule(request);
        console.log('**********New Alert has been crated Successfuly***********');
  });

  test.afterAll(async ({ request }) => {
      console.log('Clearing test data AlertRules');
      await deleteAlertRule(request);
      console.log('**********All the added Alert Rules has been Deleted Successfuly***********');
  });

  test('Create Http Notificaiton', async ({ request }) => {
    console.log("****Testing Create HTTP Notification****")    
      const response = await request.post(`${baseURL}${httpNotification}`, {
              data: {
                "type": "http",
                "http_url": "https://d05nm6gz1wg0000xzpx0gon44deyyyyyb.oast.pro",
                "http_request_type": "GET",
                "http_querystring": "col_type=syslog",
                "notify_http": false,
                "http_format_query": "",
                "http_body": "",
                "protocol": "HTTP",
                "dispatch_option": "manual",
                "http_header": "{\"auth_type\": \"None\"}",
                "http_threshold_value": 1,
                "http_threshold_option": "minute",
                "ids": [`${_objectid}`]
              },
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${write_token}`
              },
              // Disable SSL certificate verification
              ignoreHTTPSErrors: true
            });

            const responseBody = await response.json();
            console.log(Output);
            console.log(responseBody);
            expect(responseBody.success).toBe(true);
            expect(responseBody.data).toBeDefined();
            expect(responseBody.message).toBeDefined();
    });

  test('View HTTP Notification from NewAPI', async ({ request }) => {
    console.log("****Testing View HTTP Notification****")    
    console.log("The added new alert rule id is : "+_objectid);
        const response = await request.get(`${baseURL}/pluggables/Notification/HTTPNotification/read_api?id=${_objectid}`, {
              headers: {
                'Authorization': `Bearer ${read_token}`  // Use the actual token here
              },
              // Disable SSL certificate verification
              ignoreHTTPSErrors: true
            });
            const responseBody = await response.json();
            console.log(Output);
            console.log(responseBody);
            const data = responseBody.data; 
      
            expect(responseBody.success).toBe(true);
            expect(responseBody.data.type).toBeDefined();
            expect(responseBody.data.type).toBeDefined();
            expect(responseBody.data.http_url).toBeDefined();;
            expect(responseBody.data.http_request_type).toBeDefined();
            expect(responseBody.data.http_querystring).toBeDefined();;
            expect(responseBody.data.notify_http).toBeDefined();
            expect(responseBody.data.http_format_query).toBeDefined();;
            expect(responseBody.data.http_body).toBeDefined();;
            expect(responseBody.data.protocol).toBeDefined();
            expect(responseBody.data.dispatch_option).toBeDefined();;
            expect(responseBody.data.http_header).toBeDefined();;
            expect(responseBody.data.http_threshold_value).toBeDefined();;
            expect(responseBody.data.protocol).toBeDefined();
            expect(responseBody.data.http_threshold_option).toBeDefined();;
    });

  test('Create Email Notification via API', async ({ request }) => {
    const form = new FormData();
  
    form.append('notify_email', 'false');
    form.append('subject', 'test');
    form.append('logo_type', 'default');
    form.append('simple_view', 'on');
    form.append('logo_enable', 'false');
    form.append('ids', '["6833f1a6db223626498ed37b"]');
    form.append('disable_search_link', 'false');
    form.append('email_emails', 'bit@logpoint.con');
    form.append('type', 'email');
  
    const response = await request.post(
      'https://10.45.10.150/pluggables/Notification/EmailNotification/create_api',
      {
        headers: {
          ...form.getHeaders(),
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dwb2ludCIsInNjb3BlIjoidXNlcjp3cml0ZSBhbGVydHJ1bGVzOndyaXRlIGxvZ3NvdXJlOndyaXRlIHNlYXJjaDp3cml0ZSIsImlhdCI6MTc0ODIzNDYxNCwiZXhwIjoxNzQ4NDkzODE0LCJpc3MiOiJzZWxmLXNpZ25lZCJ9.cSHgGZLV27SzcU-RBVte9QeN7FtZE63FNQ6dfr51Y3g',
        },
        body: form,
        // Insecure HTTPS (self-signed)
        ignoreHTTPSErrors: true,
      }
    );
  
    const responseBody = await response.json();
    console.log('✅ Response:', responseBody);
  
    // Validate response (adjust based on your actual API response)
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('success', true);
  });
  
  test('View Email Notification from NewAPI', async ({ request }) => {
            console.log("The added new alert rule id is : "+_objectid);
      
            const response = await request.get(`${baseURL}/pluggables/Notification/EmailNotification/read_api`, {
               data: {
                      "id": _objectid
               },
              headers: {
                'Authorization': `Bearer ${read_token}`  // Use the actual token here
              },
              // Disable SSL certificate verification
              ignoreHTTPSErrors: true
            });
            const responseBody = await response.json();
            console.log(Output);
            console.log(responseBody);
            const data = responseBody.data; 
      
            expect(responseBody.success).toBe(true);
            expect(responseBody.data.type).toBeDefined();
            expect(responseBody.data.type).toBeDefined();
            expect(responseBody.data.http_url).toBeDefined();;
            expect(responseBody.data.http_request_type).toBeDefined();
            expect(responseBody.data.http_querystring).toBeDefined();;
            expect(responseBody.data.notify_http).toBeDefined();
            expect(responseBody.data.http_format_query).toBeDefined();;
            expect(responseBody.data.http_body).toBeDefined();;
            expect(responseBody.data.protocol).toBeDefined();
            expect(responseBody.data.dispatch_option).toBeDefined();;
            expect(responseBody.data.http_header).toBeDefined();;
            expect(responseBody.data.http_threshold_value).toBeDefined();;
            expect(responseBody.data.protocol).toBeDefined();
            expect(responseBody.data.http_threshold_option).toBeDefined();;
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

async function addAlertRule(request) {
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
          "name": data.notifAlertName,
          "description": data.description
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${write_token}`
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true
      });
      const responseBody = await response.json();
      console.log(Output);
      console.log(responseBody);
      expect(responseBody.message).toBe('Alertrule created successfully');
      _objectid = responseBody.id;
      console.log(_objectid);
}