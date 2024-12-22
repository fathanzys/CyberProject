let encryptedFileData = null;
let encryptedAESKey = null;
let decryptedAESKey = null;
let decryptedFileData = null;

// Function to encrypt the file using AES with time tracking
function encryptFile() {
    const aesKey = document.getElementById('aesKey').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput && aesKey) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;

            // Track time for AES encryption
            const startTime = performance.now();
            const encryptedContent = CryptoJS.AES.encrypt(fileContent, aesKey).toString();
            const endTime = performance.now();
            const encryptionTime = (endTime - startTime).toFixed(2); // Time in milliseconds

            encryptedFileData = encryptedContent;
            document.getElementById('encryptedFile').innerHTML = `<div style="overflow-y: auto; height: 150px; border: 1px solid #ccc; padding: 10px;">${encryptedFileData}</div>`;
            document.getElementById('decryptBtn').style.display = 'inline-block';
            document.getElementById('downloadBtn').style.display = 'inline-block';
            document.getElementById('encryptionTime').innerText = `Encryption Time: ${encryptionTime} ms`; // Display encryption time

            // Display file size
            const originalFileSize = fileContent.length;
            const encryptedFileSize = encryptedContent.length;
            document.getElementById('fileSize').innerText = `Original File Size: ${originalFileSize} bytes, Encrypted File Size: ${encryptedFileSize} bytes`;
        };
        reader.readAsText(fileInput); // Assuming the file is text
    } else {
        alert('Please upload a file and enter an AES key.');
    }
}

// Simulate brute force for AES key (limited for small keys, just for demo)
function simulateBruteForce() {
    const possibleKeys = ['123456', 'password', 'abc123', 'testkey']; // Simple brute force keys for demo
    let decryptedData = '';
    let resultText = 'Brute force failed to find the correct key.';
    for (let key of possibleKeys) {
        try {
            decryptedData = CryptoJS.AES.decrypt(encryptedFileData, key).toString(CryptoJS.enc.Utf8);
            if (decryptedData) {
                resultText = `Brute Force Success! Key: ${key}, Decrypted Data: ${decryptedData}`;
                break; // Exit loop when correct key is found
            }
        } catch (e) {
            continue; // Skip if decryption fails
        }
    }
    document.getElementById('bruteForceResult').innerText = resultText;
}

// Function to encrypt the AES key using RSA
function encryptAESKey() {
    const rsaPublicKey = document.getElementById('rsaPublicKey').value;
    const aesKey = document.getElementById('aesKey').value;

    if (rsaPublicKey && aesKey) {
        // Simulate RSA encryption (replace with actual library for real implementation)
        encryptedAESKey = btoa(aesKey); // Simple base64 encoding as RSA simulation
        document.getElementById('encryptedAESKey').innerText = `Encrypted AES Key: ${encryptedAESKey}`;
        document.getElementById('decryptAESBtn').style.display = 'inline-block'; // Show decrypt button
    } else {
        alert('Please enter both RSA public key and AES key.');
    }
}

// Function to decrypt the AES key using RSA
function decryptAESKey() {
    const rsaPrivateKey = prompt('Enter RSA Private Key to decrypt AES key:');

    if (rsaPrivateKey && encryptedAESKey) {
        try {
            // Simulate RSA decryption (replace this with real RSA library for actual implementation)
            decryptedAESKey = atob(encryptedAESKey); // Simulate decryption using Base64 decoding
            
            // Validation: Ensure decrypted AES key matches expected format
            if (decryptedAESKey === "" || decryptedAESKey === null) {
                throw new Error("Invalid RSA Private Key. Cannot decrypt AES Key.");
            }

            alert(`Decrypted AES Key: ${decryptedAESKey}`);
        } catch (error) {
            // Handle RSA decryption failure
            decryptedAESKey = null; // Reset the decrypted AES key
            alert("Decryption of AES Key failed. Invalid RSA Private Key.");
        }
    } else {
        alert('Please provide an RSA private key and make sure the AES key is encrypted.');
    }
}

// Function to decrypt the file using the decrypted AES key with time tracking
function decryptFile() {
    if (decryptedAESKey && encryptedFileData) {
        try {
            // Track time for AES decryption
            const startTime = performance.now();
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedFileData, decryptedAESKey); // Decrypt using AES key
            const decryptedContent = decryptedBytes.toString(CryptoJS.enc.Utf8); // Convert to UTF-8 string
            const endTime = performance.now();
            const decryptionTime = (endTime - startTime).toFixed(2); // Time in milliseconds

            // Check if the decrypted content is valid (non-empty)
            if (!decryptedContent || decryptedContent === "") {
                throw new Error("Decryption failed. Invalid AES key or corrupted data.");
            }

            decryptedFileData = decryptedContent;

            // Update UI with decrypted data
            document.getElementById('encryptedFile').innerHTML = `<div style="overflow-y: auto; height: 150px; border: 1px solid #ccc; padding: 10px;">${decryptedFileData}</div>`;
            document.getElementById('downloadDecryptedBtn').style.display = 'inline-block';
            document.getElementById('decryptionTime').innerText = `Decryption Time: ${decryptionTime} ms`; // Display decryption time
        } catch (error) {
            // Handle decryption failure
            alert('Decryption failed. Incorrect AES key or corrupted encrypted file.');
        }
    } else {
        alert('Please ensure the AES key is decrypted correctly before attempting to decrypt the file.');
    }
}

// Function to download the encrypted file
function downloadFile() {
    const blob = new Blob([encryptedFileData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encryptedFile.txt';
    link.click();
}

// Function to download the
