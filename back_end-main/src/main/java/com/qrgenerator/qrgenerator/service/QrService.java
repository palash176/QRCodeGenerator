package com.qrgenerator.qrgenerator.service;

import com.qrgenerator.qrgenerator.model.request.BulkRequest;
import com.qrgenerator.qrgenerator.model.request.DecryptRequest;
import com.qrgenerator.qrgenerator.model.response.BulkResponse;
import com.qrgenerator.qrgenerator.model.response.DetailResposne;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@Repository
public interface QrService {

    List<BulkResponse> bulkImportUsers(BulkRequest bulkRequest) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException;

    DetailResposne dycrpytdata(DecryptRequest decryptRequest);
}
