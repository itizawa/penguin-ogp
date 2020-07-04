import * as path from "path";
const { createCanvas, loadImage } = require("canvas");

export default async (req, res) => {
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 630;

  try {
    const BACKGROUND_IMAGE_PATH = path.join(
      __dirname,
      "..",
      "images",
      "background.png"
    );

    let { text } = req.query;
    if (text == null) {
      text = "hello world";
    }

    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const context = canvas.getContext("2d");

    // Add background
    const backgroundImage = await loadImage(BACKGROUND_IMAGE_PATH);
    context.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.font = "60px myfont";
    context.fillStyle = "#ffffff";
    context.fillText(text, 100, 100);

    const image = canvas.toBuffer();

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": image.length,
    });
    res.end(image, "binary");
  } catch (error) {
    console.log(error);
    res.end(error.message);
  }
};
