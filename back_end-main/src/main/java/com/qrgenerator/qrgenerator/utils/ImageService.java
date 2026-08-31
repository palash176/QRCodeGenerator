package com.qrgenerator.qrgenerator.utils;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Base64;

@Service
public class ImageService {
    public BufferedImage mergeImages(BufferedImage img1, BufferedImage img2, BufferedImage img3) {
        int width = Math.max(img1.getWidth(), Math.max(img2.getWidth(), img3.getWidth()));
        int height = img1.getHeight() + img2.getHeight() + img3.getHeight();

        BufferedImage mergedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics g = mergedImage.getGraphics();

        g.drawImage(img1, 0, 0, null);
        g.drawImage(img2, 0, img1.getHeight(), null);
        g.drawImage(img3, 0, img1.getHeight() + img2.getHeight(), null);

        g.dispose();
        return mergedImage;
    }

    public byte[] compressImage(BufferedImage image) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(image, "jpg", baos);
        byte[] data = baos.toByteArray();

        while (data.length > 1024) { // Compress until the size is under 1KB
            BufferedImage tempImage = ImageIO.read(new ByteArrayInputStream(data));
            int width = (int) (tempImage.getWidth() * 0.9);
            int height = (int) (tempImage.getHeight() * 0.9);

            BufferedImage resizedImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = resizedImage.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.drawImage(tempImage, 0, 0, width, height, null);
            g.dispose();

            baos.reset();
            ImageIO.write(resizedImage, "jpg", baos);
            data = baos.toByteArray();
        }

        return data;
    }

    public String encodeImageToBase64(byte[] imageData) {
        return Base64.getEncoder().encodeToString(imageData);
    }

    public static void main(String[] args) throws IOException {
        ImageService imageService = new ImageService();

        BufferedImage img1 = ImageIO.read(new File("path/to/image1.jpg"));
        BufferedImage img2 = ImageIO.read(new File("path/to/image2.jpg"));
        BufferedImage img3 = ImageIO.read(new File("path/to/image3.jpg"));

        BufferedImage mergedImage = imageService.mergeImages(img1, img2, img3);
        byte[] compressedImage = imageService.compressImage(mergedImage);

        String base64Image = imageService.encodeImageToBase64(compressedImage);

        System.out.println("Compressed Image (Base64): " + base64Image);
    }
}
