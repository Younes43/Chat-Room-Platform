import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import { IMessage } from "../types";
import { useAuth } from "../context/AuthContext";

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get<IMessage[]>(
        "http://localhost:3000/api/messages"
      );
      console.log("Messages fetched successfully:", data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleUpdateMessage = (updatedMessage: IMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === updatedMessage._id ? { ...msg, ...updatedMessage } : msg
      )
    );
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;
    if (!user || !user.username) {
      console.error("Authentication error: No user information available.");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/messages", {
        text: messageText,
        username: user.username,
      });
      setMessages([...messages, data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <SendMessageForm onSendMessage={handleSendMessage} />
      <MessageList messages={messages} onUpdateMessage={handleUpdateMessage} />
    </Box>
  );
};

export default ChatRoom;
