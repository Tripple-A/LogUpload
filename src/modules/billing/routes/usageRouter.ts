import { Router } from "express";
import Usage from "../models/usage";
import multer from "multer";
import stream from "stream";
import csv from "csv-parser";
import BulkCreateUsageService from "../services/bulkCreateUsageService";

const usageRouter = Router();

const upload = multer();
//
// no need for an id here as we'll authenticate the user and get the tenantId from the token
usageRouter.post("/upload", upload.single("file"), async (req, res, next) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: "No file uploaded." });
    return;
  }
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  let results: object[] = [];

  bufferStream
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", async () => {
      try {
        // Process rows and create Usage entries
        await BulkCreateUsageService.createUsage(results);

        res.status(201).json({
          message: `Usage data from ${file.originalname} uploaded to our system successfully`,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
      }
    });
});

export default usageRouter;
