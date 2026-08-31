package com.qrgenerator.qrgenerator;

import com.qrgenerator.qrgenerator.model.request.BulkRequest;
import com.qrgenerator.qrgenerator.model.request.DecryptRequest;
import com.qrgenerator.qrgenerator.model.request.DetailRequest;
import com.qrgenerator.qrgenerator.model.response.BulkResponse;
import com.qrgenerator.qrgenerator.model.response.DecryptResponse;
import com.qrgenerator.qrgenerator.model.response.DetailResposne;
import com.qrgenerator.qrgenerator.service.QrService;
import com.qrgenerator.qrgenerator.utils.VCardUtils;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.List;

@CrossOrigin
@RestController
@Slf4j
@Validated
@AllArgsConstructor
public class QRCodeController {

    private final QrService qrService;
@GetMapping("/generateQRCode")
    public ResponseEntity<String> generateQRCode(
            @RequestParam("codeText") String codeText,
            @RequestParam("width") Integer width,
            @RequestParam("height") Integer height) {
        try {
            if (width <= 0 || height <= 0) {
                return ResponseEntity.badRequest().body("Width and height must be positive integers.");
            }
            String base64Image = Base64.getEncoder().encodeToString(
                    QRCodeGenerator.getQRCodeImage(codeText, width, height));
            return ResponseEntity.ok(base64Image);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected server error: " + e.getMessage());
        }
    }


@PostMapping("/generateQRCode")
    public ResponseEntity<String> generateQRCode(@RequestBody DetailRequest detailRequest) {
        try {

            String name = detailRequest.getName();
            String fatherName =detailRequest.getFatherName();
            String dob = detailRequest.getDob();
            String panCard = detailRequest.getPanCard();
            String image = detailRequest.getImage();

            String combinedData = String.join("|",
                    name, dob, fatherName, panCard, image);

            byte[] qrCodeImage = QRCodeGenerator.getQRCodeImage(combinedData, detailRequest.getWidth(), detailRequest.getHeight()); // You can adjust width and height

            String base64Image = Base64.getEncoder().encodeToString(qrCodeImage);

            return ResponseEntity.ok(base64Image);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Unexpected server error: " + e.getMessage());
        }
    }

    @PostMapping("/decrypt")
    public ResponseEntity<DecryptResponse> decrypt(@RequestBody DecryptRequest decryptRequest) {
        try {
            String scannedData = decryptRequest.getData();
            System.out.println("Scanned Data: " + scannedData);
            JSONObject vCardJson = VCardUtils.parseVCardToJson(scannedData);
            DecryptResponse response = new DecryptResponse(vCardJson.toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new DecryptResponse("Error reading QR data: " + e.getMessage()));
        }

    }

    @PostMapping("/bulkimports")
    public ResponseEntity<List<BulkResponse>> bulkImportSip(@Validated @ModelAttribute BulkRequest bulkRequest) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
        log.info("Starting bulk import SIP process.");
        List<BulkResponse> bulkResponse = qrService.bulkImportUsers(bulkRequest);
        log.info("Bulk import SIP process completed.");
        return new ResponseEntity<>(bulkResponse, HttpStatus.OK);
    }


    @PostMapping("/decrypt/data")
    public ResponseEntity<DetailResposne> dycrpytdata(@RequestBody DecryptRequest decryptRequest) {
        DetailResposne dycrpytdata = qrService.dycrpytdata(decryptRequest);
        DetailResposne resposne = DetailResposne.builder()
                .name(dycrpytdata.getName())
                .dob(dycrpytdata.getDob())
                .fatherName(dycrpytdata.getFatherName())
                .panNumber(dycrpytdata.getPanNumber())
                .image(dycrpytdata.getImage())
                .build();
        return new ResponseEntity<>(resposne, HttpStatus.OK);
    }

}
