import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export const getStaticProps = async () => {
  const response = await fetch("https://secure.payzen.lat/vads-payment/", {
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
    "body": "vads_action_mode=INTERACTIVE&vads_amount=5000000&vads_ctx_mode=PRODUCTION&vads_currency=170&vads_cust_cell_phone=3125352535&vads_payment_cards=PSE&vads_cust_email=dgadahhdh%40gmail.com&vads_cust_first_name=abhdgdagdagd&vads_cust_last_name=gadgadgad&vads_language=es&vads_cust_phone=&vads_page_action=PAYMENT&vads_payment_config=SINGLE&vads_site_id=23824163&vads_trans_date=20230616030714&vads_trans_id=6968b3&vads_version=V2&signature=EjG5AUbkmSL%2BpKWpI7hyiWsdN8CDUgQIYD8jsdylNlA%3D&pagar=",
    "method": "POST",
    "mode": "cors"
});
  const data = await response.text();
  console.log(data);
  return {
    props: {pageData: data}
  }
}

const Home = ({pageData}) => {
  console.log(pageData);
  return (
    <>
    </>
  );
}

export default Home;
