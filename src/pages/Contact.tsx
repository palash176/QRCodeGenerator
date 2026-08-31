import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";

interface ContactProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function Contact({ setQRCodeUrl }: ContactProps) {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    mobilePhone: "",
    fax: "",
    street: "",
    city: "",
    region: "",
    postcode: "",
    country: "",
    url: "",
  });
  const [size, setSize] = useState("300x300"); // Default size



const handleGenerateQR = () => {
  const url = `${BaseUrl}/generateQRCode`;
  const inputString = `BEGIN:VCARD
VERSION:3.0
N:${contactData.lastName};${contactData.firstName}
ORG:${contactData.organization}
TITLE:${contactData.title}
EMAIL:${contactData.email}
TEL:${contactData.phone}
TEL;CELL:${contactData.mobilePhone}
TEL;FAX:${contactData.fax}
ADR;TYPE=HOME:;;${contactData.street};${contactData.city};${contactData.region};${contactData.postcode};${contactData.country}
URL:${contactData.url}
END:VCARD`;

  const sizeParts = size.split("x");
  const width = Number(sizeParts[0]);
  const height = Number(sizeParts[1]);

  const qrCodeEndpoint = `${url}?codeText=${encodeURIComponent(
    inputString
  )}&width=${width}&height=${height}`;

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContactData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption">
            Show contact details when scanned.
          </Typography>
        </Box>
        <form
          noValidate
          autoComplete="off"
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="firstName"
              label="First Name"
              fullWidth
              value={contactData.firstName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="lastName"
              label="Last Name"
              fullWidth
              value={contactData.lastName}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="organization"
              label="Organization"
              fullWidth
              value={contactData.organization}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="title"
              label="Title"
              fullWidth
              value={contactData.title}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="email"
              label="Email"
              fullWidth
              value={contactData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="phone"
              label="Phone"
              fullWidth
              value={contactData.phone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="mobilePhone"
              label="Mobile Phone"
              fullWidth
              value={contactData.mobilePhone}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="fax"
              label="Fax"
              fullWidth
              value={contactData.fax}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="street"
              label="Street"
              fullWidth
              value={contactData.street}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="city"
              label="City"
              fullWidth
              value={contactData.city}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="region"
              label="Region"
              fullWidth
              value={contactData.region}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="postcode"
              label="Postcode"
              fullWidth
              value={contactData.postcode}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="country"
              label="Country"
              fullWidth
              value={contactData.country}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <TextField
              variant="standard"
              name="url"
              label="URL/Website/Social"
              fullWidth
              value={contactData.url}
              onChange={handleChange}
            />
          </FormControl>
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
            <Button
              onClick={handleGenerateQR}
              variant="contained"
              color="success"
              sx={{ m: 2 }}
            >
              Generate QR Code
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
