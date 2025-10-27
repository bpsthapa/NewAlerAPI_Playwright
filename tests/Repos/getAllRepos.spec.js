const { test, expect, request } = require('@playwright/test');
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));


const allRepo = '/Repo/get_all_searchable_logpoint';
const baseURL = data.baseUrl;
const write_token = data.write_token;
const read_token = data.read_token;

 test('View All Repos from NewAPI', async ({ request }) => {
      
      const response = await request.get(`${baseURL}${allRepo}`, {
        data: {
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${read_token}`
        },
        // Disable SSL certificate verification
        ignoreHTTPSErrors: true
      });
      const responseBody = await response.json();
      expect(response.ok()).toBeTruthy(); // Check status is 2xx
      console.log("🔍 Full JSON Response:\n", JSON.stringify(responseBody, null, 2));

        // Check API response status is 2xx
        expect(response.ok()).toBeTruthy();

        // Ensure responseBody.rows exists and is an array
        expect(responseBody.rows).toBeDefined();
        expect(Array.isArray(responseBody.rows)).toBe(true);
        expect(responseBody.rows.length).toBeGreaterThan(0);

        // Extract first row and validate
        const firstRow = responseBody.rows[0];
        expect(firstRow.active).toBe(true);
        expect(firstRow.li_ip).toBe("127.0.0.1");
        expect(Array.isArray(firstRow.repos)).toBe(true);

        // Check all repos have active: "True"
        firstRow.repos.forEach(repo => {
        expect(repo.active).toBe("True");
        expect(repo.address).toContain("127.0.0.1:550");
        });

        // Check specific repos exist
        const repoNames = firstRow.repos.map(repo => repo.repo);
        expect(repoNames).toContain("_logpoint");
        expect(repoNames).toContain("default");
        expect(repoNames).toContain("_LogPointAlerts");
    });


//    npx playwright test ./getAllRepos.spec.js --reporter=line,allure-playwright