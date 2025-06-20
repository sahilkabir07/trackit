const CryptoJS = require("crypto-js");

const cryptoMiddleware = (req, res, next) => {
  try {
    const method = req.method.toLowerCase();

    if (["get", "delete"].includes(method)) {
      return next();
    }

    const encryptedData = req.body.data;

    if (!encryptedData) {
      return res.status(400).json({ message: "No encrypted data provided" });
    }

    const key = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET);
    const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTO_SECRET);

    console.log("BACKEND Encrypted Data Received:", encryptedData);
    console.log("BACKEND Decrypt Key:", process.env.CRYPTO_SECRET);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
    console.log("BACKEND Decrypted Text:", decryptedText);

    if (!decryptedText) {
      return res.status(400).json({ message: "Failed to decrypt data" });
    }

    req.body = JSON.parse(decryptedText);
    console.log("✅ Decryption successful. Proceeding to controller...");
    next();
  } catch (err) {
    console.error("Decryption Error:", err);
    return res.status(500).json({ message: "Failed to decrypt data" });
  }
};

module.exports = cryptoMiddleware;
