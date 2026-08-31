package com.qrgenerator.qrgenerator.utils;
import com.qrgenerator.qrgenerator.model.response.VCardResponse;
import org.json.JSONObject;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class VCardUtils {
    public VCardResponse parseVCard(String vCardData) {
        VCardResponse response = new VCardResponse();

        String nameRegex = "NAME:([^\n]+)";
        String fatherNameRegex = "FNAME:([^\n]+)";
        String birthdayRegex = "BDAY:([^\n]+)";
        String panCardRegex = "PAN:([^\n]+)";
        String photoRegex = "PHOTO;ENCODING=BASE64;TYPE=JPEG:([^\n]+)";

        response.setName(extractValue(vCardData, nameRegex));
        response.setFatherName(extractValue(vCardData, fatherNameRegex));
        response.setBirthday(extractValue(vCardData, birthdayRegex));
        response.setPanCard(extractValue(vCardData, panCardRegex));
        response.setPhoto(extractValue(vCardData, photoRegex));

        return response;
    }
    private String extractValue(String vCardData, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(vCardData);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return null;
    }

    public static JSONObject parseVCardToJson(String vCard) {
        JSONObject json = new JSONObject();

        String[] lines = vCard.split("\n");

        for (String line : lines) {
            if (line.startsWith("NAME:")) {
                json.put("name", line.substring(5).trim());
            } else if (line.startsWith("FNAME:")) {
                json.put("fatherName", line.substring(6).trim());
            } else if (line.startsWith("BDAY:")) {
                json.put("birthday", line.substring(6).trim());
            } else if (line.startsWith("PAN:")) {
                json.put("pan", line.substring(4).trim());
            } else if (line.startsWith("PHOTO;ENCODING=BASE64;TYPE=JPEG:")) {
                String base64Image = extractBase64Data(line);
                json.put("photo", base64Image);
            }
        }

        return json;
    }

    private static String extractBase64Data(String vCardLine) {
        String base64Prefix = "base64,";
        int index = vCardLine.indexOf(base64Prefix);
        if (index != -1) {
            return vCardLine.substring(index + base64Prefix.length()).trim();
        }
        return "";
    }
}
