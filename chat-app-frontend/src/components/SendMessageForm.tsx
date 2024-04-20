import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface ISendMessageFormProps {
  onSendMessage: (message: string) => void;
}

const SendMessageForm: React.FC<ISendMessageFormProps> = ({
  onSendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Send
      </Button>
    </form>
  );
};

export default SendMessageForm;
