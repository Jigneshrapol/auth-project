import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './App.css';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OTPInput from 'react-otp-input';
import { TailSpin } from 'react-loader-spinner';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from "./firebase/firebase";
import toast, { Toaster } from 'react-hot-toast';




function App() {
  const [otp, setotp] = useState('');
  const [lodaing, setloading] = useState(false);
  const [showotp, setshowotp] = useState(false);
  const [phone, setphone] = useState('');
  const [user, setuser] = useState(null);

  async function onsignup() {
    const captcha = new RecaptchaVerifier(auth, 'a', {});
    captcha.render();
    setloading(true);
    try {
      const formatph = "+" + phone;
    const response= await signInWithPhoneNumber(auth, formatph, captcha)
    
     window.confirmationResult=response;
     toast.success("Successfully Sended");
      setshowotp(true);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }

  };

  const verifyotp = async()=> {
    if(otp==="" ||otp===null) return;
    try{
      setloading(true);
      window.confirmationResult.confirm(otp).then(async(res)=>{
        setuser(res.user);
        console.log(res);
        setloading(false);
      })
    }catch(er){
      console.log(er);
    }
  }


  return (
    <section className='bg-emerald-500 w-[100vw] h-[100vh] text-white flex items-center justify-center flex-col'>
      {user ? <div className='text-3xl flex w-full justify-center items-center'>
        <h1>Login Success .....</h1>
      </div> :
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center flex-col '>
            <Toaster position='top-center' />
            <span className='text-3xl font-bold text-center'> <h1 className='text-center text-2xl font-medium  mb-2'> Welcome To</h1>
              MOBILE AUTH
            </span>


          </div>
          {showotp ?

            <div className='mt-10'>
              <div className='flex justify-center mb-10 w-full text-center items-center'>
                <div className='w-fit bg-white text-emerald-500 p-4 rounded-full'>
                  <BsFillShieldLockFill size={40} />
                </div>

              </div>
              <div className='text-emerald-500'>

              </div>
              <OTPInput
                value={otp}
                onChange={(e) => setotp(e)}
                numInputs={6}

                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
              />

              <button
                onClick={verifyotp}
                className="bg-emerald-600 w-full flex mt-2 items-center justify-center py-2.5 hover:bg-emerald-800 text-white rounded"
              >
                {lodaing ? <TailSpin height={"20px"} color='white' /> : ""} Verify Otp</button>
            </div>
            :
            <div className='mt-10'>
              <div className='flex justify-center mb-10 w-full text-center items-center'>
                <div className='w-fit bg-white text-emerald-500 p-4 rounded-full'>
                  <BsTelephoneFill size={40} />
                </div>

              </div>
              <PhoneInput
                country={'us'}
                value={phone}
                onChange={(e) => setphone(e)}

              />
              <div id='a' className='mt-10'></div>
              <button
                onClick={onsignup}
                className="bg-emerald-600 w-full flex mt-2 items-center justify-center py-2.5 hover:bg-emerald-800 text-white rounded"
              >{lodaing ? <TailSpin height={"20px"} color='white' /> : ""} Send Otp</button>
            </div>
          }
        </div>
      }
    </section>
  );
}

export default App
