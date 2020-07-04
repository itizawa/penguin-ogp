const { createCanvas } = require("canvas");

export default async (req, res) => {
  let { text } = req.query;
  if (text == null) {
    text = "hello world";
  }

  const canvas = createCanvas(1200, 630);
  const context = canvas.getContext("2d");

  context.font = "60px myfont";
  context.fillStyle = "#ffffff";
  context.fillText(text, 100, 100);

  const image = canvas.toBuffer();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": image.length,
  });
  res.end(image, "binary");
};
