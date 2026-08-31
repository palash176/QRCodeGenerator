// VisitingCard component
import React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import "./LabelCard.scss";

type VisitingCardProps = {
  qrCodeUrl: string;
  logoUrl: string;
  name: string;
  title: string;
  description: string;
  setIsQrCodeLoaded: (loaded: boolean) => void;
};

const VisitingCard: React.FC<VisitingCardProps> = ({
  qrCodeUrl,
  logoUrl,
  name,
  title,
  description,
  setIsQrCodeLoaded,
}) => {
  const handleImageLoad = () => {
    setIsQrCodeLoaded(true);
  };

  return (
    <Box className="visiting-card">
      <CardContent>
        <Box className="Label-card">
          <Box className='Label-card-contentarea'>
            <Box className="logo-container">
              <img className="labellogo" src={logoUrl} alt="Logo" />
            </Box>
            <Box className="name-container">
              <Typography variant="h6" className="name">
                {name}
              </Typography>
            </Box>
            <Box className="details">
              <Typography variant="h6" className="title">
                {title}
              </Typography>
              <Typography variant="body2" className="description">
                {description}
              </Typography>
            </Box>
          </Box>
          <Box className="content">
            {qrCodeUrl ? (
              <Box className="qr-code">
                <img src={qrCodeUrl} alt="QR Code" onLoad={handleImageLoad} />
              </Box>
            ) : (
              <Box className="qr-code-placeholder">
                <Typography variant="body2">
                  Your QR code will appear here
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Box>
  );
};

export default VisitingCard;
