import React, { useState, useEffect } from 'react';

function Test() {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingTimer;

    if (inputValue) {
      setIsTyping(true);

      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
    } else {
      setIsTyping(false);
    }

    return () => {
      clearTimeout(typingTimer);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div style={{paddingTop: "400px"}}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type something..."
      />
      <div>{isTyping ? 'User is typing...' : 'User is not typing'}</div>
      <div>Typed data: {inputValue}</div>
    </div>
  );
}

export default Test;
