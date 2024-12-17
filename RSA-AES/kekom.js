// script.js

// Helper function to convert text to bytes
function stringToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
      bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

// AES Encryption and Decryption
function encryptAES() {
  const text = document.getElementById("aes-text").value;
  const key = document.getElementById("aes-key").value;

  if (!text || !key) {
      alert("Please enter both plaintext and AES key.");
      return;
  }

  // AES encryption using the crypto API (simplified for the example)
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);
  const cryptoKey = window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
  );

  cryptoKey.then(key => {
      window.crypto.subtle.encrypt(
          { name: "AES-GCM", iv: new Uint8Array(12) }, // Simplified IV
          key,
          encodedText
      ).then(encrypted => {
          const encryptedHex = Array.from(new Uint8Array(encrypted))
              .map(b => b.toString(16).padStart(2, '0'))
              .join('');
          document.getElementById("aes-ciphertext").textContent = encryptedHex;
      }).catch(err => console.error(err));
  });
}

function decryptAES() {
  const encryptedText = document.getElementById("aes-ciphertext").textContent;
  const key = document.getElementById("aes-key").value;

  if (!encryptedText || !key) {
      alert("Please enter both ciphertext and AES key.");
      return;
  }

  // AES decryption (simplified)
  const encryptedArray = new Uint8Array(encryptedText.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
  const cryptoKey = window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "AES-GCM" },
      false,
      ["encrypt", "decrypt"]
  );

  cryptoKey.then(key => {
      window.crypto.subtle.decrypt(
          { name: "AES-GCM", iv: new Uint8Array(12) }, // Simplified IV
          key,
          encryptedArray
      ).then(decrypted => {
          const decoder = new TextDecoder();
          document.getElementById("aes-decrypted").textContent = decoder.decode(decrypted);
      }).catch(err => console.error(err));
  });
}

// RSA Encryption and Decryption
function encryptRSA() {
  const p = parseInt(document.getElementById("p").value);
  const q = parseInt(document.getElementById("q").value);
  const msg = parseInt(document.getElementById("msg").value);

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  let e = 2;
  let d = 0;

  while (e < phi) {
      if (gcd(e, phi) === 1) {
          break;
      } else {
          e++;
      }
  }

  for (let i = 0; i < 1000; i++) {
      if ((e * i) % phi === 1) {
          d = i;
          break;
      }
  }

  const ciphertext = Math.pow(msg, e) % n;
  document.getElementById("ciphertextRSA").textContent = `Ciphertext: ${ciphertext}`;
  document.getElementById("publickey(N)").textContent = `Public Key (N): ${n}`;
  document.getElementById("exponent(e)").textContent = `Exponent (e): ${e}`;
  document.getElementById("privatekey(d)").textContent = `Private Key (d): ${d}`;
}

function decryptRSA() {
  const n = parseInt(document.getElementById("publickey(N)").textContent.split(": ")[1]);
  const d = parseInt(document.getElementById("privatekey(d)").textContent.split(": ")[1]);
  const ciphertext = parseInt(document.getElementById("ciphertextRSA").textContent.split(": ")[1]);

  const decrypted = Math.pow(ciphertext, d) % n;
  document.getElementById("decryptedtextRSA").textContent = `Decrypted Message: ${decrypted}`;
}

// Helper function for GCD
function gcd(a, b) {
  while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
  }
  return a;
}
