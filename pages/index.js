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

function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    // Aquí puedes usar el valor ingresado por el usuario (inputValue) como desees
    console.log('Valor ingresado:', inputValue);
    // Llama a la función que deseas ejecutar con el valor ingresado
    // ...
    const method = 'POST';

    const options = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: 'xd'
    }

    const url = './api/handle.js';

    const res = await fetch(url, options);

    // Ejemplo de actualización del estado
    setInputValue('');
  };

  return (
    <>
      <Head>
        {/* Resto del código... */}
      </Head>
      <Header />
      {/* Resto del código... */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ingresa un valor"
      />
      <button onClick={handleClick}>Ejecutar función</button>
    </>
  );
}

export default Home;
                
