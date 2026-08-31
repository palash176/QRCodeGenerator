package com.qrgenerator.qrgenerator.service.implementations;

import com.qrgenerator.qrgenerator.QRCodeGenerator;
import com.qrgenerator.qrgenerator.data.entities.Users;
import com.qrgenerator.qrgenerator.data.repos.UsersRepository;
import com.qrgenerator.qrgenerator.model.request.BulkRequest;
import com.qrgenerator.qrgenerator.model.request.DecryptRequest;
import com.qrgenerator.qrgenerator.model.response.BulkResponse;
import com.qrgenerator.qrgenerator.model.response.DetailResposne;
import com.qrgenerator.qrgenerator.service.QrService;
import com.qrgenerator.qrgenerator.utils.ExcelReadUtil;
import com.qrgenerator.qrgenerator.utils.ImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class QrServiceImpl implements QrService {

    private final UsersRepository usersRepository;

    private final ImageService imageService;

    private final Environment env;

    @Override
    public List<BulkResponse> bulkImportUsers(BulkRequest bulkRequest) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        log.info("Starting bulk import for file: {}", bulkRequest.getBulkfile().getOriginalFilename());
        String fileType = bulkRequest.getBulkfile().getContentType();
        if (fileType == null || (!fileType.equals("application/vnd.ms-excel") && !fileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))) {
            throw new RuntimeException("invalid file type");
        }
        List<String[]> data = ExcelReadUtil.readExcelFile(bulkRequest.getBulkfile());
        log.info("Bulk import process completed");
        return manageSuccessAndFail(data);
    }

    @Override
    public DetailResposne dycrpytdata(DecryptRequest decryptRequest) {
        String scannedData = decryptRequest.getData();
        String[] parts = scannedData.split("\\|");

        String name = parts[0];
        String dob = parts[1];
        String fatherName = parts[2];
        String pan = parts[3];
        String image = parts[4];

        return DetailResposne.builder()
                .name(name)
                .dob(dob)
                .fatherName(fatherName)
                .panNumber(pan)
                .image(image)
                .build();
    }


    private List<BulkResponse> manageSuccessAndFail(List<String[]> data) {
        List<BulkResponse> bulkResponses = new ArrayList<>();

        for (String[] row : data) {
            if (row.length == 0 || Arrays.stream(row).allMatch(String::isEmpty)) {
                continue; // Example: Skip this row
            }
            try {
                String panCardNumber = row[3]; // File name to search
                String docPath = env.getProperty("doc.path");

                String[] fileNamesToSearch = {
                        panCardNumber + ".pic",
                        panCardNumber + ".sig",
                        panCardNumber + ".jpeg"
                };

                // Load and merge images
                String[] filePaths = Arrays.stream(fileNamesToSearch)
                        .map(fileName -> new File(docPath, fileName).getAbsolutePath())
                        .toArray(String[]::new);

                BufferedImage mergedImage = mergeImages(filePaths, true); // Merge vertically

                // Compress and encode the merged image
                byte[] compressedImage = imageService.compressImage(mergedImage);
                String base64Image = imageService.encodeImageToBase64(compressedImage);

                // Save user data with the Base64 image
//                saveUser(row, base64Image);

                // Combine user data along with the Base64 image
                String combinedData = String.join("|",
                        row[0], row[2], row[1], row[3], base64Image); // Name|DOB|Father Name|PAN|Base64Image

                // Generate QR code
                String base64ImageQR = Base64.getEncoder().encodeToString(
                        QRCodeGenerator.getQRCodeImage(combinedData, 500, 500));

                BulkResponse bulkResponse = BulkResponse.builder().qrCode(base64ImageQR).build();
                bulkResponses.add(bulkResponse);
            } catch (Exception e) {
                log.error("Error processing row: " + Arrays.toString(row), e);
                throw new RuntimeException("File not found");
            }
        }
        return bulkResponses;
    }

    private BufferedImage mergeImages(String[] imagePaths, boolean isVertical) throws IOException {
        BufferedImage[] images = new BufferedImage[imagePaths.length];

        // Load images into BufferedImage array
        for (int i = 0; i < imagePaths.length; i++) {
            File imageFile = new File(imagePaths[i]);
            if (!imageFile.exists()) {
                throw new IOException("Image file not found: " + imagePaths[i]);
            }
            images[i] = ImageIO.read(imageFile);
        }

        // Calculate dimensions of the merged image
        int totalWidth = 0;
        int totalHeight = 0;
        for (BufferedImage image : images) {
            if (isVertical) {
                totalWidth = Math.max(totalWidth, image.getWidth());
                totalHeight += image.getHeight();
            } else {
                totalWidth += image.getWidth();
                totalHeight = Math.max(totalHeight, image.getHeight());
            }
        }

        // Create a new image with the calculated dimensions
        BufferedImage mergedImage = new BufferedImage(totalWidth, totalHeight, BufferedImage.TYPE_INT_RGB);
        Graphics g = mergedImage.getGraphics();

        // Draw each image onto the merged image
        int currentX = 0;
        int currentY = 0;
        for (BufferedImage image : images) {
            g.drawImage(image, currentX, currentY, null);
            if (isVertical) {
                currentY += image.getHeight();
            } else {
                currentX += image.getWidth();
            }
        }

        g.dispose();
        return mergedImage;
    }


//    private void saveUser(String[] row, String base64Image) {
//        Users user = new Users();
//        user.setName(row[0]); // Name
//        user.setFatherName(row[1]); // FatherName
//        user.setDob(row[2]); // DOB
//        user.setPanCard(row[3]); // PanCard
//        user.setFilePath(base64Image);
//        usersRepository.save(user);
//    }
}
