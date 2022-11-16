import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";



const Modal = ({ show, onChange,onClose }) => {
  let [inputValue, setInputValue] = useState("");
  let handleData = (e) => setInputValue(e.currentTarget.value);
 
  return (
    <div
      className={`p-10 shadow-sm dark:shadow-white dark:shadow-sm rounded-lg z-30 dark:bg-slate-600 shadow-black md:overflow-y-auto h-80 max-h-96 blur-none bg-white  flex m-auto fixed  md:left-72 top-28 left-16 w-3/4 md:w-2/4 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="w-full">
        <div className="header flex justify-center relative">
          <h2 className="font-bold dark:text-white">Add an Item</h2>
          <button className="absolute right-0 hover:bg-red-300 rounded-full p-2 hover:text-white" onClick={onClose}><VscChromeClose className="dark:text-white" /></button>
        </div>
      
        <main className=" p-6 mt-6 flex flex-col relative h-3/4">
          <div className="h-3/4 w-11/12 m-auto ">
          <input
            type="text"
            name=""
            
            id=""
            placeholder="What's happening?"
            onChange={(e) => handleData(e)}
            value={inputValue}
            className="outline-none pl-4 text-start dark:bg-slate-500 dark:text-white rounded-md w-full h-3/4"
          />
          </div>
          <div className="absolute md:bottom-0 top-40 md:left-96">
            <button
            className="p-4 text-white font-bold bg-blue-400 rounded-3xl dark:text-gray-200"
              onClick={() => {
                if (inputValue.length!==0) {
                  onChange(inputValue);
                  setInputValue("");
                } 
              }}
              
            >
              Post Item
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Modal;


