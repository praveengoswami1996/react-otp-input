import './App.css';
import OtpInput from './components/OtpInput';

function App() {
  return (
    <div className='h-screen bg-yellow-200 flex flex-col items-center justify-center gap-5'>
      <h1 className='text-5xl'>React OTP Input</h1>
      <OtpInput length={6}/>
    </div>
  )
}

export default App;
