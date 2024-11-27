import Cors from "cors";

const cors = Cors({
  origin: "https://smile-builders-hiraya.com",
  methods: ["POST"],
  allowedHeaders: ["Content-Type", "Origin", "User-Agent"],
});

export function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
