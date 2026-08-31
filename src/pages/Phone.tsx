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

interface PhoneProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Phone({ setQRCodeUrl }: PhoneProps) {
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("300x300"); // Default size

  const sizeParts = size.split("x");
  const width = Number(sizeParts[0]);
  const height = Number(sizeParts[1]);

  const handleGenerateQR = () => {
    const qrCodeEndpoint = `${BaseUrl}/generateQRCode?codeText=${encodeURIComponent(phone)}&width=${width}&height=${height}`;

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
        <Box flex={1} mr={2}>
          <TextField
            id="standard-basic"
            label="Enter Phone Number"
            variant="standard"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Typography variant="caption">
            Phone number to call when scanned, e.g. +1234567890
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Select size:
          </Typography>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            variant="filled"
            size="small"
            sx={{ minWidth: 120 }}
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
            sx={{ m: 2 }}
          >
            Generate QR Code
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
