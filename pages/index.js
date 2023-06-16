import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  fetch("https://api.soyveci.com/transactions/smartlink/v2", {
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
    "body": "{\"transaction\":{\"payment_type\":2,\"origin_name\":\"dsggdahaddh\",\"origin_lastname\":\"gdgadgdagad\",\"origin_document\":\"\",\"origin_phone\":\"3466246262\",\"origin_email\":\"dgdgdahhjdhg@gmail.com\",\"destination_phone\":\"3207625047\",\"amount\":\"50000\",\"supplier_code\":\"f0bd118b78388b4e4a02b40260c33a04d12a9ce314a3c4538de3cca294b25aa8\"}}",
    "method": "POST",
    "mode": "cors"
}).then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(data['data']['signature']);
    const signature = data['data']['signature_pse'];
    const transID = data['data']['code'];
    const transDate = data['data']['date'];
    fetch("https://secure.payzen.lat/vads-payment/", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3",
        "Content-Type": "application/x-www-form-urlencoded",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "cross-site",
        "Sec-Fetch-User": "?1",
        'Access-Control-Allow-Origin': '*'
    },
    "referrer": "https://soyveci.com/link/?phone=3207625047",
    "body": "vads_action_mode=INTERACTIVE&vads_amount=5000000&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=3466246262&vads_payment_cards=PSE&vads_cust_email=dgdgdahhjdhg%40gmail.com&vads_cust_first_name=dsggdahaddh&vads_cust_last_name=gdgadgdagad&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=" + transDate + "&vads_trans_id=" + transID + "&vads_version=V2&signature=" + signature + "&pagar=",
    "method": "POST",
    "mode": "cors"
}).then(response => response.json())
  .then(data => {
    console.log(data);
  });
  });
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
