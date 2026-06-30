import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiSend } from "react-icons/fi";
import { io } from "socket.io-client";

function Chat() {
  const { conversationId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
//   const socket = io("http://localhost:5000");
const socket = io(import.meta.env.VITE_SOCKET_URL);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {

  socket.on("receiveMessage", (newMessage) => {

    if (newMessage.conversation === conversationId) {

      setMessages((prev) => [...prev, newMessage]);

    }

  });

  return () => {
    socket.off("receiveMessage");
  };

}, [conversationId]);

  const fetchMessages = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        `/chat/messages/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages(res.data.messages);

    } catch (error) {

      console.log(error);

    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat/send",
        {
          conversationId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");

      // setMessages((prev) => [...prev, res.data.message]);

    } catch (error) {

      console.log(error);

    }
  };


    return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="bg-blue-600 text-white p-6">

            <h1 className="text-2xl font-bold">
              Chat with Seller
            </h1>

            <p className="text-blue-100 text-sm mt-1">
              Send your message instantly
            </p>

          </div>
          

          {/* Messages */}

          <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">

            {messages.length === 0 ? (

              <div className="flex justify-center items-center h-full">

                <p className="text-gray-400">
                  Start your conversation...
                </p>

              </div>

            ) : (

                

             messages.map((msg) => {

  const isMyMessage =
  String(msg.sender?._id) === String(user?.id);

  return (

    

                <div
                  key={msg._id}
                  className={`flex mb-4 ${
                    isMyMessage
  ? "justify-end"
  : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${
                      isMyMessage
  ? "bg-blue-600 text-white rounded-br-none"
  : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p
  className={`text-xs font-semibold mb-1 ${
    isMyMessage ? "text-blue-100" : "text-blue-600"
  }`}
>
  {isMyMessage ? "You" : msg.sender?.name}
</p>
                    <p>{msg.text}</p>

                    <p
                      className={`text-xs mt-2 ${
                        isMyMessage
  ? "text-blue-100"
  : "text-gray-400"
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>

                  </div>

                </div>

              );

})

)}

          </div>

                    {/* Input Box */}

          <div className="border-t bg-white p-5">

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                className="flex-1 border rounded-xl px-5 py-3 outline-none focus:border-blue-500"
              />

              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-xl flex items-center justify-center transition"
              >
                <FiSend size={22} />
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Chat;