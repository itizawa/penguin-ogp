export default (req, res) => {
  const params = getParams(req);
  const imageBinary = await generateOgpImage(params);

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': imageBinary.length
  })
  res.end(imageBinary, 'binary')
};