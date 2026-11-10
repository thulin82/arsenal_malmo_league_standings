import express, { Router, Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { parseString } from "xml2js";
import dotenv from "dotenv";

const router: Router = express.Router();

dotenv.config();

interface Headers {
  "Content-Type": string;
  "User-Agent": string;
  [key: string]: string;
}

const headers: Headers = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
    "AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/120.0.0.0 Safari/537.36",
};

interface ApiResponse {
  success: boolean;
  data: unknown;
}

router.get("/", (_req: Request, res: Response<void>): void => {
  res.redirect("index.html");
});

router.get("/malmo", (_req: Request, res: Response<ApiResponse>): void => {
  let data: unknown = "";
  const urlM = process.env.URL_M;
  if (!urlM) {
    res.status(500).json({ success: false, data: "URL_M not configured" });
    return;
  }
  axios
    .get(urlM, { headers })
    .then((resp: AxiosResponse<string>) => {
      const xml = resp.data.slice(28, resp.data.length - 3);
      parseString(xml, (_err: unknown, result: unknown) => {
        data = result;
        res.status(200).json({ success: true, data });
      });
    })
    .catch(() => {
      res.status(500).json({ success: false, data: "Error fetching malmo data" });
    });
});

router.get("/arsenal", (_req: Request, res: Response<ApiResponse>): void => {
  let data: unknown = "";
  const urlA = process.env.URL_A;
  if (!urlA) {
    res.status(500).json({ success: false, data: "URL_A not configured" });
    return;
  }
  axios
    .get(urlA, { headers })
    .then((resp: AxiosResponse<string>) => {
      const xml = resp.data.slice(27, resp.data.length - 3);
      parseString(xml, (_err: unknown, result: unknown) => {
        data = result;
        res.status(200).json({ success: true, data });
      });
    })
    .catch(() => {
      res.status(500).json({ success: false, data: "Error fetching arsenal data" });
    });
});

export default router;
