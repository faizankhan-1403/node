

const express = require('express');
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

app.use(cors()) ;
const CryptoJS=require('crypto-js');
const { json } = require('body-parser');
app.use(bodyParser.json()); //to handle json data
const baseUrl='https://api.halfpricebazar.com';




    // code for server to handle post request 
    router.post(/.*/, (req, res) => {
        const methodType=req.method.toLowerCase();
         const originalUrl=req.originalUrl;
         console.log(methodType);
         console.log(originalUrl);
         let payload=decryptUsingAES256(req.body.key);
         console.log(payload);
         const config={
              headers : {
              'content-type': 'application/json'
            }
          };
            axios(
                {
                  url: baseUrl+originalUrl,
                  method: methodType,
                  headers :config.headers,
                  data: payload,
                })
            .then(function (response) {
              console.log("post request response is:"+typeof(response.data));
              let data_to_encrypt=response.data;
               let encrypted_response=encryptUsingAES256(data_to_encrypt);
               console.log(encrypted_response);
               response.data={"key":encrypted_response};
               res.setHeader('content-type', 'application/json');
              console.log(typeof(response.data));
              res.send(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
      
  });

  // code for server to handle get request 
  router.get(/.*/, (req, res) => {
    const methodType=req.method.toLowerCase();
     const originalUrl=req.originalUrl;
     console.log(methodType);
     console.log(originalUrl);
     let payload=req.body;
     console.log(payload);
     const config={
          headers : {
          'content-type': 'application/json'
        }
      };
        axios(
            {
              url: baseUrl+originalUrl,
              method: methodType,
              headers :config.headers,
              data: payload,
            })
        .then(function (response) {
          console.log("get request response is:"+JSON.stringify(response.data));
          let data_to_encrypt=response.data;
           let encrypted_response=encryptUsingAES256(data_to_encrypt);
           console.log(encrypted_response);
           response.data={"key":encrypted_response};
           res.setHeader('content-type', 'application/json');
          console.log(typeof(response.data));
          res.send(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
  
});

// code for server to handle put request 
router.put(/.*/, (req, res) => {
  const methodType=req.method.toLowerCase();
   const originalUrl=req.originalUrl;
   console.log(methodType);
   console.log(originalUrl);
   let payload=decryptUsingAES256(req.body.key);
   console.log(payload);
   const config={
        headers : {
        'content-type': 'application/json'
      }
    };
      axios(
          {
            url: baseUrl+originalUrl,
            method: methodType,
            headers :config.headers,
            data: payload,
          })
      .then(function (response) {
        console.log("put request response is:"+typeof(response.data));
        let data_to_encrypt=response.data;
         let encrypted_response=encryptUsingAES256(data_to_encrypt);
         console.log(encrypted_response);
         response.data={"key":encrypted_response};
         res.setHeader('content-type', 'application/json');
        console.log(typeof(response.data));
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

});

// code for server to handle patch request 
router.patch(/.*/, (req, res) => {
  const methodType=req.method.toLowerCase();
   const originalUrl=req.originalUrl;
   console.log(methodType);
   console.log(originalUrl);
   let payload=decryptUsingAES256(req.body.key);
   console.log(payload);
   const config={
        headers : {
        'content-type': 'application/json'
      }
    };
      axios(
          {
            url: baseUrl+originalUrl,
            method: methodType,
            headers :config.headers,
            data: payload,
          })
      .then(function (response) {
        console.log("patch request response is:"+typeof(response.data));
        let data_to_encrypt=response.data;
         let encrypted_response=encryptUsingAES256(data_to_encrypt);
         console.log(encrypted_response);
         response.data={"key":encrypted_response};
         res.setHeader('content-type', 'application/json');
        console.log(typeof(response.data));
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

});

router.delete(/.*/, (req, res) => {
  const methodType=req.method.toLowerCase();
   const originalUrl=req.originalUrl;
   console.log(methodType);
   console.log(originalUrl);
   let payload=req.body;
   console.log(payload);
   const config={
        headers : {
        'content-type': 'application/json'
      }
    };
      axios(
          {
            url: baseUrl+originalUrl,
            method: methodType,
            headers :config.headers,
            data: payload,
          })
      .then(function (response) {
        console.log("delete request response is:"+typeof(response.data));
        let data_to_encrypt=response.data;
         let encrypted_response=encryptUsingAES256(data_to_encrypt);
         console.log(encrypted_response);
         response.data={"key":encrypted_response};
         res.setHeader('content-type', 'application/json');
        console.log(typeof(response.data));
        res.send(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

});
   function decryptUsingAES256(encrypted_data){
      console.log("encrypted data in decrpt func"+encrypted_data);
      const _key = CryptoJS.enc.Utf8.parse("0123456789123456");
      const _iv = CryptoJS.enc.Utf8.parse("0123456789123456");
    
        let decrypted = CryptoJS.AES.decrypt(
          encrypted_data, _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
          });
          let decrypted_data=decrypted.toString(CryptoJS.enc.Utf8);
          console.log("decrypted data is"+decrypted_data);
          return decrypted_data;
      }

    function encryptUsingAES256(data_to_encrypt){

        const _key = CryptoJS.enc.Utf8.parse("0123456789123456");
         const _iv = CryptoJS.enc.Utf8.parse("0123456789123456");
          // let _key = this._key;
          // let _iv = this._iv;
          let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(data_to_encrypt), _key, {
              keySize: 16,
              iv: _iv,
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7
            });
            encrypted_data=encrypted.toString();
            console.log(encrypted_data);
          return encrypted_data;
        }

  module.exports=router;