import * as path from "path";
const { createCanvas, loadImage } = require("canvas");

export default async (req, res) => {
  const { text } = req.query;

  async function generateImage(text) {
    const CANVAS_WIDTH = 1200;
    const CANVAS_HEIGHT = 630;

    const TEXT_COLOR = "#000000";
    const TEXT_SIZE = 60;
    const FONT_FAMILY = "ＭＳ ゴシック";

    const BACKGROUND_IMAGE_PATH = path.join(
      __dirname,
      "..",
      "images",
      "background.png"
    );
    const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    const context = canvas.getContext("2d");

    // Add background
    const backgroundImage = await loadImage(BACKGROUND_IMAGE_PATH);
    context.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.font = `${TEXT_SIZE}px ${FONT_FAMILY}`;
    context.fillStyle = TEXT_COLOR;
    context.fillText(text, 100, 100);

    return canvas.toBuffer();
  }

  try {
    const image = await generateImage(text);
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
