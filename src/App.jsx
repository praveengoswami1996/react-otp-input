import { useState } from 'react';
import './App.css';
import OtpInput from './components/OtpInput';

function App() {
  const [type, setType] = useState('number');

  return (
    <div className='h-screen bg-yellow-200 flex flex-col items-center justify-center gap-5'>
      <div className='flex items-center gap-5'>
        <h1 className='text-5xl'>React OTP Input</h1>
        <select 
          className='w-52 p-3 outline-none rounded-xl'
          onChange={(event) => setType(event.target.value)}
        >
          <option value="number">number</option>
          <option value="text">text</option>
        </select>
      </div>
      <OtpInput length={6} inputType={type}/>
    </div>
  )
}

export default App;
