import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import "./EditingPanel.scss";

type EditingPanelProps = {
  name: string;
  title: string;
  description: string;
  logoUrl: string;
  onNameChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onLogoChange: (fileOrUrl: File | string) => void;
};

const EditingPanel: React.FC<EditingPanelProps> = ({
  name,
  title,
  description,
  logoUrl,
  onNameChange,
  onTitleChange,
  onDescriptionChange,
  onLogoChange,
}) => {
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string>(logoUrl);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // User selected a file, upload and set the new logo URL
      onLogoChange(file);
    } else {
      // User input a URL, set the new logo URL
      const url = event.target.value;
      setCurrentLogoUrl(url);
      onLogoChange(url);
    }
  };

  return (
    <Box className="editing-panel">
      <Box>
        <TextField
          className="text-field-edit"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          inputProps={{ maxLength: 25 }}
        />
        <TextField
          className="text-field-edit"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          inputProps={{ maxLength: 25 }}
        />
        <TextField
          className="text-field-edit"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          multiline
          rows={4}
          inputProps={{ maxLength: 100 }}
        />
      </Box>
      <Box>
        <Box className="logo-container">
          <div className="logo">
            <img src={currentLogoUrl} alt="Logo" />
          </div>
          <label className="upload-button" htmlFor="logo-upload">
            Change Logo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            style={{ display: "none" }}
            id="logo-upload"
          />
        </Box>
        <TextField
          className="text-field-edit"
          label="Logo URL"
          variant="outlined"
          value={currentLogoUrl}
          onChange={(e) => setCurrentLogoUrl(e.target.value)}
        />
        <Button
          className="upload-button"
          variant="contained"
          onClick={() => onLogoChange(currentLogoUrl)}
        >
          Set Logo URL
        </Button>
      </Box>
    </Box>
  );
};

export default EditingPanel;
