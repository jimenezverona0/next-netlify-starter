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
  
  return res.end(JSON.stringify({'data2': data2}));
}

export default handler;
