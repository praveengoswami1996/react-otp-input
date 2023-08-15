import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

let currentOTPIndex = 0;

const OtpInput = ({ length, inputType }) => {
  const [otp, setOtp] = useState(new Array(length).fill("")); 
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);

  const inputRef = useRef(null);

  //handleChange function will fire after handleOnKeyDown Function
  const handleChange = (e) => {
    const value = e.target.value;
    const newOTP = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    
    if (!value)
        setActiveOTPIndex(currentOTPIndex - 1);
    else 
        setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  }

  //handleOnKeyDown function will fire before handleChange
  const handleOnKeyDown = (e, index) => {
    const key = e.key;

    currentOTPIndex = index;

    if (key === 'Backspace') {
      setActiveOTPIndex(index - 1);
      return;
    }

    for (let i=currentOTPIndex-1; i>=0; i--) {
      if (otp[i] === '') {
        if (i === 0) {
          currentOTPIndex = 0;
        }
        continue;
      } else {
        currentOTPIndex = i + 1;
        break;
      }
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex])

  return (
    <div className="flex items-center gap-2">
        {
            otp.map((_, index) => {
                return (
                    <input
                        type={inputType}
                        ref={index === activeOTPIndex ? inputRef : null}
                        key={index}
                        className="hidden-number-input w-[50px] text-[32px] p-[10px] text-center"  
                        maxLength={1}
                        onChange={handleChange}
                        onKeyDown={(e) => handleOnKeyDown(e, index)}
                        value={otp[index]}
                    />
                )
            })
        }
    </div>
  )
}

OtpInput.propTypes = {
    length: PropTypes.number.isRequired,
    inputType: PropTypes.string.isRequired
};

export default OtpInput;