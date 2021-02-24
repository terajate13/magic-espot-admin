import React from "react"
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

var token = ''

function onChange(value) {
    token = value
    console.log("Captcha value:", value);
  }

  function onClick(value) {

    const headers = {
        'Access-Control-Allow-Origin' : '*',
        "Accept": "application/json",
    }
    axios.post('http://localhost:8080/capchaVerify', {
        headers:headers,
        token: token
      })
      .then(function (response) {
        console.log(response.data);
        if(response.data.toString() == 'true') {
            console.log('VERIFY RECAPCHA SUCCESS!!')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

export default function Recapcha() {
    return (
        <div>
            <ReCAPTCHA sitekey="6LcNK0UaAAAAAFu1Tlukq1NaEPqpZxb_K97i2fXK" onChange={onChange} />
            <button onClick={onClick}>click</button>
        </div>
    )
  }