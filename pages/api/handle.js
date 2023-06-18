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
  
  const response2 = await fetch("https://secure.payzen.lat/vads-payment/", {
      "credentials": "include",
      "headers": {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
          "Content-Type": "application/x-www-form-urlencoded",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-User": "?1",
          "Pragma": "no-cache",
          "Cache-Control": "no-cache"
      },
      "referrer": "https://soyveci.com/link/?phone=3207625047",
      "body": "vads_action_mode=INTERACTIVE&vads_amount=" + amount + "00&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=" + cellphone + "&vads_payment_cards=PSE&vads_cust_email=" + email + "&vads_cust_first_name=" + firstName + "&vads_cust_last_name=" + lastName + "&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=" + transDate + "&vads_trans_id=" + transID + "&vads_version=V2&signature="+ signature +"&pagar=",
      "method": "POST",
      "mode": "cors"
  });

  const statusCode2 = response2.status;
  const data2 = await response2.text();
  let paymentID = data2.substring(
      data2.indexOf('<input type="hidden" name="submit_url" value="https://secure.payzen.lat:443/checkout/v3/web/PSE-a729d3a0-5d33-4c28-8acd-393f4fd4ee33/webpayments/') + '<input type="hidden" name="submit_url" value="https://secure.payzen.lat:443/checkout/v3/web/PSE-a729d3a0-5d33-4c28-8acd-393f4fd4ee33/webpayments/'.length,
      data2.indexOf('/', data2.indexOf('<input type="hidden" name="submit_url" value="https://secure.payzen.lat:443/checkout/v3/web/PSE-a729d3a0-5d33-4c28-8acd-393f4fd4ee33/webpayments/') + '<input type="hidden" name="submit_url" value="https://secure.payzen.lat:443/checkout/v3/web/PSE-a729d3a0-5d33-4c28-8acd-393f4fd4ee33/webpayments/'.length)
    );

  let urlPost = 'https://secure.payzen.lat/checkout/v3/web/PSE-a729d3a0-5d33-4c28-8acd-393f4fd4ee33/webpayments/' + paymentID + '/submit';
  let idNumber = numgenerator();

  const response3 = await fetch(urlPost, {
        "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
            "Accept": "text/plain, */*; q=0.01",
            "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "Referer": "https://soyveci.com/",
            "Origin": "https://soyveci.com"
        },
        "body": "bank=" + bank + "&person_type=PHYSICAL&proof_of_id_type=CITIZENSHIP_CARD&proof_of_id_number=" + idNumber + "&person_name=" + firstName + "+" + lastName + "&phone_number=" + cellphone + "&email=" + email + "&raw_locale=es",
        "method": "POST",
        "mode": "cors"
    });
    
    const statusCode3 = response3.status;
    const data3 = await response3.text();
    let enc = data3.substring(data3.indexOf('?enc=') + '?enc='.length, data3.length);
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
    
    function parseCookies(cookieHeader) {
      if (!cookieHeader) {
        return [];
      }
    
      const cookieList = cookieHeader.split(';');
      const cookies1 = cookieList.map(cookie => cookie.trim());
    
      return cookies1;
    }

    const cookieString = cookies[13];
    const cookieParts = cookieString.split(", ");
    const cookie = cookieParts[1].split("=");
    const cookieName = cookie[0];
    const cookieValue = cookie[1];

  return res.end(JSON.stringify({'urlPost': urlPost, 'data3': data3, 'cookies': cookies, 'cookieName': cookieName, 'cookieValue': cookieValue}));
}

export default handler;
