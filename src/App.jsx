import { useState, useCallback, useEffect, useRef } from "react"
function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGen = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword])

  const copyToCLipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])
    useEffect(()=>{
      passwordGen();
    }, [length, number, character, passwordGen])
  return (
    <>
      <div className="flex-wrap flex-col justify-center p-6 border border-neutral-100 rounded-lg">
        <h1 className="text-white text-center text-4xl p-2 mb-6">Password Generator</h1>
        <div className="flex flex-wrap flex-row justify-center items-center">
          <input className="w-[80%] p-2 text-black outline-none rounded-l-md border-0 text-2xl" type="text" readOnly placeholder="Password" value={password} ref={passwordRef}/>
          <button className="p-3 bg-purple-500 text-white rounded-r-md cursor-pointer w-[15%] hover:bg-purple-800" onClick={copyToCLipboard}> <i className="fa-solid fa-copy"></i> </button>
        </div>
        <div className="flex justify-center items-center gap-5 mt-5">
          <label className="text-white text-xl" htmlFor="range">Password Length</label>
          <input className="bg-purple-500 text-purple-500 h-[5px] cursor-pointer" type="range" name="" id="" min={6} max={20} value={length} onChange={(e) => {setLength(e.target.value)}}/>
          <span className="text-white font-bold text-lg relative">{length}</span>
        </div>
        <div class="w-full flex flex-col justify-center items-center pt-5">
                        <div class="flex justify-between items-center w-full pt-3">
                            <p class="text-white text-xl">Include Numbers</p>
                            <input className="w-[18px] h-[18px] cursor-pointer" type="checkbox" name="" id="uppercase" defaultChecked={number} onChange={()=>{setNumber((prev)=>!prev)}}/>
                        </div>
                        <div class="flex justify-between items-center w-full pt-3">
                            <p class="text-white text-xl">Include characters</p>
                            <input className="w-[18px] h-[18px] cursor-pointer" type="checkbox" name="" id="lowercase" defaultChecked={character} onChange={()=>{setCharacter((prev)=>!prev)}}/>
                        </div>
        </div>
      </div>
    </>
  )
}

export default App
