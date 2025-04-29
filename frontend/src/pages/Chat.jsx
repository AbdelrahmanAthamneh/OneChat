import brand from "../assets/brand.png";
import logo from "../assets/logo.png";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import formatDate from "../util/formatDate.js";
import { Link, useLoaderData } from "react-router-dom";

const baseAPIURL = import.meta.env.VITE_BASE_API_URL;
const socket = io(`${baseAPIURL}/chat`);

export default function ChatPage() {
  const chatNameRef = useRef();
  const inputRef = useRef();
  const data = useLoaderData();
  const [messages, setMessages] = useState([]);

  let username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      localStorage.setItem(
        "username",
        `user_${Math.random().toFixed(4).replace(".", "")}`
      );
    }

    socket.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
    });

    setMessages(data.messages);
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!inputRef.current.value.trim()) {
        return;
      }
      const message = {
        sender: username,
        text: inputRef.current.value,
        sentAt: Date.now(),
      };
      socket.emit("message", message);
      setMessages((prevState) => [...prevState, message]);
      inputRef.current.value = "";
    }
  }

  function handleBlur() {
    if (currentChatName === chatNameRef.current.value) {
      console.log("No new chat name");
    } else {
      console.log("New chat name!");
      currentChatName = chatNameRef.current.value;
    }
  }

  let currentChatName;

  return (
    <main className="flex text-white">
      <div className="flex flex-col bg-[#313338] w-4/5 h-screen">
        <div className="flex items-center w-full border-b-2 border-b-[#2c2e33] h-12">
          <h2 className="flex items-center font-semibold ml-4 text-[1.1rem] text-[#dbdee1]">
            <Link to="/">
              <img className="mt-[4px]" src={logo} width={32} alt="Logo" />
            </Link>
          </h2>
        </div>

        <div className="flex flex-col items-center h-full">
          <div className="h-[35rem] w-full flex flex-col-reverse overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-[#313338] scrollbar-thumb-[#676767]">
            <ul className="ml-[7rem] mb-6">
              {messages.map((message, index) => {
                const previousMessage = messages[index - 1];
                const isSameSender = previousMessage?.sender === message.sender;

                return (
                  <li key={index}>
                    {!isSameSender && (
                      <div className="flex items-center space-x-2 mt-6">
                        <h1 className="text-lg font-semibold">
                          {message.sender}
                        </h1>
                        <p className="text-gray-500 text-xs">
                          {formatDate(message.sentAt)}
                        </p>
                      </div>
                    )}
                    <p className="text-md m-0 ml-[0.1rem] w-full max-w-[80%] break-words">
                      {message.text}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-[#383a40] h-[4.2rem] mb-6 w-[80%] flex items-center rounded-lg">
            <textarea
              className="bg-[#383a40] w-full ml-[0.75rem] outline-none resize-none scrollbar-none"
              maxLength={225}
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </div>
        </div>
      </div>

      <div className="bg-[#232428] flex flex-col items-center w-[20%] h-screen">
        <img className="mt-6" src={brand} width={182} alt="Brand" />
      </div>
    </main>
  );
}

export async function loader() {
  console.log("attempting loader");
  const response = await fetch(`${baseAPIURL}/chat/get-messages`);
  console.log("loader awaited");
  if (!response.ok) {
    console.log("Error loading messages");
    throw new Error("Failed to load messages");
  }

  const data = await response.json();
  return data;
}
