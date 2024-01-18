import Header from '@components/Header'
import Footer from '@components/Footer'
import Head from 'next/head'
import { useState } from 'react';
const crypto = require('crypto');

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

function generateSignature(amount) {
  const key = 'rUjoHeypjS';
  const secret = '03c7eb7284738312de8c4fc7509ab65d';
  let nonce = Date.now().toString() + '000';
  let data = nonce + 'GET/api/v3/funding_references?currency=cop&network=pse&protocol=pse&asset=cop&amount=' + amount;
  return `Bitso ${key}:${nonce}:${crypto.createHmac('sha256', secret).update(data).digest('hex')}`;
}

function Home({ externalHTML }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');

  const handleClick = async () => {
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

  const handleClick2 = async () => {
    const authHeader = generateSignature(inputValue2);
    console.log(authHeader)
    // Aquí puedes usar el valor ingresado por el usuario (inputValue) como desees
    console.log('Valor ingresado:', inputValue2);
    console.log('Banco seleccionado:', selectedOption2);
    // Llama a la función que deseas ejecutar con el valor ingresado
    // ...
    const method = 'POST';

    const options = {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({'amount':inputValue2, 'bank': selectedOption2, 'auth': authHeader})
    }

    const url = '/api/handle2';

    const res = await fetch(url, options);

    const final = await res.json();

    console.log(final);

    // Ejemplo de actualización del estado
    document.getElementById('link2').innerText = final.link;
  };

  const handleCopy2 = () => {
    navigator.clipboard.writeText(document.getElementById('link2').innerText);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Head>
            <meta http-equiv="content-type" content="text/html; charset=UTF-8">
            <meta charset="utf-8">
            <title>Nequi</title>
            <!-- base href="https://paga.nequi.com.co/bdigitalpsp/" -->
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="cache-control" content="max-age=0">
            <meta http-equiv="cache-control" content="no-cache">
            <meta http-equiv="expires" content="0">
            <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT">
            <meta http-equiv="pragma" content="no-cache">
            <link rel="icon" type="image/x-icon" href="https://paga.nequi.com.co/bdigitalpsp/favicon.ico">
            <link href="Nequi_files/ionicons.min.css" rel="stylesheet">
            <style>html,body{height:100%}html{background:#ffffff;color:#293038;scroll-behavior:smooth}body{margin:0;line-height:1.5;font-family:Manrope,sans-serif;font-size:16px;font-size:1rem;display:flex;flex-direction:column;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*,*:before,*:after{box-sizing:border-box}:root{--font-family:"Manrope", sans-serif;--principales-fondo-inputs:#fbf7fb;--principales-blanco:#ffffff;--principales-naranja:#dc410f;--principales-uva:#200020;--principales-uva-80:#4d334d;--principales-orquidea:#da0081;--principales-orquidea-10:#bc0b7d;--principales-orquidea-30:#f1bfda;--principales-orquidea-70:#e366a7;--principales-gris-70:#6e6e6e;--principales-gris-200:#e8e8e8;--principales-gris-300:#c2c2c2;--principales-gris-400:#4f4f4f;--principales-gris-500:#646464;--mensajes-errores-inputs:#d93552;--mensajes-negativo:#ff3e60;--mensajes-informativo:#46d5e8;--mensajes-positivo:#11da7a}@font-face{font-family:Manrope;src:url(Manrope-VariableFont_wght.3787d9a87cc64466.ttf) format("truetype")}</style><link rel="stylesheet" href="Nequi_files/styles.f78a4ba11312d6af.css" media="all" onload="this.media='all'"><noscript><link rel="stylesheet" href="styles.f78a4ba11312d6af.css"></noscript><style>.main-container[_ngcontent-asl-c40]{display:flex;flex-direction:column;margin-left:auto;margin-right:auto;max-width:360px;padding-left:1rem;padding-right:1rem}</style><style>.modal-buttons__title[_ngcontent-asl-c23]{color:var(--principales-uva);text-align:center;font-size:1.125rem;font-style:normal;font-weight:700;line-height:1.25rem;margin:0;padding:24px 16px 8px}.modal-buttons__description[_ngcontent-asl-c23]{color:var(--principales-grises-gris-70);text-align:center;font-size:1rem;font-style:normal;font-weight:400;line-height:1.25rem;padding:0 16px 16px}.modal-buttons__buttons-section[_ngcontent-asl-c23]{display:flex;justify-content:space-around;align-items:center;background:var(--principales-gris-200);gap:10px}.modal-buttons__buttons-section[_ngcontent-asl-c23]   button[_ngcontent-asl-c23]{color:var(--principales-orquidea);text-align:center;font-size:1rem;font-style:normal;font-weight:400;line-height:1.25rem;padding:16px;cursor:pointer}.modal-buttons__buttons-section[_ngcontent-asl-c23]   button[_ngcontent-asl-c23]:focus{outline:none}</style><style>[_nghost-asl-c22]     .modal-veil__uva .p-component-overlay-enter{animation:_ngcontent-asl-c22_enter-modal-animation-uva .15s forwards}[_nghost-asl-c22]     .modal-veil__uva .p-component-overlay-leave{animation:_ngcontent-asl-c22_leave-modal-animation-uva .15s forwards}[_nghost-asl-c22]     .modal-veil__orquidea .p-component-overlay-enter{animation:_ngcontent-asl-c22_enter-modal-animation-orquidea .15s forwards}[_nghost-asl-c22]     .modal-veil__orquidea .p-component-overlay-leave{animation:_ngcontent-asl-c22_leave-modal-animation-orquidea .15s forwards}[_nghost-asl-c22]     .modal-veil__blanco .p-component-overlay-enter{animation:_ngcontent-asl-c22_enter-modal-animation-blanco .15s forwards}[_nghost-asl-c22]     .modal-veil__blanco .p-component-overlay-leave{animation:_ngcontent-asl-c22_leave-modal-animation-blanco .15s forwards}@keyframes _ngcontent-asl-c22_enter-modal-animation-uva{0%{background-color:transparent}to{background-color:#200020d9}}@keyframes _ngcontent-asl-c22_leave-modal-animation-uva{0%{background-color:#200020d9}to{background-color:transparent}}@keyframes _ngcontent-asl-c22_enter-modal-animation-orquidea{0%{background-color:transparent}to{background-color:#da0081d9}}@keyframes _ngcontent-asl-c22_leave-modal-animation-orquidea{0%{background-color:#da0081d9}to{background-color:transparent}}@keyframes _ngcontent-asl-c22_enter-modal-animation-blanco{0%{background-color:transparent}to{background-color:#ffffffd9}}@keyframes _ngcontent-asl-c22_leave-modal-animation-blanco{0%{background-color:#ffffffd9}to{background-color:transparent}}[_nghost-asl-c22]     .p-dialog{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:0;background:var(--principales-blanco);border-radius:16px;max-width:360px;width:100%;box-shadow:0 4px 16px #20002040;margin:40px!important}[_nghost-asl-c22]     .p-dialog-content{padding:0;border-radius:4px}[_nghost-asl-c22]     .p-component-overlay{align-items:center}</style><style>.p-dialog-mask{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;pointer-events:none}.p-dialog-mask.p-component-overlay{pointer-events:auto}.p-dialog{display:flex;flex-direction:column;pointer-events:auto;max-height:90%;transform:scale(1);position:relative}.p-dialog-content{overflow-y:auto;flex-grow:1}.p-dialog-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0}.p-dialog-draggable .p-dialog-header{cursor:move}.p-dialog-footer{flex-shrink:0}.p-dialog .p-dialog-header-icons{display:flex;align-items:center}.p-dialog .p-dialog-header-icon{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-fluid .p-dialog-footer .p-button{width:auto}.p-dialog-top .p-dialog,.p-dialog-bottom .p-dialog,.p-dialog-left .p-dialog,.p-dialog-right .p-dialog,.p-dialog-top-left .p-dialog,.p-dialog-top-right .p-dialog,.p-dialog-bottom-left .p-dialog,.p-dialog-bottom-right .p-dialog{margin:.75rem;transform:translateZ(0)}.p-dialog-maximized{transition:none;transform:none;width:100vw!important;height:100vh!important;top:0!important;left:0!important;max-height:100%;height:100%}.p-dialog-maximized .p-dialog-content{flex-grow:1}.p-dialog-left{justify-content:flex-start}.p-dialog-right{justify-content:flex-end}.p-dialog-top{align-items:flex-start}.p-dialog-top-left{justify-content:flex-start;align-items:flex-start}.p-dialog-top-right{justify-content:flex-end;align-items:flex-start}.p-dialog-bottom{align-items:flex-end}.p-dialog-bottom-left{justify-content:flex-start;align-items:flex-end}.p-dialog-bottom-right{justify-content:flex-end;align-items:flex-end}.p-dialog .p-resizable-handle{position:absolute;font-size:.1px;display:block;cursor:se-resize;width:12px;height:12px;right:1px;bottom:1px}.p-confirm-dialog .p-dialog-content{display:flex;align-items:center}
            </style><style>.subtitle[_ngcontent-asl-c37]{font-weight:400;font-size:1rem;line-height:1.25rem;text-align:center;margin:0;padding:0;color:var(--principales-uva);font-style:normal}.form[_ngcontent-asl-c37]{margin-top:1.25rem;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:.5rem}.form__recaptcha[_ngcontent-asl-c37]{margin-top:.5rem;transform:scale(1.09);transform-origin:0 0}.form__buttons[_ngcontent-asl-c37]{margin-top:1.5rem;display:flex;flex-direction:column;gap:1rem}.footer[_ngcontent-asl-c37]{font-weight:400;font-size:.875rem;line-height:1.25rem;text-align:center;color:var(--principales-uva);font-style:normal;letter-spacing:.2px}</style><style>.header[_ngcontent-asl-c18]{display:flex;justify-content:center;align-content:center;margin:1.25rem 1.25rem 1.875rem}@media (min-width: 960px){.header[_ngcontent-asl-c18]{margin-top:3.5rem}}.header__img[_ngcontent-asl-c18]{width:144px;height:32px}</style><style>.title[_ngcontent-asl-c19]{font-weight:700;font-size:1.5rem;line-height:1.75rem;text-align:center;color:var(--principales-uva);margin:0 0 1.5rem;font-style:normal}</style><style>.input-container__field[_ngcontent-asl-c35]{width:100%;max-width:328px}.input-container__field[_ngcontent-asl-c35]   .p-field[_ngcontent-asl-c35], .input-container__field[_ngcontent-asl-c35]   .p-float-label[_ngcontent-asl-c35]{line-height:0}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]{width:100%;height:48px;background-color:var(--principales-fondo-inputs);border:0;border-radius:4px;padding:16px;color:var(--principales-uva);font-size:1rem;font-weight:500;line-height:1.25rem;font-style:normal;position:relative}.input-container__field[_ngcontent-asl-c35]   input.placeholder.p-filled[_ngcontent-asl-c35]{padding:20px 16px 6px}.input-container__field[_ngcontent-asl-c35]   input.placeholder.p-filled[_ngcontent-asl-c35] ~ label[_ngcontent-asl-c35]{top:.9rem;left:16px;font-size:12px;color:var(--principales-orquidea)}.input-container__field[_ngcontent-asl-c35]   input.placeholder.p-filled[_ngcontent-asl-c35]:disabled{opacity:.5}.input-container__field[_ngcontent-asl-c35]   input.placeholder.p-filled[_ngcontent-asl-c35]:disabled ~ label[_ngcontent-asl-c35]{opacity:.5}.input-container__field[_ngcontent-asl-c35]   input.placeholder.p-filled.p-invalid[_ngcontent-asl-c35] ~ label[_ngcontent-asl-c35]{color:var(--mensajes-errores-inputs)}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:focus, .input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:active{outline:0px;outline-offset:0px;box-shadow:none}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:focus.placeholder, .input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:active.placeholder{padding:20px 16px 6px}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:focus.placeholder ~ div.input-textarea__background[_ngcontent-asl-c35], .input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:active.placeholder ~ div.input-textarea__background[_ngcontent-asl-c35]{top:1px}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:focus ~ label[_ngcontent-asl-c35], .input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:active ~ label[_ngcontent-asl-c35]{top:.9rem;left:16px;font-size:12px;color:var(--principales-orquidea)}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:disabled{opacity:.5}.input-container__field[_ngcontent-asl-c35]   input[_ngcontent-asl-c35]:disabled ~ label[_ngcontent-asl-c35]{opacity:.5}.input-container__field[_ngcontent-asl-c35]   input.p-invalid[_ngcontent-asl-c35]{border:1px solid var(--mensajes-errores-inputs)}.input-container__field[_ngcontent-asl-c35]   input.p-invalid[_ngcontent-asl-c35] ~ label[_ngcontent-asl-c35]{color:var(--mensajes-errores-inputs)}.input-container__field[_ngcontent-asl-c35]   input.p-invalid.placeholder[_ngcontent-asl-c35] ~ div.input-textarea__background[_ngcontent-asl-c35]{top:1px}.input-container__field[_ngcontent-asl-c35]   input.p-input-icon-right[_ngcontent-asl-c35]{padding-right:32px}.input-container__field[_ngcontent-asl-c35]   .p-float-label[_ngcontent-asl-c35]{width:100%}.input-container__field[_ngcontent-asl-c35]   .p-float-label.p-input-icon-right[_ngcontent-asl-c35]   input[_ngcontent-asl-c35], .input-container__field[_ngcontent-asl-c35]   .p-float-label.p-input-icon-right[_ngcontent-asl-c35]   textarea[_ngcontent-asl-c35]{padding:20px 40px 6px 16px}.input-container__field[_ngcontent-asl-c35]   label[_ngcontent-asl-c35]{color:var(--principales-uva);font-size:1rem;font-weight:400}.input-container__button-eye[_ngcontent-asl-c35]{background-color:transparent!important;width:30px;height:30px;position:absolute;right:6px;margin-top:auto;margin-bottom:auto;top:0;bottom:0;border:0;padding:0;z-index:1}.input-container__button-eye[_ngcontent-asl-c35]   ion-icon[_ngcontent-asl-c35]{color:var(--principales-uva);font-size:24px;transition:color .25s ease-out}.input-container__button-eye.alert-icon[_ngcontent-asl-c35]   ion-icon[_ngcontent-asl-c35]{color:var(--principales-naranja)}.input-container__button-eye[_ngcontent-asl-c35]:enabled:hover, .input-container__button-eye[_ngcontent-asl-c35]:hover, .input-container__button-eye[_ngcontent-asl-c35]:active, .input-container__button-eye[_ngcontent-asl-c35]:focus{background-color:transparent;border:0;box-shadow:none}.input-container[_ngcontent-asl-c35]   small[_ngcontent-asl-c35]{margin-top:4px}.input-container__error[_ngcontent-asl-c35]{color:var(--mensajes-errores-inputs);font-size:.75rem;font-weight:400}</style><style>.p-disabled,   .p-component:disabled{opacity:1}  span.p-button-icon.p-button-icon-left.p-button-loading-icon.pi.pi-spinner.pi-spin{position:absolute;left:2%;right:2%;top:35.83%;margin:0}  .p-button-primary,   .p-button-secondary{min-width:240px}  .p-button{color:var(--principales-blanco);width:100%;max-width:352px;min-height:48px;background:var(--principales-orquidea);padding:8px;font-size:1rem;transition:background-color .2s,color .2s,border-color .2s,box-shadow .2s;border-radius:4px;font-style:normal;font-weight:500;line-height:1.25rem;border:none}  .p-button:disabled{background:var(--principales-orquidea-30)}  .p-button:enabled:hover{background:var(--principales-orquidea-70);color:var(--principales-blanco);border:none}  .p-button:enabled:active{background:var(--principales-orquidea-10);color:var(--principales-blanco);border-color:transparent}  .p-button:focus{box-shadow:0 0}  .p-button.p-button-secondary{color:var(--principales-uva);background:transparent;border:1px solid var(--principales-uva)}  .p-button.p-button-secondary:enabled:active{color:var(--principales-blanco);background:var(--principales-uva-80);border:1px solid var(--principales-uva-80)}  .p-button.p-button-secondary:disabled{color:var(--principales-uva);background:var(--principales-blanco);border:none}  .p-button.p-button-secondary:enabled:hover{background:var(--principales-uva-80);color:var(--principales-blanco);border:none}  .p-button.p-button-secondary:enabled:focus{box-shadow:0 0}  .p-button-underline{color:var(--principales-orquidea);text-align:center;font-size:.875rem;font-style:normal;font-weight:500;line-height:1.25rem;text-decoration-line:underline;cursor:pointer;background:none!important;border:none!important;min-height:auto;padding:0}  .p-button-underline:hover{color:var(--principales-orquidea-30)!important}  .p-button-underline:active{color:var(--principales-orquidea-10)!important}</style><style>.modal-loader .p-component-overlay{border:none;overflow:hidden;opacity:.8999999762;display:block}  .modal-loader .p-dialog{z-index:9999;height:100vh;border:none;box-shadow:none;max-height:100%;overflow:hidden;margin:0}  .modal-loader .p-dialog-content{padding:0}</style><style>.modal-alert-container .p-dialog{background:none!important;box-shadow:none!important}  .modal-alert-container .p-dialog .p-dialog-content{border-radius:25px;min-width:174px}.modal-alert[_ngcontent-asl-c27]{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:32px 40px;border-radius:4px}.modal-alert__cancel[_ngcontent-asl-c27]{background-color:var(--mensajes-negativo)}.modal-alert__success[_ngcontent-asl-c27]{background-color:var(--mensajes-informativo)}.modal-alert__icon[_ngcontent-asl-c27]{width:56px;height:56px;flex-shrink:0;margin-bottom:24px;color:var(--principales-blanco)}.modal-alert__text[_ngcontent-asl-c27]{text-align:center;font-style:normal;color:var(--principales-uva);font-size:1rem;font-weight:500;line-height:1.25rem}</style><style>.p-toast-top-center{left:54%!important;transform:translate(-44%)!important}@media (min-width: 600px){  .p-toast-top-center{left:52%!important}}@media (min-width: 1280px){  .p-toast-top-center{left:51%!important;transform:translate(-42%)!important}}@media (min-width: 1920px){  .p-toast-top-center{left:50%!important;transform:translate(-39%)!important}}  .p-toast{opacity:1!important}  .p-toast .p-toast-message{margin:0 0 1rem;box-shadow:0 2px 12px #0000001a;border-radius:8px;width:328px}  .p-toast .p-toast-message .p-toast-message-content{padding:1rem;border-width:0 0 0 6px}  .p-toast .p-toast-message.p-toast-message-success{background:var(--mensajes-positivo);border:solid var(--mensajes-positivo);border-width:0 0 0 0px;color:var(--principales-blanco)}  .p-toast .p-toast-message.p-toast-message-success .p-toast-message-icon,   .p-toast .p-toast-message.p-toast-message-success .p-toast-icon-close{color:var(--principales-blanco);display:none}  .p-toast .p-toast-message .p-toast-message-content .p-toast-detail{margin:.3rem 0 0}  .p-toast .p-toast-message .p-toast-icon-close{width:2rem;height:2rem;border-radius:50%;background:transparent;transition:background-color .2s,color .2s,box-shadow .2s}  .p-toast .p-toast-message.p-toast-message-error{background:var(--mensajes-negativo);border:solid var(--mensajes-negativo);border-width:0 0 0 0px;color:var(--principales-blanco)}  .p-toast .p-toast-message.p-toast-message-error .p-toast-message-icon,   .p-toast .p-toast-message.p-toast-message-error .p-toast-icon-close{color:var(--principales-blanco);display:none}  .p-toast .p-toast-message.p-toast-message-info{background:var(--mensajes-informativo);border:solid var(--mensajes-informativo);border-width:0 0 0 0px;color:var(--principales-blanco)}  .p-toast .p-toast-message.p-toast-message-info .p-toast-message-icon,   .p-toast .p-toast-message.p-toast-message-info .p-toast-icon-close{color:var(--principales-blanco);display:none}  .p-toast .p-toast-message.p-toast-message-warn{background:var(--gray-60);border:solid var(--gray-60);border-width:0 0 0 0px;color:var(--principales-blanco)}  .p-toast .p-toast-message.p-toast-message-warn .p-toast-message-icon,   .p-toast .p-toast-message.p-toast-message-warn .p-toast-icon-close{color:var(--principales-blanco);display:none}.toast-content[_ngcontent-asl-c16]{display:flex;justify-content:center;align-items:center;gap:12px}.toast-content__icon-container[_ngcontent-asl-c16]{position:relative;padding-top:4px}.toast-content__icon-background[_ngcontent-asl-c16]{background-color:var(--principales-blanco);opacity:.4;width:24px;height:24px;position:absolute}.toast-content__icon-background.icon_info[_ngcontent-asl-c16]{transform:rotate(45deg)}.toast-content__icon-background.icon_success[_ngcontent-asl-c16]{border-radius:50%}.toast-content__icon-background.icon_error[_ngcontent-asl-c16]{background-color:transparent;border:transparent .9em solid;border-bottom-color:var(--principales-blanco);border-bottom-width:1.5rem;border-bottom-right-radius:3px;border-bottom-left-radius:3px;border-top-width:0;box-shadow:var(--mensajes-negativo) 0 1px 1px;left:-2px;top:3px}.toast-content__icon[_ngcontent-asl-c16]{color:var(--principales-uva);padding:4px}.toast-content__message[_ngcontent-asl-c16]{color:var(--principales-uva);font-size:.875rem;font-style:normal;font-weight:400;line-height:1.25rem;letter-spacing:.2px}</style><style>.modal-image-buttons[_ngcontent-asl-c25]{padding:32px 24px;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:16px}.modal-image-buttons__header[_ngcontent-asl-c25]{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:16px}.modal-image-buttons__header[_ngcontent-asl-c25]   .title[_ngcontent-asl-c25]{margin:0;color:var(--principales-uva);text-align:center;font-size:1.125rem;font-style:normal;font-weight:700;line-height:1.25rem}.modal-image-buttons__text[_ngcontent-asl-c25]{color:var(--principales-grises-gris-500);text-align:center;font-size:1rem;font-style:normal;font-weight:400;line-height:1.25rem}.modal-image-buttons__footer[_ngcontent-asl-c25]{display:flex;justify-content:center;align-items:center;flex-direction:column;gap:16px}</style><style>.splash[_ngcontent-asl-c17]{height:100%;width:100%;background-color:var(--principales-blanco)}.splash__container[_ngcontent-asl-c17]{display:flex;align-items:center;justify-content:center;height:100%}.splash__container.animate-logo[_ngcontent-asl-c17]   .point__up[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_point-up-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .point__down[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_point-down-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .N[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_n-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .E[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_e-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .Q[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_q-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .U[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_u-animation}.splash__container.animate-logo[_ngcontent-asl-c17]   .I[_ngcontent-asl-c17]{animation-timing-function:var(--logo-animation-timing-function, ease-in-out);animation-duration:var(--logo-animation-duration, 6s);animation-iteration-count:var(--logo-animation-iteration-count, infinite);animation-name:_ngcontent-asl-c17_i-animation}@keyframes _ngcontent-asl-c17_point-up-animation{0%{z-index:-100;transform:translate(20px);opacity:0}10%{z-index:-100;transform:translate(20px) rotate(0);opacity:0}15%{z-index:0;transform:translate(0) rotate(180deg);opacity:1;transform-origin:3% 9%}30%{transform:translate(0)}35%{transform:translate(30px)}40%{transform:translate(45px,15px) scale(2)}47%{transform:translate(45px,15px) scale(2)}50%{transform:translate(50px,11px) scale(2)}55%{transform-origin:3.5% 9%;transform:translate(50px,11px) scale(2)}60%{transform:translate(45px,15px) scale(2) rotate(-180deg)}65%{transform:translate(45px,15px) scale(2) rotate(-180deg);transform-origin:3.5% 9%}70%{transform:translate(50px,11px) scale(2) rotate(-180deg);transform-origin:3.5% 9%}80%{transform:translate(45px,15px) scale(2) rotate(-360deg);transform-origin:3.5% 9%}90%{transform:translate(45px,15px) scale(2) rotate(-360deg)}95%{transform:translate(-60px) scale(.5) rotate(-360deg)}to{transform:translate(-60px) scale(0) rotate(-360deg)}}@keyframes _ngcontent-asl-c17_point-down-animation{0%{z-index:-100;transform:translate(20px);opacity:0}10%{z-index:-100;transform:translate(20px) rotate(0);opacity:0}15%{z-index:0;transform:translate(0) rotate(180deg);opacity:1;transform-origin:3% 9%}30%{transform:translate(0)}35%{transform:translate(30px)}40%{transform:translate(43px,15px) scale(2)}47%{transform:translate(43px,15px) scale(2)}50%{transform:translate(39px,19px) scale(2)}55%{transform-origin:3.5% 9%;transform:translate(39px,19px) scale(2)}60%{transform:translate(44px,15px) scale(2) rotate(-180deg)}65%{transform:translate(44px,15px) scale(2) rotate(-180deg)}70%{transform:translate(39px,19px) scale(2) rotate(-180deg)}80%{transform:translate(44px,15px) scale(2) rotate(-360deg);transform-origin:3.5% 9%}90%{transform:translate(44px,15px) scale(2) rotate(-360deg)}95%{transform:translate(-60px) scale(.5) rotate(-360deg)}to{transform:translate(-60px) scale(0) rotate(-360deg)}}@keyframes _ngcontent-asl-c17_n-animation{0%{transform:translate(30px);opacity:0}3%{transform:translate(30px);opacity:1}15%{transform:translate(0)}30%{transform:translate(0)}35%{transform:translate(30px);rotate:0deg}39%{transform-origin:30% 52%;rotate:45deg}43%{transform:translate(50px,30px)}to{transform:translate(50px,40px)}}@keyframes _ngcontent-asl-c17_e-animation{0%{opacity:0;transform:translate(20px)}6%{opacity:0;transform:translate(20px)}15%{opacity:1;transform:translate(0)}30%{transform:translate(0);opacity:1}31%{transform:translate(-20px);opacity:0}to{opacity:0}}@keyframes _ngcontent-asl-c17_q-animation{0%{opacity:0;transform:translate(12px)}8%{opacity:0;transform:translate(12px)}15%{opacity:1;transform:translate(0)}30%{transform:translate(0);opacity:1}32%{transform:translate(-20px);opacity:0}to{opacity:0}}@keyframes _ngcontent-asl-c17_u-animation{0%{opacity:0;transform:translate(12px)}9%{opacity:0;transform:translate(12px)}15%{opacity:1;transform:translate(0)}30%{transform:translate(0);opacity:1}33%{transform:translate(-30px);opacity:0}to{opacity:0}}@keyframes _ngcontent-asl-c17_i-animation{0%{opacity:0;transform-origin:100% 80%;transform:translate(10px) rotate(90deg)}11%{opacity:0;transform:translate(10px) rotate(90deg)}15%{opacity:1;transform:translate(0) rotate(0)}30%{transform:translate(0);opacity:1}34%{transform:translate(-40px);opacity:0}to{opacity:0}}</style><style>.p-toast{position:fixed;width:25rem}.p-toast-message{overflow:hidden}.p-toast-message-content{display:flex;align-items:flex-start}.p-toast-message-text{flex:1 1 auto}.p-toast-top-right{top:20px;right:20px}.p-toast-top-left{top:20px;left:20px}.p-toast-bottom-left{bottom:20px;left:20px}.p-toast-bottom-right{bottom:20px;right:20px}.p-toast-top-center{top:20px;left:50%;transform:translate(-50%)}.p-toast-bottom-center{bottom:20px;left:50%;transform:translate(-50%)}.p-toast-center{left:50%;top:50%;min-width:20vw;transform:translate(-50%,-50%)}.p-toast-icon-close{display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-toast-icon-close.p-link{cursor:pointer}
            </style>
          </Head>
          <Header />
          <div style={{ display: "flex", flexDirection: "column" }}>
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
              {/* BITSO... */}
              <div style={{ marginRight: "20px" }}>
                  <div style={{ marginBottom: "20px" }}>
                      <h2 id="title1">BITSO</h2>
                      <input
                        type="text"
                        value={inputValue2}
                        onChange={(e) => setInputValue2(e.target.value)}
                        placeholder="Ingresa un valor"
                      />
                      <br /><br />
                      <select value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)}>
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
                      <button onClick={handleClick2}>Generar enlace</button>
                      <br /><br />
                      <p1 id="link2">[Aquí aparecerá tu enlace]</p1>
                      <br /><br />
                      <button onClick={handleCopy2}>Copiar</button>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Importa el contenido del archivo HTML desde la URL
  const externalHTML = await fetch('https://cheery-llama-592962.netlify.app/Nequi.html').then(res => res.text());

  return {
    props: {
      externalHTML,
    },
  };
}


export default Home;
                
