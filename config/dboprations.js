import path from "path";
import fs from "fs";
import mssql from "mssql";

import ErrorHandler from "../utils/errorHandler.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let pool;

// const sqlConfig = ;

export const connectDatabase = async () => {

  try {
    pool = new mssql.ConnectionPool({
      server: "pasyarapp.ir",
      port: "6969" * 1,
      user: "sa",
      database: "qr_scanner",
      password: "Y@zdanm69",

      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    });
    return await pool.connect();
  } catch (err) {
    console.log(err);
    // ... error checks
  }
};

export async function executeQuery(q, params) {
  let request = pool.request();

  for (const [key, value] of Object.entries(params)) {

    request = request.input(key, value);
  }

  return await request.query(q);
}
// export { runSql, connectDatabase };
