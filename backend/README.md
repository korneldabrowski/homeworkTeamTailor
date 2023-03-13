## The node.js example app


The app demonstrates how to connect to TeamTailor API 

## Created on

* Node 19.5


## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/korneldabrowski/homeworkTeamTailor/tree/master/backend
cd homeworkTeamTailor
cd backend
```

```bash
npm install
```

## Steps for authentication


Step 1: Open `.env` file and inject your credentials so it looks like this

```
BEARER_TOKEN=<YOUR_KEY>
API_VERSION=20210218
```

To start the express server, run the following

```bash
node server
```

