package com.qrgenerator.qrgenerator.model.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BulkResponse {
    private String qrCode;
}
