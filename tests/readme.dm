
*************** if the allure report is not installed on the machine then install it***********************
(base) ➜  Allure Report npm install -D allure-playwright 
(base) ➜  Allure Report npm install -g allure-commandline


************ Set up Test Data *************
1) There is a Info.json inside testdata
2) The test data regarding jwt token and Alert Name need to be updated there if needed


***************************** How to RUN test for New Alert API with single file*********************************
npx playwright test ./CRUD_AlertRules_Final.spec.js --reporter=line,allure-playwright
npx playwright test ./getAllRepos.spec.js --reporter=line,allure-playwright


******************* How to Run test at once***************************
npx playwright test ./CRUD_AlertRules_Final.spec.js ./getAllRepos.spec.js --reporter=line,allure-playwright  //this is to run onnly selected test cases from project
npx playwright test --reporter=line,allure-playwright    //this is to run all the test cases from the project


************ Clean OR remove old report and generate report************
***  Before running test****
rm -rf allure-results   //remove old data from report


**** After Running test****
npx allure generate ./allure-results --clean     ///Generates a fresh HTML report based on the new results.
npx allure open ./allure-report



npx allure generate ./allure-results --clean 