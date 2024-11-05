import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import youtubedl from "youtube-dl-exec";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"],
  })
);

app.get("/api/download", async (req, res) => {
  const videoID = req.query.videoID;
  const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

  try {
    const output = await youtubedl(videoUrl, {
      dumpSingleJson: true,
    });
    const data = {
      title: output.title,
      thumbnail: output.thumbnail,
      uploader: output.uploader,
      duration: output.duration_string,
      downloads: output.formats.map((format) => ({
        url: format.url,
        format: format.format,
        size: format.filesize,
      })),
    };
    console.log(data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to download video" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
