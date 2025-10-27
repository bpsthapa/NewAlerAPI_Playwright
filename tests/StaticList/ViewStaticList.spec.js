const { test, expect, request } = require('@playwright/test');
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));


const staticList = '/UserDefinedList/lists_api';
const baseURL = data.baseUrl;
const write_token = data.write_token;
const read_token = data.read_token;

 test('View static list', async ({ request }) => {
      const response = await request.get(`${baseURL}${staticList}?limit=25&page=2&return_all_data=true`, {
        data: {
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${read_token}`
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true
      });

      expect(response.ok()).toBeTruthy(); // Check if status is 2xx
      const responseBody = await response.json();
      console.log(responseBody)
      //This is the assertion
      expect(responseBody).toHaveProperty('rows');
      expect(Array.isArray(responseBody.rows)).toBe(true);
      expect(responseBody.rows.length).toBeGreaterThan(0);

      for (const row of responseBody.rows) {
        expect(row).toHaveProperty('id');
        expect(row.id).toBeTruthy();
        
        expect(row).toHaveProperty('list_type');
        expect(row.list_type).toBeTruthy();

        expect(row).toHaveProperty('name');
        expect(row.name).toBeTruthy();
      }
  });


//    npx playwright test ./getAllRepos.spec.js --reporter=line,allure-playwright