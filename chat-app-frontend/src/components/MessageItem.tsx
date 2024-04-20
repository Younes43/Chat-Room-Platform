// MessageItem.tsx
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import axios from "axios";
import { blue, red } from "@mui/material/colors";
import { IMessage } from "../types";

interface MessageItemProps {
  message: IMessage;
  onUpdate: (updatedMessage: IMessage) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onUpdate }) => {
  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/messages/${message._id}/${voteType}`
      );
      if (response.status === 200) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Chip
          avatar={<Avatar>{message.user.charAt(0)}</Avatar>}
          label={message.user}
          color="primary"
          variant="outlined"
          sx={{ mb: 1 }}
        />
        <Typography variant="body1" sx={{ mb: 1 }}>
          {message.text}
        </Typography>
        <IconButton
          onClick={() => handleVote("upvote")}
          size="small"
          sx={{ color: blue[500] }}
        >
          <ThumbUpIcon fontSize="small" /> {message.upvotes}
        </IconButton>
        <IconButton
          onClick={() => handleVote("downvote")}
          size="small"
          sx={{ color: red[500] }}
        >
          <ThumbDownIcon fontSize="small" /> {message.downvotes}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MessageItem;
