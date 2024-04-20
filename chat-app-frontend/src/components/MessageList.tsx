import React from "react";
import { Container, Typography } from "@mui/material";
import MessageItem from "./MessageItem";
import { IMessage } from "../types";

interface MessageListProps {
  messages: IMessage[];
  onUpdateMessage: (updatedMessage: IMessage) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  onUpdateMessage,
}) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
        Chat Messages
      </Typography>
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          message={message}
          onUpdate={onUpdateMessage}
        />
      ))}
    </Container>
  );
};

export default MessageList;
