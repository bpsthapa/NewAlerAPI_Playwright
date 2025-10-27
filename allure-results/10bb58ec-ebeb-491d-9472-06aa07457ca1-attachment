# Test info

- Name: AlertNotification >> Create Email Notification via API
- Location: /Users/Bipinlp/Documents/LogPoint_Feature/Allure Report/tests/AlertNotification/AlertRulesNotification.spec.js:95:3

# Error details

```
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST https://10.45.10.150/pluggables/Notification/EmailNotification/create_api
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.7103.25 Safari/537.36
    - accept: application/json
    - accept-encoding: gzip,deflate,br
    - content-type: multipart/form-data; boundary=--------------------------679603786179664253411531
    - Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dwb2ludCIsInNjb3BlIjoidXNlcjp3cml0ZSBhbGVydHJ1bGVzOndyaXRlIGxvZ3NvdXJlOndyaXRlIHNlYXJjaDp3cml0ZSIsImlhdCI6MTc0ODIzNDYxNCwiZXhwIjoxNzQ4NDkzODE0LCJpc3MiOiJzZWxmLXNpZ25lZCJ9.cSHgGZLV27SzcU-RBVte9QeN7FtZE63FNQ6dfr51Y3g

    at /Users/Bipinlp/Documents/LogPoint_Feature/Allure Report/tests/AlertNotification/AlertRulesNotification.spec.js:108:36
```

# Test source

