import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  IconButton,
  Card,
  CardContent,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";

interface Field {
  id: number;
  value: string;
}

interface MultiUrlProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

const MultiUrl: React.FC<MultiUrlProps> = ({ setQRCodeUrl }) => {
  const [fields, setFields] = useState<Field[]>([{ id: 0, value: "" }]);
  const [size, setSize] = useState("300x300"); // Default size

  const handleInputChange = (id: number, value: string) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  const handleAddField = () => {
    const newField: Field = { id: fields.length, value: "" };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: number) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  const handleGenerateQR = () => {
    const url = `${BaseUrl}/generateQRCode`;
    const inputStrings = fields.map((field) => field.value).join(",");

    const sizeParts = size.split("x");
    const width = Number(sizeParts[0]);
    const height = Number(sizeParts[1]);

    const qrCodeEndpoint = `${url}?codeText=${encodeURIComponent(inputStrings)}&width=${width}&height=${height}`;

  axios
    .get(qrCodeEndpoint, { responseType: "text" }) // Expecting base64 string from backend
    .then((response) => {
      const base64Image = response.data; // Assuming the backend returns a base64 encoded image
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setQRCodeUrl(imageUrl); // Set the QR code image URL for display
    })
    .catch((error) => {
      console.error("Error generating QR code:", error);
    });
  };

  return (
    <Card>
      <CardContent>
        {fields.map((field) => (
          <Box key={field.id} display="flex" alignItems="center" mb={2}>
            <FormControl fullWidth>
              <InputLabel shrink={false} htmlFor={`rl-${field.id}`}></InputLabel>
              <TextField
                id={`rl-${field.id}`}
                type="text"
                label="URL/Website/Social"
                variant="standard"
                value={field.value}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            </FormControl>
            <IconButton onClick={handleAddField}>
              <AddIcon />
            </IconButton>
            {fields.length > 1 && (
              <IconButton onClick={() => handleRemoveField(field.id)}>
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Box display="flex" alignItems="center" mb={2}>
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
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleGenerateQR} variant="contained" color="success">
            Generate QR Code
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MultiUrl;
