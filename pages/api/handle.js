const handler = async (req, res) => {

  const variantID = req.body.variantID;

  const method = 'POST';
  
  const options = {
    method: method,
    headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
          "Content-Type": "application/json;charset=utf-8",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site"
      },
    body: "{\"transaction\":{\"payment_type\":2,\"origin_name\":\"dgshafhs\",\"origin_lastname\":\"hshfh\",\"origin_document\":\"\",\"origin_phone\":\"3103957283\",\"origin_email\":\"gustosafyo@gufum.com\",\"destination_phone\":\"3207625047\",\"amount\":\"50000\",\"supplier_code\":\"f0bd118b78388b4e4a02b40260c33a04d12a9ce314a3c4538de3cca294b25aa8\"}}"
  }

  const url = "https://api.soyveci.com/transactions/smartlink/v2";

  const response = await fetch(url, options);
  const data = await response.json();

  return res.end(JSON.stringify({'result': data}));
}

export default handler;
