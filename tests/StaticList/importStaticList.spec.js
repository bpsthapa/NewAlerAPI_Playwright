const { test, expect, request } = require('@playwright/test');
//This read data and loads the .json file as a JavaScript object.
//const data=JSON.parse(JSON.stringify(require("../../testData/BasicData.json")));
const data=JSON.parse(JSON.stringify(require("../../testData/Info.json")));
import fs from 'fs';

const baseURL = data.baseUrl;
const write_token = data.write_token;

test('import list with file upload', async ({ request }) => {
  const filePath = './testFiles/10StaticList.csv';
  const fileBuffer = fs.readFileSync(filePath);

  const num=getRandomInt(0, 100000)
  const str="StaticListAutomation_"
  const listname = str + num;
  console.log(listname)

  const response = await request.post(`${baseURL}/UserDefinedList/import_api`, {
    headers: {
        'Authorization': `Bearer ${write_token}`
    },
    multipart: {
      package_import_name: listname,
      package_import: {
        name: '10StaticList.csv',
        mimeType: 'text/csv',
        buffer: fileBuffer
      }
    },
    ignoreHTTPSErrors: true
  });

  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.success).toBe(true);
  expect(responseBody.message).toBe("userdefinedlist imported successfully");

});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
