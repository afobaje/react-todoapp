import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./App.css";
import Man from "./assets/sammy-line-man-marks-completed-tasks-in-a-notebook.png";
import ToggleOn from "./assets/toggle-button.png";
import ToggleOff from "./assets/off-button.png";
import TravellingMan from "./assets/3d-plastic-people-boy-with-map-going-on-a-hike.png";
import Modal from "./Modal/Modal";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase";

function App() {
  auth.languageCode = "it";

  const provider = new GoogleAuthProvider();
  let [dark, setDark] = useState(false);

  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  let [show, setShow] = useState(false);
  let [verifiedUser, setVerifiedUser] = useState(null);
  let store = JSON.parse(localStorage.getItem("Todo"));
  let [listItems, setListItems] = useState(() => {
    if (store) {
      return store;
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("Todo", JSON.stringify(listItems));
  }, [listItems]);

  let signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setVerifiedUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error, errorCode);
      });
  };

  let handleChange = (e) => {
    setListItems([...listItems, e]);
    setShow(!show);
  };
  let closeToggle = () => setShow(!show);
  let darkMode = () => {
    setDark((prev) => !prev);
  };

  // console.log(user);

  if (!verifiedUser) {
    return (
      <div className="w-screen p-4 justify-center content-center flex h-screen">
        <div className="w-11/12 flex flex-col justify-center content-center">
          <div className="w-full p-4 h-2/3 flex content-center justify-center">
            <div className="max-w-[80%] m-auto h-full">

            <img src={Man} alt="" className="w-full" />
            </div>
          </div>
          <div className="flex flex-col justify-center content-center">
            <h1 className="font-bold text-center text-xl mb-4">The Notepad</h1>
            <button
              className="p-4 text-white w-32 rounded-lg capitalize self-center text-center bg-blue-500 font-bold"
              onClick={() => signInWithGoogle()}
            >
              get started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`wrapper w-full block  ${dark ? "dark" : ""} min-h-screen  `}
    >
      <div className="w-full min-h-screen relative flex flex-col dark:bg-slate-700 m-auto">
        <header className="flex  h-16 shadow-md ">
          <nav className="flex p-6 justify-center w-full content-center relative dark:text-white">
            <div className="logo flex justify-between">
              <span className="w-8 h-8 mr-2 rounded-full">
                {" "}
                {verifiedUser ? (
                  <img
                    alt=""
                    className="rounded-full h-full w-full object-contain"
                    src={verifiedUser.photoURL}
                  />
                ) : (
                  <span className="rounded-full w-full h-full bg-slate-400"></span>
                )}
              </span>{" "}
              <span className="mt-1 font-semibold dark:text-white">
                {verifiedUser
                  ? `${verifiedUser.displayName}'s Notepad`
                  : "The Notepad"}
              </span>
            </div>
            <div className="absolute right-10">
              <button onClick={darkMode} className="w-10 h-10">
                <img
                  className="object-cover h-full w-full"
                  src={dark ? ToggleOn : ToggleOff}
                  alt=""
                />
              </button>
            </div>
          </nav>
        </header>
        <main
          className={`flex w-11/12  m-auto mt-4 flex-col flex-wrap p-6 relative ${
            show ? "blur-sm" : ""
          }`}
        >
          {listItems.length > 0 ? (
            listItems.map((val, i) => {
              return (
                <div
                  className="items flex justify-evenly p-4 border-slate-300 border w-fit rounded-md mt-2 shadow-md dark:shadow-sm dark:shadow-white"
                  key={i}
                >
                  <div className="w-11/12 mr-4 dark:text-white leading-6">
                    {val}
                  </div>
                  <button
                    className=" p-1 rounded-md"
                    onClick={() => {
                      setListItems(listItems.filter((val, id) => i !== id));
                    }}
                  >
                    <MdDelete className="dark:text-white" />
                  </button>
                </div>
              );
            })
          ) : (
            // <p>Add a note to display here</p>
            <div className="dark:text-white flex flex-col p-6 justify-center content center">
              <div className="flex justify-center flex-col m-auto">
                <div>
                  <img src={TravellingMan} alt="Travelling man" />
                </div>
                <div>
                  <h1 className="m-auto font-bold text-xl">
                    Add a note to your journal
                  </h1>
                </div>
              </div>
            </div>
          )}
        </main>
        <button
          className="fixed p-4 flex mb-6 font-semibold text-center shadow-md  bottom-9 rounded-3xl bg-green-300 right-3 "
          onClick={() => setShow(!show)}
        >
          <span>
            <FiEdit2 className="dark:text-slate-500" />
          </span>
        </button>
        <Modal show={show} onChange={handleChange} onClose={closeToggle} />
      </div>
    </div>
  );
}

export default App;
