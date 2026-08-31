import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { BaseUrl } from "../utils/BaseUrl";
interface BulkUploadProps {
  setQRCodeUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BulkUpload({ setQRCodeUrls }: BulkUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!file.name.endsWith(".xlsx")) {
      setError("Only .xlsx files are allowed.");
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("bulkfile", selectedFile);

    setIsLoading(true);
    try {
      const response = await axios.post(`${BaseUrl}/bulkimports`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setQRCodeUrls(response.data.map((item: { qrCode: string }) => item.qrCode));
    } catch (err) {
      setError("Error uploading file. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Bulk Upload QR Codes</Typography>
        <Box mt={2}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ margin: "10px 0" }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>

        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={isLoading || !selectedFile}
          >
            {isLoading ? <CircularProgress size={24} /> : "Generate QR Codes"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
