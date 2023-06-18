const handler = async (req, res) => {

  const variantID = req.body.variantID;

  const method = 'POST';

  let postBody = "vads_action_mode=INTERACTIVE&vads_amount=5000000&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=3014353213&vads_payment_cards=PSE&vads_cust_email=cignugaltu%40gufum.com&vads_cust_first_name=FHSGSGDGDS&vads_cust_last_name=DGSDGDGS&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=20230618051445&vads_trans_id=4a7fb2&vads_version=V2&signature=7UDSovtLxOsRkHU0mnh5YsW4d5guxvFVUSLt%2FSOGgF8%3D&pagar=";

  const options = {
    method: method,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1"
    },
    body: postBody
  }

  const url = "https://secure.payzen.lat/vads-payment/";

  const response = await fetch(url, options);
  const data = await response.json();

  return res.end(JSON.stringify({'result': data}));
}

export default handler; 
