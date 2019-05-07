# Offline testing

## MongoDB

To test the service offline, first run `docker-compose -f mongo-stack.yml up` at the base `poker-api` root.

This will expose port `27017` on your local machine to interface with MongoDB.

All data and diagnostic logs will be outputted to the `data` directory at the same level.
  
## Services

In the service directory you want to test, run `yarn run offline` or `sls offline --stage local`. This will run the service locally. You can interface with the service by sending requests to `localhost:3000` with the appropriate service path and method desired.