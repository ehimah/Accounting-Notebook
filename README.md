#Accounting Notebook

Accounting Notebook Rest API which tracks money flow of a single user.

To run 

1. Install the app package dependencies by running `yarn` in a command shell

2. Run `yarn start` to start the application server on the local server

## Commands

Running locally:

Clone the repo:
```bash
git clone https://github.com/ehimah/accounting-notebook.git
cd accounting-notebook
```

```bash
#install project dependencies
yarn

#then this to run the project
yarn start
```

Testing:

```bash
# run all tests
yarn test
```
Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix
```

## Using Postman

A sample Postman collection has also been included in the solution.
 locat the file `Accounting Notebook.postman_collection.json` in the project root and import into postman to test the endpoints


 ### API Endpoints

List of available routes:
**User routes**:\
`POST /transactions` - create a transaction\
`GET /transactions` - get all transactions\
`GET /transactions/:id` - get transactions by id\
`GET /accounts/balance` - get current account balance\