package com.qrgenerator.qrgenerator.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.multipart.MultipartFile;



@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class BulkRequest {

    @NotNull
    private MultipartFile bulkfile;

}
