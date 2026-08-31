import React, { useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { BaseUrl } from "../utils/BaseUrl";
import axios from "axios";

interface FreeTextProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FreeText: React.FC<FreeTextProps> = ({ setQRCodeUrl }) => {
  const [size, setSize] = useState("300x300"); // Default size

  const generateQRCode = () => {
    const url = `${BaseUrl}/generateQRCode`;
    const inputString = (
      document.getElementById("standard-multiline-static") as HTMLInputElement
    ).value;

    const sizeParts = size.split("x");
    const width = Number(sizeParts[0]);
    const height = Number(sizeParts[1]);

    const qrCodeEndpoint = `${url}?codeText=${encodeURIComponent(
      inputString
    )}&width=${width}&height=${height}`;

    axios
      .get(qrCodeEndpoint, { responseType: "text" }) // Set responseType to arraybuffer
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
        <Typography variant="caption">Show Message when scanned.</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-multiline-static"
            label="Enter Text Here..."
            multiline
            rows={5}
            variant="standard"
          />
          <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="body1">Select size: </Typography>
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              variant="filled"
              label="Size"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="200x200">200x200</MenuItem>
              <MenuItem value="300x300">300x300</MenuItem>
              <MenuItem value="400x400">400x400</MenuItem>
              <MenuItem value="500x500">500x500</MenuItem>
              {/* Add more size options as needed */}
            </Select>
            <Button
              onClick={generateQRCode}
              variant="contained"
              color="success"
              sx={{ marginLeft: 2 }}
            >
              Generate QR Code
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FreeText;
