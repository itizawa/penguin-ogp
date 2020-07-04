import { NowRequest, NowResponse } from "@now/node";

export default (req, res) => {
  res.status(200).send("Hello Vercel!!");
};