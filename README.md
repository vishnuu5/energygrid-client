# EnergyGrid Data Aggregator Client

This is a Node.js client application that fetches telemetry data for 500 solar inverters from a rate-limited API.

## Features

- Strict 1 request per second handling
- Batch size limited to 10 devices per request
- MD5-based request signing
- Automatic retry on HTTP 429
- Aggregates results into a single output

## How to Run

1. Start the mock API server:

```bash
cd mock-api
npm install
npm start
```

2. Start the energygrid-client server

```bash
cd energygrid-client
npm install
npm start
```

## GitHub Link

[View Link](https://github.com/vishnuu5/energygrid-client.git)
