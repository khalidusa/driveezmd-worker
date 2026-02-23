import express from "express";

const app = express();
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({ ok: true, service: "driveezmd-worker", status: "running" });
});

app.post("/driveez/fetch", async (req, res) => {
  try {
    const { country, mailing_number, zip_code, target_plates_array } = req.body;

    return res.json({
      ok: true,
      message: "Worker received payload successfully",
      received: {
        country,
        mailing_number,
        zip_code,
        target_plates_array
      }
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DriveEzMD worker listening on port ${port}`);
});