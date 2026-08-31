package com.qrgenerator.qrgenerator.model.response;

public class DecryptResponse {
    private String decryptedData;

    public DecryptResponse(String decryptedData) {
        this.decryptedData = decryptedData;
    }


    public String getDecryptedData() {
        return decryptedData;
    }

    public void setDecryptedData(String decryptedData) {
        this.decryptedData = decryptedData;
    }
}
