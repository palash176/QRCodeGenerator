package com.qrgenerator.qrgenerator.utils;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class ExcelReadUtil {
    public static List<String[]> readExcelFile(MultipartFile file) throws IOException {

        List<String[]> data = new ArrayList<>();
        try (
                InputStream is = file.getInputStream();
                Workbook workbook = createWorkbook(file, is)) {
            Sheet sheet = workbook.getSheetAt(0);
            DataFormatter formatter = new DataFormatter();
            Boolean firstRow = true;
            for (Row row : sheet) {
                if (firstRow) {
                    firstRow = false;
                    continue;
                }
                int numCols = row.getLastCellNum();
                String[] rowData = new String[numCols];
                for (int i = 0; i < numCols; i++) {
                    rowData[i] = formatter.formatCellValue(row.getCell(i));
                }
                data.add(rowData);
            }
        } catch (
                Exception e) {
            e.printStackTrace();
        }
        return data;
    }

    private static Workbook createWorkbook(MultipartFile file, InputStream is) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename != null && filename.toLowerCase().endsWith(".xls")) {
            return new HSSFWorkbook(is);
        } else if (filename != null && filename.toLowerCase().endsWith(".xlsx")) {
            return new XSSFWorkbook(is);
        } else {
            throw new RuntimeException("invalid file format");
        }
    }
}