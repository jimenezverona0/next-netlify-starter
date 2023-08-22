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

  const response4 = await fetch("https://registro.pse.com.co/PSEUserRegister/api/GetPreferences", {
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
  const cookies = parseCookies(setCookieHeader);

  return res.end(JSON.stringify({'link': redirectURL, 'cookies': cookies}));
}

export default handler;
