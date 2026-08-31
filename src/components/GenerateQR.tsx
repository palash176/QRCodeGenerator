import React, { useState, useRef } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import URL from ".././pages/URL";
import MultiUrl from "../pages/MultiUrl";
import FreeText from "../pages/FreeText";
import Contact from "../pages/Contact";
import Email from "../pages/Email";
import Phone from "../pages/Phone";
import BulkUpload from "../pages/BulkUpload";
import VisitingCard from "../pages/LabelCard";
import html2canvas from "html2canvas";
import { FaDownload, FaEye,FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dkg_logo from "../assests/images/dkg_logo.png";
import {
  CardContent,
  Card,
  Typography,
  Box,
  Tab,
  Button,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditLabel from "../pages/EditLabel";
import "./GenerateQR.scss";
import ImageFile from "../pages/ImageFile";
type GenerateQRProps = {};

export default function GenerateQR(props: GenerateQRProps) {
  const [value, setValue] = useState("1");
  const [qrCodeUrl, setQRCodeUrl] = useState("");
  const [qrCodeUrls, setQRCodeUrls] = useState<string[]>([]);
  const qrCodeRef = useRef(null);
  const labelCard = useRef(null);
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  const [name, setName] = useState("Company Name");
  const [title, setTitle] = useState("Title");
  const [isQrCodeLoaded, setIsQrCodeLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const totalPages = Math.ceil(qrCodeUrls.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = qrCodeUrls.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const [description, setDescription] = useState(
    "Some description about yourself"
  );
  console.log(qrCodeUrl);
  const [logoUrl, setLogoUrl] = useState(dkg_logo);
  const handleNameChange = (value: string) => {
    setName(value);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogoChange = (fileOrUrl: File | string) => {
    if (typeof fileOrUrl === "string") {
      setLogoUrl(fileOrUrl);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setLogoUrl(dataUrl);
      };
      reader.readAsDataURL(fileOrUrl);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qr_code.png";
    link.click();
  };

  const handlePrint = () => {
    setPrintDialogOpen(true);
  };

  const handleClosePrintDialog = () => {
    setPrintDialogOpen(false);
  };

  const handlePrintDialogPrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        `<img src="${qrCodeUrl}" onload="window.print();window.close()" />`
      );
      printWindow.document.close();
    }
  };

  const handleDownloadLabelCard = () => {
    console.log(isQrCodeLoaded);
    const input = labelCard.current;
    if (input) {
      html2canvas(input, { width: 560, height: 350 }).then((canvas) => {
        const image = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = image;
        link.download = "visiting_card.png";
        link.click();
      });
    }
  };
  const handleDownloadQr = (url: string) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${url}`;
    link.download = "qr_code.png";
    link.click();
  };

  const handlePreview = (url: string) => {
    const printWindow = window.open();
    if (printWindow) {
      printWindow.document.write("<html><body>");
      printWindow.document.write(
        "<img src='" + `data:image/png;base64,${url}` + "'/>"
      );
      printWindow.document.write("</body></html>");
      printWindow.document.close();
    }
  };

  const handlePrintLabelCard = () => {
    const input = labelCard.current;
    if (input) {
      html2canvas(input, { width: 560, height: 350 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        const img = new Image();
        img.src = imgData;

        img.onload = () => {
          const printWindow = window.open();
          if (printWindow) {
            printWindow.document.write("<html><body>");
            printWindow.document.write("<img src='" + imgData + "'/>");
            printWindow.document.write("</body></html>");
            printWindow.document.close();

            printWindow.print();
          }
        };
      });
    }
  };

  return (
    <>
      <Box
        className="qr-tab-image"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Box
          className="qr-tab-area-content"
          sx={{ width: "50%", typography: "body1" }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="lab API tabs example"
                sx={{ overflow: "scroll ", border: "1px solid gray" }}
              >
                <Tab label="URL" value="1" />
                <Tab label="MULTI-URL" value="2" />
                <Tab label="FREE TEXT" value="3" />
                <Tab label="CONTACT" value="4" />
                <Tab label="EMAIL" value="5" />
                <Tab label="PHONE" value="6" />
                <Tab label="IMAGE" value="7" />
                <Tab label="Bulk Upload" value="8" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <URL setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="2">
              <MultiUrl setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="3">
              <FreeText setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="4">
              <Contact setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="5">
              <Email setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="6">
              <Phone setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="7">
              <ImageFile setQRCodeUrl={setQRCodeUrl} />
            </TabPanel>
            <TabPanel value="8">
              <BulkUpload setQRCodeUrls={setQRCodeUrls} />
              <Box mt={3}>
                <Typography variant="h6">Generated QR Codes:</Typography>
                {qrCodeUrls.length > 0 ? (
                  <>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: 2,
                        justifyItems: "center",
                      }}
                    >
                      {currentItems.map((url, index) => (
                        <Box key={index} sx={{ textAlign: "center" }}>
                          <img
                            src={`data:image/png;base64,${url}`}
                            alt={`QR Code ${index + 1}`}
                            width={200}
                            height={200}
                          />
                          <Box
                            mt={1}
                            display="flex"
                            justifyContent="center"
                            gap={2}
                          >
                            <FaDownload
                              onClick={() => handleDownloadQr(url)}
                              style={{ cursor: "pointer" }}
                            />
                            <FaEye
                              onClick={() => handlePreview(url)}
                              style={{ cursor: "pointer" }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    <Box
                      mt={3}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <IconButton
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        sx={{
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                          color: currentPage === 1 ? "gray" : "primary.main",
                        }}
                      >
                        <FaChevronLeft />
                      </IconButton>

                      <Typography variant="body2">
                        Page {currentPage} of {totalPages}
                      </Typography>

                      <IconButton
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        sx={{
                          cursor:
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer",
                          color:
                            currentPage === totalPages
                              ? "gray"
                              : "primary.main",
                        }}
                      >
                        <FaChevronRight />
                      </IconButton>
                    </Box>
                  </>
                ) : (
                  <Typography variant="body2">
                    No QR Codes generated yet.
                  </Typography>
                )}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
        <Card
          sx={{
            width: "auto",
            height: "fit-content",
            textAlign: "center",
          }}
        >
          <CardContent>
            {qrCodeUrl ? (
              <>
                <img src={qrCodeUrl} alt="QR Code" ref={qrCodeRef} />
                <Box>
                  <Button variant="contained" onClick={handleDownload}>
                    Download
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handlePrint}
                    sx={{ ml: 2 }}
                  >
                    Print
                  </Button>
                </Box>
              </>
            ) : (
              <Box className="qr-code-placeholder">
                <Typography variant="body2">
                  Your QR code will appear here
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
        <Dialog open={printDialogOpen} onClose={handleClosePrintDialog}>
          <DialogTitle>Print QR Code</DialogTitle>
          <DialogContent>
            <img
              src={qrCodeUrl}
              alt="QR Code"
              onLoad={handlePrintDialogPrint}
            />
          </DialogContent>
        </Dialog>
      </Box>

      <Card
        className="qr-visitingcard-area"
        sx={{
          mt: 2,
          width: "auto",
          height: "fit-content",
          textAlign: "center",
          float: "left",
          overflow: "scroll",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ float: "left", marginBottom: "5px" }}>
            {" "}
            <b>Design Your Own Label</b>
          </Typography>
          <div
            style={{ padding: "1rem" }}
            id="label-VisitingCard"
            ref={labelCard}
          >
            <VisitingCard
              qrCodeUrl={qrCodeUrl}
              logoUrl={logoUrl}
              name={name}
              title={title}
              description={description}
              setIsQrCodeLoaded={setIsQrCodeLoaded}
            />
          </div>
          <Box sx={{ m: "1rem" }}>
            <Button variant="contained" onClick={handleDownloadLabelCard}>
              Download Card
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handlePrintLabelCard}
            >
              Print Card
            </Button>
          </Box>
        </CardContent>

        <CardContent>
          <EditLabel
            logoUrl={logoUrl}
            name={name}
            title={title}
            description={description}
            onNameChange={handleNameChange}
            onTitleChange={handleTitleChange}
            onDescriptionChange={handleDescriptionChange}
            onLogoChange={handleLogoChange}
          />
        </CardContent>
      </Card>
    </>
  );
}
