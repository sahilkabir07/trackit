import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_SECRET;

export const apiRequest = async (method, url, data = {}, token = null) => {
  try {
    const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

    let encryptedData = null;

    if (method !== "get") {
      encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      console.log("FRONTEND Encrypted Data:", encryptedData);
    }

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log("📤 Sending Token in Header:", headers.Authorization); // 👈 DEBUG
    }

    console.log("📦 Final Request Payload:", {
      method,
      url: `http://localhost:5000/api${url}`,
      data: method !== "get" ? { data: encryptedData } : {},
      headers,
    });

    const response = await axios({
      method,
      url: `http://localhost:5000/api${url}`,
      data: method !== "get" ? { data: encryptedData } : {},
      headers,
    });

    if (response.data && response.data.data) {
      const bytes = CryptoJS.AES.decrypt(response.data.data, key, {
        iv: key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("FRONTEND Decrypted Data:", decryptedData);
      return decryptedData;
    } else {
      return response.data;
    }
  } catch (err) {
    console.error("API Request Error:", err);
    throw err;
  }
};
