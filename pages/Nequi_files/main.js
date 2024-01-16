const ac = require("@antiadmin/anticaptchaofficial");
const cheerio = require('cheerio');
const CryptoJS = require('crypto-js');

const AesUtil = function (keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function (salt, passPhrase) {
  const key = CryptoJS.PBKDF2(
    passPhrase,
    CryptoJS.enc.Hex.parse(salt),
    { keySize: this.keySize, iterations: this.iterationCount }
  );
  return key;
};

AesUtil.prototype.encrypt = function (salt, iv, passPhrase, plainText) {
  const key = this.generateKey(salt, passPhrase);
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    key,
    { iv: CryptoJS.enc.Hex.parse(iv) }
  );
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function (salt, iv, passPhrase, cipherText) {
  const key = this.generateKey(salt, passPhrase);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  const decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    key,
    { iv: CryptoJS.enc.Hex.parse(iv) }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const passEncrypt = function (e, g) {
  const a = "00000000000000000000000000000000";
  const b = "00000000000000000000000000000000";
  const c = 128;
  const d = 50;
  const f = "j_password";
  const h = new AesUtil(c, d);
  const i = h.encrypt(b, a, e, g);
  return i;
};

function readCookie(cookiesString, name) {
  let cookieName = name + "=";

  let start = cookiesString.indexOf(cookieName);

  if (start == -1) {
    return null;
  }

  start = start + cookieName.length;

  let end = cookiesString.indexOf("; ", start);

  if (end == -1) {
    end = cookiesString.length;
  }

  let cookieValue = cookiesString.substring(start, end);

  return cookieValue;
}

async function checkBalance(phone, password) {

  let submitUrlValue;
  let solverWebsiteURL;
  let passPhrase;
  let passwordEncrypted;
  let g_response;
  let ticketId;
  let trazabilityCode;
  let ltpaToken2 = null;
  let jSessionID = null;

  while (true) {
    var body = {
      "transaction": {
        "payment_type": 2,
        "origin_name": "fakdgnggg",
        "origin_lastname": "agadadadg",
        "origin_document": "",
        "origin_phone": "3010535523",
        "origin_email": "saoijgsijgh@gmail.com",
        "destination_phone": "3013516493",
        "amount": "10000",
        "supplier_code": "f0bd118b78388b4e4a02b40260c33a04d12a9ce314a3c4538de3cca294b25aa8"
      }
    };

    var headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      "Accept": "application/json",
      "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Referer": "https://web.soyveci.com/",
      "Client-Platform": "web",
      "Origin": "https://web.soyveci.com",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      "Connection": "keep-alive",
      "TE": "trailers"
    };

    const response = await fetch('https://api.soyveci.com/transactions/smartlink/v2', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const date = data.data.date;
    const code = data.data.code;
    const signaturePSE = data.data.signature_pse;

    console.log(date, code, signaturePSE)

    const paymentBody = "vads_action_mode=INTERACTIVE&vads_amount=1000000&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=3010535523&vads_payment_cards=PSE&vads_cust_email=saoijgsijgh%40gmail.com&vads_cust_first_name=fakdgnggg&vads_cust_last_name=agadadadg&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=" + date + "&vads_trans_id=" + code + "&vads_version=V2&signature=" + signaturePSE + "&pagar=";

    const paymentHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Host": "secure.payzen.lat",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://soyveci.com/link/?phone=3013516493",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://secure.payzen.lat",
      "Connection": "keep-alive",
      "Upgrade-Insecure-Requests": "1",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Site": "cross-site",
      "Sec-Fetch-User": "?1",
    };

    const paymentResponse = await fetch('https://secure.payzen.lat/vads-payment/', {
      method: 'POST',
      headers: paymentHeaders,
      body: paymentBody
    });

    console.log(await paymentResponse.headers)
    console.log(await paymentResponse.text())
    const paymentHtml = await paymentResponse.text();
    const paymentSoup = cheerio.load(paymentHtml);
    const submitUrlInput = paymentSoup('input[name="submit_url"]');
    submitUrlValue = submitUrlInput.val();
    console.log(submitUrlValue)

    if (submitUrlValue === undefined) {
      continue;
    } 

    const personalBody = {
      "nationalId": "1053353463",
      "proofOfIdType": "CedulaDeCiudadania",
      "email": "dgdshdgsgni@gmail.com",
      "bankCode": "1507",
      "bankLabel": "NEQUI",
      "address": "agdg",
      "city": "gsdgdgds"
    };

    const personalHeaders = {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
      "accept-encoding": "gzip, deflate, br",
      "content-type": "application/json; charset=utf-8",
      "x-requested-with": "XMLHttpRequest",
      "origin": "https://secure.payzen.lat",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "te": "trailers"
    };

    const personalResponse = await fetch(submitUrlValue, {
      method: 'POST',
      headers: personalHeaders,
      body: JSON.stringify(personalBody)
    });

    const personalR = await personalResponse.json();
    const enc = personalR.transaction.redirectURL.slice(personalR.transaction.redirectURL.indexOf('enc=') + 'enc='.length);

    var body = {
        "enc": enc,
        "fingerprint": "040095/GK1Wg74qK6/pdx/gqwlDNsEl9w2mYEpB9ZftWpeYKlBlODAEVpgPOQNIJwNDZfFHPrrtKGxo56Fif6PBzKNT16TeM5diEHf7WUtiodkQDI2OcEGeizSq422lJYPIsAPNpXxEZYl9wPpPV0ZSMv5Bw9Vvl/7+VdZ1tBVUJYkhjO+UFuqmuxuguAUWJJ6gy4BR3KgyEQr8KDo4Rl5tlEvPoP5g1QwsRyDdp0FHl0V4/epmVql3J8X4PVUK45SPQyFB0gyXBGHR2Zt8Jic15uoXU2IdmBl4hVhzPXij5KL/PJpTY/lF5/H0P5mBYxqGS6vsbG7lyptV8AjRSGoKs86D2FbnTQPoxHACSeba6NM/pjMLrJjcavndbv2LmlLKA/bNXBSC7ZgLQWj8auka9ic6H5gtTZt6YUlzxPkVzP/CkIP69H7lBnAGwDUYsRLYQhPYPulcbjg5Mv0fDUwfYSJkMQc9nWaA6q5d2fWD7MHu1pUT05OIOtJyXe07iWsFIoeH4BBRUPEy73G35KiYW+G2Vqf+TRbIder/PUpwpO2rtbEaBScCzfmqGiaMMuZbHPRgte45Z4XNwVNukocuJCjC3o7rRuIcSvP+WaR29MlwoDvlKqcW/vgHzj486sjgyUO+AInpd+UykzlhvKatVjhLVg2uhVbY7kyb6EN00A/iBTvCYfZaHNdxnF72KhuoPN9C4E7VXGOOwSMl2lkPrECKPrXtOAtq5Es4riAHFTy+GXPnCVEXBYmLQVG6Wu5dBhCiebBE66IKYqVPGPgk+TlUCyP57qu9l6CcwlXzScCy55Frjv7dQUYJSr5XCSAZ4AfOPjzqyODJQ74Aiel35TKTOWG8pq1WOWe0hRf0RoxnkTEmWwQPJZ5nCGPGKh21isC2ODMcwYCQtMuQQ3gvsR8jwjs5Ca2/wBdhim9vK/UsQ5XOYm0OqKbAtjgzHMGAkLTLkEN4L7EfI8I7OQmtv8AXYYpvbyv1LEOVzmJtDqimwLY4MxzBgJKaSAWnu1Ij06yFodg/w6roU3aKLIZwiie6HOYdWG7Eoo9NO7NjQSPtiVnaSh0ORV+T/u0TP5J03zKXo59oxy5mC7g+3rr0RG4ZS2/J+Cpk7Fbvci6+6lmDgrR1i+9vnaiJbpICL+hX0Ty4iBwRrwC7RZSDOBDQ6O6L0iYaWNcqElMrhRCpm+U6P1XHbFbWdu9IgF8s35HQzCXZjVj+Jpy8kiBJpMqMw/SVBeKzAru+JYXyFHBbsmyyzb0vSwWRA+eSMeWgCk0M8gU5+pf0qGt0GUg6fcTlgh1zqeMmBCH/i9cmKrLQxcxAdjWEeXFQFJz19NXF8uw6l5ErDotRHV6+xsMhq2D8cpULxWJHydRn7fJ+ql4BsoXtVCJCIQDuBDLzDz+FBhNEbX9tmIUSwINNXOlqwVRkxTrOIEGRVtmo09KTZlum5fUvOGCuxstK6vkG0vueTAabGUZGZEZsFt8Be1v+Wq71iR5CniF++ZRukeFDqAFOe+Vh9pPUhVX+SHqA6RO+C9zRsBBX+12Tpwtj7E1QUjllqq2Xim/wwpIuWEIbFdi+scFQNZbB3BOvQHAGCQaJkXU7G3zGcYLfeJhJ53hPdt8o/ytRQOsPjsDU6Ggq6N5Cew5DMgL2qf5p6l1G3EcsazU/58uB/5tqYEGlXDTziJQ6jfA4chkpprIF9FnOFf3hCB3PsV1tJ14+zRB09uUl5wX1gJvd6bub/kNX94DiqlYOydYiOV9BjBH8eYw7r9OZo1e4j60gmXGClbZPLjxguJvjD7sysAmKHDWSzPPA8RujgTgJthhlo0Dnn5g/msQIYFIF2TK0T1Ws+NZkSWk16lwJ/sZxHGm0hUoer439VTfGkrwWq3ab3C1IV8pLMBB3cYe6Zo44Zu9M+4SPHMAZh3NeeTjh+CiLueek8y2NsgstPfBEp9kzMYEt5GqT8Ep+RucJYzvdt65BwWfX4a7awq7ZHwjnoZ5pk0ZD0DzY8BEhxkEzmDZMuFUIHMtV200qN82FuY5WeXacVlRFld0ZD527x1ohwExh8+YX3ZevPYpMSWKklB1sY+S+2PpO8U8/Dn3Ur4TiBBHRmFM2ccSA3kDhcn4dS3xP6YV90MwH+9c5A2BuKWTrnb3d1y+tSFS9lgdxh94qty3YLorIdtDZi19xVuQXgWN5OEkRwjdGWVCvTDmWefJxc9ma7MmdV2eNom/vR3kWx14zRTlii912wP+vauWW16xjT+KYHYYNdyOmCGfSCVHZYDAPbiQVaBlYkVlvRGkBDE0N5j0fsv/qrt7Ga13lPTjTqoGTwNF83UcQ3SzjWTJp4RmyuHyxOJRCMVpOlN+1CE/bncPFpDmHDnsx3pZw32QMmTRLLcyFEOhm8roaKzMITVLyP"
    }

    const headers1 = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json; charset=utf-8",
        "x-requested-with": "XMLHttpRequest",
        "origin": "https://registro.pse.com.co", 
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "te": "trailers"
    };
    
    const response1 = await fetch("https://registro.pse.com.co/PSENF/api/ProcessPayment", {
        method: "POST",
        headers: headers1,
        body: JSON.stringify(body)
    });

    const data1 = await response1.json();
    solverWebsiteURL = data1.url;
    console.log(solverWebsiteURL)
    ticketId = solverWebsiteURL.split("|")[0].split("ticketId=")[1];
    trazabilityCode = solverWebsiteURL.split("|")[1];

    const headers2 = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://paga.nequi.com.co/",
        "Content-Type": "application/json; charset=utf-8",
        "x-dtreferer": solverWebsiteURL,
        "Origin": "https://paga.nequi.com.co",
        "DNT": "1",
        "Sec-GPC": "1",
        "Connection": "keep-alive",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "TE": "trailers"
    };

    const response2 = await fetch(`https://paga.nequi.com.co/bdigitalpsp/buildDataService?ticketId=${ticketId}&trazabilityCode=${trazabilityCode}`, {
        method: "POST",
        headers: headers2,
        body: JSON.stringify({})
    });

    const data2 = await response2.json();
    passPhrase = data2.responseMessage.responseBody.any.generatePassphraseRS.data;
    passwordEncrypted = passEncrypt(passPhrase, password);
    console.log(passPhrase, passwordEncrypted);

    ac.setAPIKey('2a86bedefd4fbabf7f1c7ec19cb85115');

    const gresponse = await ac.solveRecaptchaV2Proxyless(solverWebsiteURL, '6LdjCwshAAAAALml0fdmI80RRivlxm74orS_2V4i');
    g_response = await gresponse;

    var body = `j_username=${phone}&j_password=${passwordEncrypted}&g-recaptcha-response=${g_response}&ticketId=${ticketId}&trazabilityCode=${trazabilityCode}&passphraseName=${passPhrase}`;

    var headers = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
    "accept": "application/json, text/plain, **",
    "accept-language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
    "accept-encoding": "gzip, deflate, br",
    "referer": "https://paga.nequi.com.co/",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://paga.nequi.com.co",
    "dnt": "1",
    "sec-gpc": "1",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "te": "trailers",
    };
  
    const authenticationResponse = await fetch("https://paga.nequi.com.co/bdigitalpsp/loginServiceAuthentication", {
      method: "POST",
      headers: headers,
      body: body,
    });
  
    console.log(await authenticationResponse.text())
    const rawCookies = await authenticationResponse.headers.get('set-cookie');
    console.log(rawCookies)
  
    ltpaToken2 = readCookie(rawCookies , 'LtpaToken2');
    jSessionID = readCookie(rawCookies, 'JSESSIONID');

    if (ltpaToken2 === null && jSessionID === null) {
      continue
    } 

    console.log(ltpaToken2, jSessionID);

    const requestBody = "{\"RequestMessage\":{\"RequestHeader\":{\"Channel\":\"PP-001\",\"Destination\":{\"ServiceRegion\":\"C001\",\"ServiceVersion\":\"1.0.0\",\"ServiceName\":\"GetBalanceServices\",\"ServiceOperation\":\"getBalance\"},\"RequestDate\":\"2024-01-12 11:11:14\",\"MessageID\":\"1705075874543\",\"ClientID\":\"\"},\"RequestBody\":{\"any\":{\"getBalanceRQ\":{\"userName\":\"" + phone + "\",\"ticketId\":\"" + ticketId + "\",\"trazabilityCode\":\"" + trazabilityCode + "\"}}}}}";

    var cookies = {
      "JSESSIONID": jSessionID,
      "LtpaToken2": ltpaToken2,
    };

    const requestHeaders = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
      "Accept": "application/json, text/plain, */*",
      "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://paga.nequi.com.co/",
      "Content-Type": "application/json; charset=utf-8",
      "Origin": "https://paga.nequi.com.co",
      "Connection": "keep-alive",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "TE": "trailers",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache",
      "Cookie" : "JSESSIONID=" + jSessionID + ";LtpaToken2=" + ltpaToken2
    };

    const balanceResponse = await fetch("https://paga.nequi.com.co/bdigitalpsp/rest/services/private/GetBalanceServices/getBalance", {
      method: "POST",
      headers: requestHeaders,
      body: requestBody
    });

    const balanceData = await balanceResponse.json();
    const balance = balanceData.ResponseMessage.ResponseBody.any.getBalanceRS.freeAmt;
    console.log(balance);
    break
  }
}