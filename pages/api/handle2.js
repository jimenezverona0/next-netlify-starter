function namegenerator() {
    var lowercase = 'abcdefghijklmnopqrstuvwxyz';

    var namebase = lowercase;
    var namelength = 15;

    var samplename = getRandomSample(namebase, namelength);
    var name = samplename.join('');
    return name;
}

function numgenerator() {
    var nums = '0123456789';

    var numbase = nums;
    var numlength = 8;

    var samplenum = getRandomSample(numbase, numlength);
    var halfnum = samplenum.join('');
    var num = "31" + halfnum;
    return num;
}

function getRandomSample(base, length) {
    var sample = [];
    while (sample.length < length) {
        var randomIndex = Math.floor(Math.random() * base.length);
        var randomElement = base.charAt(randomIndex);
        if (!sample.includes(randomElement)) {
            sample.push(randomElement);
        }
    }
    return sample;
}

const handler = async (req, res) => {

  var cellphone = numgenerator()
  var email = namegenerator() + "@gmail.com"
  var firstName = namegenerator()
  var lastName = namegenerator()
  var amount = req.body.amount;
  var bank = req.body.bank;
  var api = req.body.auth;
  
  const response1 = await fetch("https://bitso.com/api/v3/funding_references?currency=cop&network=pse&protocol=pse&asset=cop&amount=" + amount, {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            'Authorization': api,
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'es',
            'bts-client-method': 'conversion',
            'bts-client-name': 'bitbank-wallet-web',
            'bts-client-platform': 'web',
            'bts-client-version': 'local',
            'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': 'Android',
            'sec-fetch-dest': 'empty',
            'sec-fetch-site': 'same-origin'
        },
        "referrer": "https://bitso.com/wallet/fund",
        "method": "GET",
        "mode": "cors"
    });
    
  const statusCode1 = response1.status;
  const data1 = await response1.json();
  const url = data1['payload']['url']
  const keyword = 'payments-continue/';
  const startIndex = url.indexOf(keyword) + keyword.length;
  const token = url.substring(startIndex);

  const response2 = await fetch('https://pay.dlocal.com/gmf-apm/sale-continue', {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Content-Type": "application/json;charset=utf-8",
            'X-IdMerchant':'50765'
        },
        "body": "{\"token\":\"" + token + "\",\"bank\":\"" + bank + "\",\"view\":\"BANK_SELECTION\"}",        
        "method": "POST",
        "mode": "cors"
    });

  const statusCode2 = response2.status;
  const data2 = await response2.text();
  let url2 = data2.substring(
      data2.indexOf('"redirect_url":"') + '"redirect_url":"'.length,
      data2.indexOf('"', data2.indexOf('"redirect_url":"') + '"redirect_url":"'.length)
    );
  const keyword2 = 'payments-redirect/';
  const startIndex2 = url2.indexOf(keyword2) + keyword2.length;
  const token2 = url2.substring(startIndex2);

  const response3 = await fetch('https://pay.dlocal.com/gmf-apm/redirect-payment', {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1"
        },
        "referrer": 'https://pay.dlocal.com/gmf-apm/payments-continue/'+ token,
        "body": "url=https%3A%2F%2Fpay.dlocal.com%2Fgmf-apm%2Fpayments-redirect%2F" + token2,        
        "method": "POST",
        "mode": "cors"
    });

  const statusCode3 = response3.status;
  const data3 = await response3.text();
  const redirectURL = response3.url;

  let enc = redirectURL.substring(redirectURL.indexOf('?enc=') + '?enc='.length, redirectURL.length);
  const idNumber2 = numgenerator()
  const firstName2 = namegenerator()
  const lastName2 = namegenerator()
  const cellphone2 = numgenerator()
  const email2 = namegenerator() + "@gmail.com"

  const response4 = await fetch("https://registro.pse.com.co/PSEUserRegister/", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "host":"registro.pse.com.co"
        },
        "method": "GET",
        "mode": "cors"
    });

  const setCookieHeader = response4.headers.get('set-cookie');

  function parseCookies(cookieHeader) {
      if (!cookieHeader) {
        return [];
      }
    
      const cookieList = cookieHeader.split(';');
      const cookies1 = cookieList.map(cookie => cookie.trim());
    
      return cookies1;
    }
    
  const cookies1 = parseCookies(setCookieHeader);
  let cookieString = "";
  for (var i = 0; i < cookies1.length; i++) {
      if (cookies1[i].includes("incap_ses")) {
          cookieString = cookies1[i];
          break;
      }
  }
    
  const cookieParts = cookieString.split(", ");
  const cookiee = cookieParts[1].split("=");
  const cookieName = cookiee[0];
  const cookieValue = cookiee[1] + "==";

  const response5 = await fetch("https://registro.pse.com.co/PSEUserRegister/api/GetPreferences", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Cookie": cookieName + "=" + cookieValue + "; nlbi_2657265=i0UpHjcXVUx1yy/tfuLGlwAAAABHqnXqW4vYx1ElXd3/sMph; visid_incap_2657265=NdOeD68VTtu+8Sv5ILXN91+R3GMAAAAAQUIPAAAAAABWklb5+hVFz29ZL8dgftq/; ASP.NET_SessionId=x5ot1rr1011uojwhdhvfq3jg; NSC_JO1udydjd51xpvseule25sdhrj30de2=ffffffffaf18880f45525d5f4f58455e445a4a42378b"
        },
        "body": "{\"page\":\"create\",\"enc\":\"\"}",
        "method": "POST",
        "mode": "cors"
    });

    const statusCode5 = response5.status;
    const data5 = await response5.text();
    const csrfToken = data5.substring(
      data5.indexOf('"CSRFToken\\":\\"') + ('"CSRFToken\\":\\"').length,
      data5.indexOf('\\"', data5.indexOf('"CSRFToken\\":\\"') + ('"CSRFToken\\":\\"').length)
    );

    const response6 = await fetch("https://registro.pse.com.co/PSEUserRegister/api/ReturnToPayment", {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json; charset=utf-8",
            "CSRFToken": csrfToken,
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Cookie": cookieName + "=" + cookieValue + "; nlbi_2657265=i0UpHjcXVUx1yy/tfuLGlwAAAABHqnXqW4vYx1ElXd3/sMph; visid_incap_2657265=NdOeD68VTtu+8Sv5ILXN91+R3GMAAAAAQUIPAAAAAABWklb5+hVFz29ZL8dgftq/; ASP.NET_SessionId=x5ot1rr1011uojwhdhvfq3jg; NSC_JO1udydjd51xpvseule25sdhrj30de2=ffffffffaf18880f45525d5f4f58455e445a4a42378b"
        },
        "body": "{\"enc\":\"" + enc + "\",\"fingerprint\":\"{\\\"Summary\\\":{\\\"Platform\\\":\\\"Win32\\\",\\\"Screen_Resolution\\\":\\\"YwKdynV7j2T2ht1bMdylNiS5\\\",\\\"Client_Timestamp\\\":\\\"2023-06-18T21:47:32.836Z\\\",\\\"Host\\\":\\\"https://registro.pse.com.co/PSEUserRegister/CreateRegister.htm?enc=tnPcJHMKlSnmRpHM8fAbu5bPwHg0UPqwvgeeTIPGRYjVIQDhuGfQkl4r6sWBaxv3&Mode=Volver&TipoPersona=0\\\",\\\"IP\\\":\\\"OAN0fnV7j2QW7so7tQcm+XHRbHkm\\\"},\\\"JSData\\\":{\\\"UserAgent\\\":\\\"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0\\\",\\\"AppName\\\":\\\"Netscape\\\",\\\"AppCodeName\\\":\\\"Mozilla\\\",\\\"AppVersion\\\":\\\"5.0 (Windows)\\\",\\\"BuildID\\\":\\\"20181001000000\\\",\\\"OSCPU\\\":\\\"Windows NT 10.0; Win64; x64\\\",\\\"Product\\\":\\\"Gecko\\\",\\\"ProductSub\\\":\\\"20100101\\\",\\\"Vendor\\\":\\\"\\\",\\\"Language\\\":\\\"es-ES\\\",\\\"Java\\\":false,\\\"Geolocation\\\":\\\"true\\\",\\\"Cookies\\\":true,\\\"WebStorage\\\":\\\"true\\\"},\\\"NavigatorPluginList\\\":[{\\\"Name\\\":\\\"PDF Viewer\\\",\\\"Description\\\":\\\"Portable Document Format\\\",\\\"Version\\\":\\\"\\\",\\\"Filename\\\":\\\"internal-pdf-viewer\\\"},{\\\"Name\\\":\\\"Chrome PDF Viewer\\\",\\\"Description\\\":\\\"Portable Document Format\\\",\\\"Version\\\":\\\"\\\",\\\"Filename\\\":\\\"internal-pdf-viewer\\\"},{\\\"Name\\\":\\\"Chromium PDF Viewer\\\",\\\"Description\\\":\\\"Portable Document Format\\\",\\\"Version\\\":\\\"\\\",\\\"Filename\\\":\\\"internal-pdf-viewer\\\"},{\\\"Name\\\":\\\"Microsoft Edge PDF Viewer\\\",\\\"Description\\\":\\\"Portable Document Format\\\",\\\"Version\\\":\\\"\\\",\\\"Filename\\\":\\\"internal-pdf-viewer\\\"},{\\\"Name\\\":\\\"WebKit built-in PDF\\\",\\\"Description\\\":\\\"Portable Document Format\\\",\\\"Version\\\":\\\"\\\",\\\"Filename\\\":\\\"internal-pdf-viewer\\\"}],\\\"FPD\\\":{\\\"Id\\\":\\\"a59952db924ebe08e740c4e5af191bde6d1ed9e16dd94dbea1bcf538c4069327\\\"},\\\"Geolocation\\\":{\\\"Continent\\\":\\\"\\\",\\\"Country\\\":\\\"OAMK8XV7j2S3oHVAz5aPJg==\\\",\\\"Region\\\":\\\"OQMfSXV7j2Tw5HQ=\\\",\\\"City\\\":\\\"OQPI4nV7j2RcrKInRLXRR/ZLnzg=\\\",\\\"Time_Zone\\\":\\\"OQPu3HV7j2RUvQHkMT9cS3MsWYD6BQ==\\\",\\\"ISP\\\":\\\"OgMYfnV7j2Qx2GJxRxGPSZgBPzwdPcbCxvF6uw==\\\",\\\"Latitude\\\":\\\"OQPqUHV7j2TeOTcXp+4K\\\",\\\"Longitude\\\":\\\"OQPJXHV7j2Swlk8D+XsDng==\\\"}}\",\"personType\":\"0\",\"ddTipoIdentificacion\":\"13\",\"txtNumeroIdentificacion\":\"" + idNumber2 + "\",\"txtNombre\":\"salfjnsaofn safjosoaifjsf\",\"txtNumeroCelular\":\"" + cellphone2 + "\",\"txtDireccion\":\"skjjkasbfjksfas\",\"txtEMail\":\"" + email2 + "\",\"ddPregunta1\":\"16\",\"txtRespuestaPregunta1\":\"fsgfhshffahaf\",\"chkDisclaimer\":true,\"chkDisclaimer2\":true,\"chkDisclaimer3\":true,\"txtLogin\":\"\",\"txtPassword\":\"\"}",
        "method": "POST",
        "mode": "cors"
    });

    const statusCode6 = response6.status;
    const data6 = await response6.text();
    let PSELink = data6.substring(
      data6.indexOf('"URL\\":\\"') + ('"URL\\":\\"').length,
      data6.indexOf('\\"', data6.indexOf('"URL\\":\\"') + ('"URL\\":\\"').length)
    );

    const response7 = await fetch("http://bitly.ws/create.php?url=" + PSELink, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Upgrade-Insecure-Requests": "1"
        },
        "referrer": "http://bitly.ws/",
        "method": "GET",
        "mode": "cors"
    });

    const statusCode7 = response7.status;
    const data7 = await response7.text();
    let link = data7.substring(
      data7.indexOf('<div id="clip-text" style="padding-top: 15px; padding-bottom: 20px; font-style: bold; font-size: 24px;" class="text-created"><b>') + '<div id="clip-text" style="padding-top: 15px; padding-bottom: 20px; font-style: bold; font-size: 24px;" class="text-created"><b>'.length,
      data7.indexOf('</b></div>', data7.indexOf('<div id="clip-text" style="padding-top: 15px; padding-bottom: 20px; font-style: bold; font-size: 24px;" class="text-created"><b>') + '<div id="clip-text" style="padding-top: 15px; padding-bottom: 20px; font-style: bold; font-size: 24px;" class="text-created"><b>'.length)
    );

  return res.end(JSON.stringify({'link': link}));
}

export default handler;
