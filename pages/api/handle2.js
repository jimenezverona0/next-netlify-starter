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

function buildAuthHeader(httpMethod, url) {
    
    const jsonPayload = '';
    const key = "rUjoHeypjS";
    const secret = "03c7eb7284738312de8c4fc7509ab65d";
    const urlComponents = new URL(url);
    let requestPath = urlComponents.pathname;
    if (urlComponents.search !== '') {
        requestPath += '?' + urlComponents.search;
    }
    const nonce = Date.now();
    const msgConcat = nonce + httpMethod.toUpperCase() + requestPath + jsonPayload;
    const hmac = require('crypto').createHmac('sha256', utf8ToBuffer(secret));
    hmac.update(utf8ToBuffer(msgConcat));
    const signature = hmac.digest('hex');
    return {
        'Authorization': `Bitso ${key}:${nonce}:${signature}`
    };
}

function utf8ToBuffer(str) {
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i);
    }
    return buffer;
}

const handler = async (req, res) => {

  var cellphone = numgenerator()
  var email = namegenerator() + "@gmail.com"
  var firstName = namegenerator()
  var lastName = namegenerator()
  var amount = req.body.amount;
  var bank = req.body.bank;

  const httpMethod = 'GET';
  const url = 'https://bitso.com/api/v3/funding_references?currency=cop&network=pse&protocol=pse&asset=cop&amount=' + amount;
  const authHeader = buildAuthHeader(httpMethod, url);

  return res.end(JSON.stringify({'link': authHeader}));
}

export default handler;
