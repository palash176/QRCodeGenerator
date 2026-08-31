import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";

interface EmailProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Email({ setQRCodeUrl }: EmailProps) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [size, setSize] = useState("300x300"); // Default size

  const handleGenerateQR = () => {
    const url = `${BaseUrl}/generateQRCode`;
    const emailAddress = encodeURIComponent(email);
    const emailSubject = encodeURIComponent(subject);
    const emailMessage = encodeURIComponent(message);
    const inputStrings = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailMessage}`;

    const sizeParts = size.split("x");
    const width = Number(sizeParts[0]);
    const height = Number(sizeParts[1]);

    const qrCodeEndpoint = `${url}?codeText=${encodeURIComponent(inputStrings)}&width=${width}&height=${height}`;

    axios
      .get(qrCodeEndpoint, { responseType: "text" })
      .then((response) => {
        const base64Image = response.data;
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setQRCodeUrl(imageUrl);
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      });
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption">
            Open a new email compose draft when scanned.
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email-address"
            sx={{ mb: 2 }}
            color="success"
            type="email"
            label="Email address"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="subject"
            sx={{ mb: 2 }}
            color="success"
            type="text"
            label="Subject"
            variant="standard"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextField
            id="message"
            sx={{ mb: 2 }}
            color="success"
            type="text"
            label="Message"
            variant="standard"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Select size:
          </Typography>
          <Select
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            variant="filled"
            label="Size"
          size="small"
            sx={{ minWidth: 120, }}
          >
            <MenuItem value="200x200">200x200</MenuItem>
            <MenuItem value="300x300">300x300</MenuItem>
            <MenuItem value="400x400">400x400</MenuItem>
            <MenuItem value="500x500">500x500</MenuItem>
            {/* Add more size options as needed */}
          </Select>
          <Button
            onClick={handleGenerateQR}
            variant="contained"
            color="success"
            sx={{ marginLeft: 2 }}
          >
            Generate QR Code
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
