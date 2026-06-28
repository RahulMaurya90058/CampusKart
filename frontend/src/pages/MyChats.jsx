import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyChats() {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.get(
        "/chat/my-chats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setConversations(res.data.conversations);

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

            <h1 className="text-3xl font-bold">
              💬 My Chats
            </h1>

            <p className="text-blue-100 mt-2">
              View all your conversations
            </p>

          </div>

          {/* Chat List */}

          <div className="divide-y">

            {conversations.length === 0 ? (

              <div className="text-center py-16 text-gray-500">

                No Conversations Yet

              </div>

            ) : (

              conversations.map((chat) => {

                const otherUser = chat.members.find(
                  (member) => member._id !== user._id
                );

                return (

                  <div
                    key={chat._id}
                    onClick={() =>
                      navigate(`/chat/${chat._id}`)
                    }
                    className="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer transition"
                  >

                    {/* Avatar */}

                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">

                      {otherUser?.name?.charAt(0).toUpperCase()}

                    </div>

                    {/* Chat Info */}

                    <div className="flex-1">

                      <h2 className="font-bold text-lg">

                        {otherUser?.name}

                      </h2>

                      <p className="text-gray-500 text-sm mt-1">

                        {chat.product?.title}

                      </p>

                    </div>

                    {/* Price */}

                    <div className="text-right">

                      <p className="font-bold text-green-600">

                        ₹{chat.product?.price}

                      </p>

                    </div>

                  </div>

                );

              })

            )}

          </div>

        </div>

      </div>
            <Footer />

    </>
  );
}

export default MyChats;