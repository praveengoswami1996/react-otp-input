import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

let currentOTPIndex = 0;

const OtpInput = ({ length=4, inputType="number", value="", onChange}) => {
  const [otp, setOtp] = useState([]); 
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
 
  const inputRef = useRef(null);

  useEffect(() => {
    setOtp(new Array(length).fill(""))
  }, [length])

  useEffect(() => {
    if (length === value?.length) {
      const initialOTP = value?.trim().split(' ').join('').substring(0, length).split('');
      setOtp(initialOTP);
      setActiveOTPIndex(length - 1);
    }
  }, [length, value])

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

  useEffect(() => {
    onChange(otp.join(""));
  }, [otp, onChange])

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
    inputType: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default OtpInput;