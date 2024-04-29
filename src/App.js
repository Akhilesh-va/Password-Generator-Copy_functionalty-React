import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [copied , setCopied] = useState("copy")

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbersAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_{}<>[]/";
    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
    setCopied("copy")
    console.log(pass);
  }, [length, numbersAllowed, charAllowed, setPassword]);

  // hm ye password generator ko direct useEffect ke andr bna skte hai like this

  // useEffect(() => {
  //   let pass = "";
  //   let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  //   if (numbersAllowed) str += "0123456789";
  //   if (charAllowed) str += "~!@#$%^&*()_{}<>[]/";
  //   for (let i = 1; i <= length; i++) {
  //     let charIndex = Math.floor(Math.random() * str.length + 1);
  //     pass += str.charAt(charIndex);
  //   }
  //   setPassword(pass);
  
  // }, [length, numbersAllowed, charAllowed]);

  //  ---------------------------------------------------Reson----------------------------------------------------------
  // and phir bhi pura project same rhtaa but hm call back apni sari
  //  dependencies ko memoize rkhta hai mtlb cache me
  //   rkhta hai jis se turant use kr ske slight changes pe bhiiii is wjh se ye optimize hota hai

  useEffect(() => {passwordGenerator()}, [length, numbersAllowed, charAllowed,  passwordGenerator]);
  
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    setCopied("copied")
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div
        className=" w-full flex flex-col justify-center items-center h-[150px] max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700
      "
      >
        <h1 className=" text-4xl mb-4 text-white font-semibold ">
          Password generator
        </h1>
        <div className=" flex  w-full shadow rounded-lg  mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className=" outline-none w-full py-1 px-3 "
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className=" rounded-sm outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            {copied}
          </button>
        </div>
        <div className=" flex text-sm gap-x-2">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label> Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => {
                setNumbersAllowed((prev) => 
                  !prev
                );
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev
                  // !prev
                );
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
