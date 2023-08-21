import Header from '@components/Header'
import Footer from '@components/Footer'
import Head from 'next/head'
import { useState } from 'react';

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

function buildAuthHeader(amount) {

    const httpMethod = 'GET';
    const url = 'https://bitso.com/api/v3/funding_references?currency=cop&network=pse&protocol=pse&asset=cop&amount=' + amount;
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
    const signature = require('crypto').createHmac('sha256', secret)
                            .update(msgConcat)
                            .digest('hex');
    return {
        `Bitso ${key}:${nonce}:${signature}`
    };
}

function Home() {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleClick = async () => {
    const authHeader = buildAuthHeader(inputValue);
    console.log(inputValue)
    // Aquí puedes usar el valor ingresado por el usuario (inputValue) como desees
    console.log('Valor ingresado:', inputValue);
    console.log('Banco seleccionado:', selectedOption);
    // Llama a la función que deseas ejecutar con el valor ingresado
    // ...
    const method = 'POST';

    const options = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({'amount':inputValue, 'bank': selectedOption})
    }

    const url = '/api/handle';

    const res = await fetch(url, options);

    const final = await res.json();

    // Ejemplo de actualización del estado
    document.getElementById('link').innerText = final.link;

    console.log(final);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(document.getElementById('link').innerText);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Head>
            {/* Resto del código... */}
          </Head>
          <Header />
          <div style={{ display: "flex" }}>
              {/* VECI... */}
              <div style={{ marginRight: "20px" }}>
                  <div style={{ marginBottom: "20px" }}>
                      <h2 id="title1">VECI (no disponible)</h2>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ingresa un valor"
                      />
                      <br /><br />
                      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="0">Selecciona una opción</option>
                        <option value="1558">BAN100</option>
                        <option value="1059">BANCAMIA S.A.</option>
                        <option value="1040">BANCO AGRARIO</option>
                        <option value="1052">BANCO AV VILLAS</option>
                        <option value="1013">BANCO BBVA COLOMBIA S.A.</option>
                        <option value="1032">BANCO CAJA SOCIAL</option>
                        <option value="1066">BANCO COOPERATIVO COOPCENTRAL</option>
                        <option value="1051">BANCO DAVIVIENDA</option>
                        <option value="1001">BANCO DE BOGOTA</option>
                        <option value="1023">BANCO DE OCCIDENTE</option>
                        <option value="1062">BANCO FALABELLA </option>
                        <option value="1063">BANCO FINANDINA S.A. BIC</option>
                        <option value="1012">BANCO GNB SUDAMERIS</option>
                        <option value="1006">BANCO ITAU</option>
                        <option value="1060">BANCO PICHINCHA S.A.</option>
                        <option value="1002">BANCO POPULAR</option>
                        <option value="1065">BANCO SANTANDER COLOMBIA</option>
                        <option value="1069">BANCO SERFINANZA</option>
                        <option value="1303">BANCO UNION antes GIROS</option>
                        <option value="1007">BANCOLOMBIA</option>
                        <option value="1061">BANCOOMEVA S.A.</option>
                        <option value="1283">CFA COOPERATIVA FINANCIERA</option>
                        <option value="1009">CITIBANK </option>
                        <option value="1370">COLTEFINANCIERA</option>
                        <option value="1292">CONFIAR COOPERATIVA FINANCIERA</option>
                        <option value="1291">COOFINEP COOPERATIVA FINANCIERA</option>
                        <option value="1289">COTRAFA</option>
                        <option value="1097">DALE</option>
                        <option value="1551">DAVIPLATA</option>
                        <option value="1637">IRIS</option>
                        <option value="1070">LULO BANK</option>
                        <option value="1801">MOVII S.A.</option>
                        <option value="1507">NEQUI</option>
                        <option value="1811">RAPPIPAY</option>
                        <option value="1019">SCOTIABANK COLPATRIA</option>
                      </select>
                      <br /><br />
                      <button onClick={handleClick}>Generar enlace</button>
                      <br /><br />
                      <p1 id="link">[Aquí aparecerá tu enlace]</p1>
                      <br /><br />
                      <button onClick={handleCopy}>Copiar</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export default Home;
                
