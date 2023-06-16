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
    console.log(data['data']);
    console.log(data['signature']);
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
