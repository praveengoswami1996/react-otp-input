import { useEffect, useState } from 'react';
import './App.css';
import OtpInput from './components/OtpInput';

function App() {
  const [otpFieldLength, setOtpFieldlength] = useState(4);
  const [defaultOTP, setDefaultOTP] = useState('');
  const [type, setType] = useState('number');
  const [otpValue, setOtpValue] = useState('');

  useEffect(() => {
    setOtpValue(defaultOTP);
  }, [defaultOTP])

  return (
    <div className='h-screen bg-yellow-200 flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl'>React OTP Input</h1>
      <div className='flex items-center gap-5'>
        {/* OTP Field length Starts */}
          <select 
            className='w-52 p-3 outline-none rounded-xl'
            value={otpFieldLength}
            onChange={(event) => setOtpFieldlength(Number(event.target.value))}
          >
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        {/* OTP Field length Ends */}

        {/* Select Field Type Starts */}
        <select 
          className='w-52 p-3 outline-none rounded-xl'
          onChange={(event) => setType(event.target.value)}
        >
          <option value="number">number</option>
          <option value="text">text</option>
        </select>

        <input 
          value={defaultOTP}
          onChange={(e) => setDefaultOTP(e.target.value)}
          placeholder="Add Default OTP"
          className='w-52 p-3 outline-none rounded-xl'
        />
        <span></span>
      </div>
      <OtpInput 
        length={otpFieldLength} 
        inputType={type} 
        value={otpValue} 
        onChange={setOtpValue}
      />
      <p>Retrieved Value: {otpValue}</p>
    </div>
  )
}

export default App;
