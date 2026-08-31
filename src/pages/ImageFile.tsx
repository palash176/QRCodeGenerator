
// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import axios from "axios";
// import { BaseUrl } from "../utils/BaseUrl";

// interface ImageProps {
//   setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function ImageFile({ setQRCodeUrl }: ImageProps) {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [size, setSize] = useState("350x350"); // Default size
//   const [error, setError] = useState<string | null>(null);

//   const [name, setName] = useState<string>("");
//   const [fatherName, setFatherName] = useState<string>("");
//   const [dob, setDob] = useState<string>(""); // Format: YYYY-MM-DD
//   const [panCard, setPanCard] = useState<string>("");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (!file) {
//       setError("No file selected.");
//       return;
//     }

//     if (file.size > 1048) {
//       setError("File size exceeds 1KB. Please select a smaller file.");
//       setSelectedImage(null);
//       return;
//     }

//     setError(null);
//     setSelectedImage(file);
//   };

//   const handleUpload = () => {
//     if (!selectedImage) {
//       setError("Please select an image first.");
//       return;
//     }

//     if (!name || !fatherName || !dob || !panCard) {
//       setError("All fields are required.");
//       return;
//     }

//     setError(null);

//     const sizeParts = size.split("x");
//     const width = Number(sizeParts[0]);
//     const height = Number(sizeParts[1]);

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64String = reader.result as string;

//       // Generate vCard data string
//       const vCardData = `BEGIN:VCARD
// VERSION:3.0
// NAME:${name}
// FNAME:${fatherName}
// BDAY:${dob}
// PAN:${panCard}
// PHOTO;ENCODING=BASE64;TYPE=JPEG:${base64String}
// END:VCARD`;

//       const qrCodeEndpoint = `${BaseUrl}/generateQRCode?codeText=${encodeURIComponent(
//         vCardData
//       )}&width=${width}&height=${height}`;

//       axios
//         .get(qrCodeEndpoint, { responseType: "text" })
//         .then((response) => {
//           const base64Image = response.data;
//           const imageUrl = `data:image/png;base64,${base64Image}`;
//           setQRCodeUrl(imageUrl);
//         })
//         .catch((error) => {
//           console.error("Error generating QR code:", error);
//         });
//     };

//     reader.readAsDataURL(selectedImage);
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6">Upload Details for QR Code</Typography>

//         <Box mt={2}>
//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Father's Name"
//             variant="outlined"
//             fullWidth
//             value={fatherName}
//             onChange={(e) => setFatherName(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Date of Birth"
//             type="date"
//             variant="outlined"
//             fullWidth
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//             margin="normal"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             label="PAN Card Number"
//             variant="outlined"
//             fullWidth
//             value={panCard}
//             onChange={(e) => setPanCard(e.target.value)}
//             margin="normal"
//           />
//         </Box>

//         <Box mt={2}>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={{ margin: "10px 0" }}
//           />
//           {error && (
//             <Typography color="error" variant="body2">
//               {error}
//             </Typography>
//           )}
//         </Box>

//         {selectedImage && (
//           <Box mt={2}>
//             <Typography variant="body2">
//               Selected file: {selectedImage.name}
//             </Typography>
//             <Typography variant="body2">
//               File size: {(selectedImage.size / 1024).toFixed(2)} KB
//             </Typography>
//           </Box>
//         )}

//         <Box mt={3} display="flex" alignItems="center">
//           <Typography variant="body1" sx={{ marginRight: 1 }}>
//             Select size:
//           </Typography>
//           <Select
//             value={size}
//             onChange={(e) => setSize(e.target.value)}
//             variant="filled"
//             size="small"
//             sx={{ minWidth: 120 }}
//           >
//             <MenuItem value="200x200">200x200</MenuItem>
//             <MenuItem value="300x300">300x300</MenuItem>
//             <MenuItem value="350x350">350x350</MenuItem>
//             <MenuItem value="400x400">400x400</MenuItem>
//             <MenuItem value="500x500">500x500</MenuItem>
//           </Select>
//         </Box>

//         <Box mt={3}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleUpload}
//             disabled={!selectedImage || !!error}
//           >
//             Upload and Generate QR Code
//           </Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }




import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";

interface ImageProps {
  setQRCodeUrl: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageFile({ setQRCodeUrl }: ImageProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [size, setSize] = useState("350x350"); // Default size
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState<string>("");
  const [fatherName, setFatherName] = useState<string>("");
  const [dob, setDob] = useState<string>(""); // Format: YYYY-MM-DD
  const [pan, setPan] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (file.size > 1048) {
      setError("File size exceeds 1KB. Please select a smaller file.");
      setSelectedImage(null);
      return;
    }

    setError(null);
    setSelectedImage(file);
  };

  const handleUpload = () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    if (!name || !fatherName || !dob || !pan) {
      setError("All fields are required.");
      return;
    }

    setError(null);

    const sizeParts = size.split("x");
    const width = Number(sizeParts[0]);
    const height = Number(sizeParts[1]);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      // Prepare the detail request body
      const detailRequest = {
        name: name,
        fatherName: fatherName,
        dob: dob,
        panCard: pan,
        image: base64String,
        width:width,
        height:height
      };

      axios
        .post(`${BaseUrl}/generateQRCode`, detailRequest)
        .then((response) => {
          const base64Image = response.data;
          const imageUrl = `data:image/png;base64,${base64Image}`;
          setQRCodeUrl(imageUrl);
        })
        .catch((error) => {
          console.error("Error generating QR code:", error);
        });
    };

    reader.readAsDataURL(selectedImage);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Upload Details for QR Code</Typography>

        <Box mt={2}>
          <TextField
            label="FullName"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Father's Name"
            variant="outlined"
            fullWidth
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="PAN Card Number"
            variant="outlined"
            fullWidth
            value={pan}
            onChange={(e) => setPan(e.target.value)}
            margin="normal"
          />
        </Box>

        <Box mt={2}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ margin: "10px 0" }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>

        {selectedImage && (
          <Box mt={2}>
            <Typography variant="body2">
              Selected file: {selectedImage.name}
            </Typography>
            <Typography variant="body2">
              File size: {(selectedImage.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
        )}

        <Box mt={3} display="flex" alignItems="center">
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
            <MenuItem value="350x350">350x350</MenuItem>
            <MenuItem value="400x400">400x400</MenuItem>
            <MenuItem value="500x500">500x500</MenuItem>
          </Select>
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!selectedImage || !!error}
          >
            Upload and Generate QR Code
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