```ts
   8 | let Output = "The response from the API is :"
   9 |
   10 | const baseURL = data.baseUrl;
   11 | const write_token = data.write_token
   12 | const read_token = data.read_token
   13 | const deleteAlert = '/AlertRules/delete_api';
   14 | const httpNotification = "/pluggables/Notification/HTTPNotification/create_api";
   15 |
   16 | test.describe.serial('AlertNotification', () => {
   17 |   test.beforeAll(async ({ request }) => {
   18 |         console.log('Createing AlertRules');
   19 |         await addAlertRule(request);
   20 |         console.log('**********New Alert has been crated Successfuly***********');
   21 |   });
   22 |
   23 |   test.afterAll(async ({ request }) => {
   24 |       console.log('Clearing test data AlertRules');
   25 |       await deleteAlertRule(request);
   26 |       console.log('**********All the added Alert Rules has been Deleted Successfuly***********');
   27 |   });
   28 |
   29 |   test('Create Http Notificaiton', async ({ request }) => {
   30 |     console.log("****Testing Create HTTP Notification****")    
   31 |       const response = await request.post(`${baseURL}${httpNotification}`, {
   32 |               data: {
   33 |                 "type": "http",
   34 |                 "http_url": "https://d05nm6gz1wg0000xzpx0gon44deyyyyyb.oast.pro",
   35 |                 "http_request_type": "GET",
   36 |                 "http_querystring": "col_type=syslog",
   37 |                 "notify_http": false,
   38 |                 "http_format_query": "",
   39 |                 "http_body": "",
   40 |                 "protocol": "HTTP",
   41 |                 "dispatch_option": "manual",
   42 |                 "http_header": "{\"auth_type\": \"None\"}",
   43 |                 "http_threshold_value": 1,
   44 |                 "http_threshold_option": "minute",
   45 |                 "ids": [`${_objectid}`]
   46 |               },
   47 |               headers: {
   48 |                 'Content-Type': 'application/json',
   49 |                 'Authorization': `Bearer ${write_token}`
   50 |               },
   51 |               // Disable SSL certificate verification
   52 |               ignoreHTTPSErrors: true
   53 |             });
   54 |
   55 |             const responseBody = await response.json();
   56 |             console.log(Output);
   57 |             console.log(responseBody);
   58 |             expect(responseBody.success).toBe(true);
   59 |             expect(responseBody.data).toBeDefined();
   60 |             expect(responseBody.message).toBeDefined();
   61 |     });
   62 |
   63 |   test('View HTTP Notification from NewAPI', async ({ request }) => {
   64 |     console.log("****Testing View HTTP Notification****")    
   65 |     console.log("The added new alert rule id is : "+_objectid);
   66 |         const response = await request.get(`${baseURL}/pluggables/Notification/HTTPNotification/read_api?id=${_objectid}`, {
   67 |               headers: {
   68 |                 'Authorization': `Bearer ${read_token}`  // Use the actual token here
   69 |               },
   70 |               // Disable SSL certificate verification
   71 |               ignoreHTTPSErrors: true
   72 |             });
   73 |             const responseBody = await response.json();
   74 |             console.log(Output);
   75 |             console.log(responseBody);
   76 |             const data = responseBody.data; 
   77 |       
   78 |             expect(responseBody.success).toBe(true);
   79 |             expect(responseBody.data.type).toBeDefined();
   80 |             expect(responseBody.data.type).toBeDefined();
   81 |             expect(responseBody.data.http_url).toBeDefined();;
   82 |             expect(responseBody.data.http_request_type).toBeDefined();
   83 |             expect(responseBody.data.http_querystring).toBeDefined();;
   84 |             expect(responseBody.data.notify_http).toBeDefined();
   85 |             expect(responseBody.data.http_format_query).toBeDefined();;
   86 |             expect(responseBody.data.http_body).toBeDefined();;
   87 |             expect(responseBody.data.protocol).toBeDefined();
   88 |             expect(responseBody.data.dispatch_option).toBeDefined();;
   89 |             expect(responseBody.data.http_header).toBeDefined();;
   90 |             expect(responseBody.data.http_threshold_value).toBeDefined();;
   91 |             expect(responseBody.data.protocol).toBeDefined();
   92 |             expect(responseBody.data.http_threshold_option).toBeDefined();;
   93 |     });
   94 |
   95 |   test('Create Email Notification via API', async ({ request }) => {
   96 |     const form = new FormData();
   97 |   
   98 |     form.append('notify_email', 'false');
   99 |     form.append('subject', 'test');
  100 |     form.append('logo_type', 'default');
  101 |     form.append('simple_view', 'on');
  102 |     form.append('logo_enable', 'false');
  103 |     form.append('ids', '["6833f1a6db223626498ed37b"]');
  104 |     form.append('disable_search_link', 'false');
  105 |     form.append('email_emails', 'bit@logpoint.con');
  106 |     form.append('type', 'email');
  107 |   
> 108 |     const response = await request.post(
      |                                    ^ Error: apiRequestContext.post: Target page, context or browser has been closed
  109 |       'https://10.45.10.150/pluggables/Notification/EmailNotification/create_api',
  110 |       {
  111 |         headers: {
  112 |           ...form.getHeaders(),
  113 |           accept: 'application/json',
  114 |           Authorization:
  115 |             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2dwb2ludCIsInNjb3BlIjoidXNlcjp3cml0ZSBhbGVydHJ1bGVzOndyaXRlIGxvZ3NvdXJlOndyaXRlIHNlYXJjaDp3cml0ZSIsImlhdCI6MTc0ODIzNDYxNCwiZXhwIjoxNzQ4NDkzODE0LCJpc3MiOiJzZWxmLXNpZ25lZCJ9.cSHgGZLV27SzcU-RBVte9QeN7FtZE63FNQ6dfr51Y3g',
  116 |         },
  117 |         body: form,
  118 |         // Insecure HTTPS (self-signed)
  119 |         ignoreHTTPSErrors: true,
  120 |       }
  121 |     );
  122 |   
  123 |     const responseBody = await response.json();
  124 |     console.log('✅ Response:', responseBody);
  125 |   
  126 |     // Validate response (adjust based on your actual API response)
  127 |     expect(response.status()).toBe(200);
  128 |     expect(responseBody).toHaveProperty('success', true);
  129 |   });
  130 |   
  131 |   test('View Email Notification from NewAPI', async ({ request }) => {
  132 |             console.log("The added new alert rule id is : "+_objectid);
  133 |       
  134 |             const response = await request.get(`${baseURL}/pluggables/Notification/EmailNotification/read_api`, {
  135 |                data: {
  136 |                       "id": _objectid
  137 |                },
  138 |               headers: {
  139 |                 'Authorization': `Bearer ${read_token}`  // Use the actual token here
  140 |               },
  141 |               // Disable SSL certificate verification
  142 |               ignoreHTTPSErrors: true
  143 |             });
  144 |             const responseBody = await response.json();
  145 |             console.log(Output);
  146 |             console.log(responseBody);
  147 |             const data = responseBody.data; 
  148 |       
  149 |             expect(responseBody.success).toBe(true);
  150 |             expect(responseBody.data.type).toBeDefined();
  151 |             expect(responseBody.data.type).toBeDefined();
  152 |             expect(responseBody.data.http_url).toBeDefined();;
  153 |             expect(responseBody.data.http_request_type).toBeDefined();
  154 |             expect(responseBody.data.http_querystring).toBeDefined();;
  155 |             expect(responseBody.data.notify_http).toBeDefined();
  156 |             expect(responseBody.data.http_format_query).toBeDefined();;
  157 |             expect(responseBody.data.http_body).toBeDefined();;
  158 |             expect(responseBody.data.protocol).toBeDefined();
  159 |             expect(responseBody.data.dispatch_option).toBeDefined();;
  160 |             expect(responseBody.data.http_header).toBeDefined();;
  161 |             expect(responseBody.data.http_threshold_value).toBeDefined();;
  162 |             expect(responseBody.data.protocol).toBeDefined();
  163 |             expect(responseBody.data.http_threshold_option).toBeDefined();;
  164 |   });
  165 |   
  166 | });
  167 |
  168 | async function deleteAlertRule(request) {
  169 |   console.log("Deleting the created AlertRules and the alert rule id is: ");
  170 |   console.log(_objectid);
  171 |   const response = await request.post(`${baseURL}${deleteAlert}`, {
  172 |     data: {
  173 |             "ids": [ `${_objectid}`]
  174 |     },
  175 |     headers: {
  176 |       'Authorization': `Bearer ${write_token}`,
  177 |     },
  178 |     ignoreHTTPSErrors: true
  179 |   });
  180 | }
  181 |
  182 | async function addAlertRule(request) {
  183 |   console.log("****Testing Create Alert Rules****")
  184 |       const response = await request.post(`${baseURL}/AlertRules/create_api`, {
  185 |         data: {
  186 |           "search_params": {
  187 |             "query": data.query,
  188 |             "timerange_day": 0,
  189 |             "timerange_hour": 0,
  190 |             "timerange_minute": data.timerange_minute,
  191 |             "repos": [
  192 |               "127.0.0.1:5504/_logpoint"
  193 |             ],
  194 |             "limit": data.limit,
  195 |             "flush_on_trigger": false,
  196 |             "search_interval_minute": data.search_interval_minute,
  197 |             "delay_interval_minute": 0,
  198 |             "throttling_enabled": false,
  199 |             "throttling_field": data.throttling_time_range,
  200 |             "throttling_time_range": 0
  201 |           },
  202 |           "incident_condition": {
  203 |             "condition_option": data.condition_option,
  204 |             "condition_value": 0,
  205 |             "risk": "low",
  206 |             "aggregate": data.aggregate
  207 |           },
  208 |           "taxonomy": {
```