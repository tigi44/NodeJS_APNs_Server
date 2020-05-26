# NodeJS APNs Server

## FEATURE
- [NodeJS](https://nodejs.org)
- [express](https://www.npmjs.com/package/express)
- [node-apn](https://www.npmjs.com/package/apn)

## INSTALL
```shell
$ npm install
```

## START
- development

```shell
$ npm run dev
```
- production

```shell
$ npm run start
```

## SETTING Push Certification

```js
// sendApns.js
...
options : {
    cert: './apns/keys/cert.pem',
    key: './apns/keys/key.pem'
}
...
```

## SEND Push
- input appID
- input device token
- select production
- validate push contents json

![Image](./images/index.png)
