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

  const variantID = req.body.variantID;

  var cellphone = numgenerator()
  var email = namegenerator() + "@gmail.com"
  var firstName = namegenerator()
  var lastName = namegenerator()
  var amount = "50000"
  var bank = "nequi"
  
  const response1 = await fetch("https://api.soyveci.com/transactions/smartlink/v2", {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/json;charset=utf-8",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site"
        },
        "referrer": "https://soyveci.com/link/?phone=3207625047",
        "body": "{\"transaction\":{\"payment_type\":2,\"origin_name\":\"" + firstName + "\",\"origin_lastname\":\"" + lastName + "\",\"origin_document\":\"\",\"origin_phone\":\"" + cellphone + "\",\"origin_email\":\"" + email + "\",\"destination_phone\":\"3207625047\",\"amount\":\"" + amount + "\",\"supplier_code\":\"f0bd118b78388b4e4a02b40260c33a04d12a9ce314a3c4538de3cca294b25aa8\"}}",
        "method": "POST",
        "mode": "cors"
    });
    
  const statusCode = response1.status;
  const data1 = await response1.json();
  const transDate = data1['data']['date']
  const transID = data1['data']['code']
  const signature = data1['data']['signature_pse']

  return res.end(JSON.stringify({'result': data1}));
}

export default handler;
