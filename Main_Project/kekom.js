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
        reader.onload = function(event) {
            const fileContent = event.target.result;
            
            // Track time for AES encryption
            const startTime = performance.now();
            const encryptedContent = CryptoJS.AES.encrypt(fileContent, aesKey).toString();
            const endTime = performance.now();
            const encryptionTime = (endTime - startTime).toFixed(2); // Time in milliseconds

            encryptedFileData = encryptedContent;
            document.getElementById('encryptedFile').innerText = `Encrypted File Content: ${encryptedFileData}`;
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
                resultText = `Brute Force Success! Decrypted Data: ${decryptedData}`;
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
        // Encrypt AES key with RSA (this is just a simulation, you would typically use a library like `node-forge` or `JSEncrypt` for RSA encryption)
        encryptedAESKey = CryptoJS.RSA.encrypt(aesKey, rsaPublicKey).toString();

        document.getElementById('encryptedAESKey').innerText = `Encrypted AES Key: ${encryptedAESKey}`;
        document.getElementById('decryptAESBtn').style.display = 'inline-block';  // Show decrypt button
    } else {
        alert('Please enter both RSA public key and AES key.');
    }
}

// Function to decrypt the AES key using RSA
function decryptAESKey() {
    const rsaPrivateKey = prompt('Enter RSA Private Key to decrypt AES key:');
    if (rsaPrivateKey && encryptedAESKey) {
        // Decrypt AES key with RSA (this is a simulation, use proper RSA decryption)
        decryptedAESKey = CryptoJS.RSA.decrypt(encryptedAESKey, rsaPrivateKey).toString(CryptoJS.enc.Utf8);
        alert(`Decrypted AES Key: ${decryptedAESKey}`);
    } else {
        alert('Please provide an RSA private key and make sure the AES key is encrypted.');
    }
}

// Function to decrypt the file using the decrypted AES key with time tracking
function decryptFile() {
    if (decryptedAESKey && encryptedFileData) {
        // Track time for AES decryption
        const startTime = performance.now();
        const decryptedContent = CryptoJS.AES.decrypt(encryptedFileData, decryptedAESKey).toString(CryptoJS.enc.Utf8);
        const endTime = performance.now();
        const decryptionTime = (endTime - startTime).toFixed(2); // Time in milliseconds

        decryptedFileData = decryptedContent;
        document.getElementById('encryptedFile').innerText = `Decrypted File Content: ${decryptedFileData}`;
        document.getElementById('downloadDecryptedBtn').style.display = 'inline-block';
        document.getElementById('decryptionTime').innerText = `Decryption Time: ${decryptionTime} ms`; // Display decryption time
    } else {
        alert('Please ensure both AES key is decrypted and file is encrypted.');
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

// Function to download the decrypted file
function downloadDecryptedFile() {
    const blob = new Blob([decryptedFileData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'decryptedFile.txt';
    link.click();
}
