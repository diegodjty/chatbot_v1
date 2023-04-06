import { useState, useEffect } from "react";
import axios from "axios";
import Animation from "@/components/Animation";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setChatLog((prevChatlog) => [
      ...prevChatlog,
      { type: "user", message: inputValue },
    ]);
    sendMessage(inputValue);
    setInputValue("");
  };

  const sendMessage = (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { type: "bot", message: response.data.choices[0].message.content },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto max-w-[700px] ">
      <div className="flex flex-col h-screen bg-gray-900">
        <h1 className="text-red-500 text-center py-3 font-bold text-6xl">
          ChatBot
        </h1>
        <div className="flex-grow p-6">
          <div className="flex flex-col space-y-4">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    message.type === "user" ? "bg-red-500" : "bg-gray-800"
                  } rounded-lg text-white p-4 max-w-sm`}
                >
                  {message.message}
                </div>
              </div>
            ))}
            {isLoading && (
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-red-800 rounded-lg p-4 text-white max-w-sm">
                  <Animation />
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
            />

            <button
              type="submit"
              className="bg-red-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-red-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
