# De-centralized Crowdfunding - React Redux App

## Get Started

Step1. Follow the instructions to clone and run up ```dropwizard-seed```:
[Gitlab link for dropwizard-seed](https://gitlab.com/pago-solutions/dropwizard-seed)

Step2. Follow the instructions to clone and run up transactiongateway: 
[Gitlab link for transactiongateway](https://gitlab.com/pago-solutions/transaction-gateway)

Step3. Clone the app by:

```
git clone https://github.com/kacerchen/de-crowdfounding
```

Step4. (Optional) If you don't have node yet, install it from: [Here](https://nodejs.org/en/)

Step5. (Optional) If you don't have yarn yet, install it from: [Here](https://classic.yarnpkg.com/en/docs/install)

Step6. Clone proxy by:

```
git clone https://github.com/kacerchen/local-proxy-decrowdfunding
```

Step7. Install dependencies for proxy by:

```
npm i express cors node-fetch body-parser
```

Step8. Install dependencies for app by:

```
yarn
```

Step9. Run up proxy by:

```
cd local-proxy

node proxy-server.js
```

Step10. Run local-cors-proxy in another terminal by: 

```
lcp --proxyUrl http://localhost:7000
```

Step11. Run up the app: (Will take few mins to start)

```
yarn start
```

