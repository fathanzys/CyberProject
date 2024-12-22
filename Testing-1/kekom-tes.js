let encryptedFileData = null;
let encryptedAESKey = null;
let decryptedAESKey = null;
let decryptedFileData = null;

function encryptFile() {
    const aesKey = document.getElementById('aesKey').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput && aesKey) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const fileContent = event.target.result;
            const startTime = performance.now();
            const encryptedContent = CryptoJS.AES.encrypt(fileContent, aesKey).toString();
            const endTime = performance.now();
            const encryptionTime = (endTime - startTime).toFixed(2);

            encryptedFileData = encryptedContent;
            document.getElementById('encryptedFile').innerHTML = `<div style="overflow-y: auto; height: 150px; border: 1px solid #ccc; padding: 10px;">${encryptedFileData}</div>`;
            document.getElementById('decryptBtn').style.display = 'inline-block';
            document.getElementById('downloadBtn').style.display = 'inline-block';
            document.getElementById('encryptionTime').innerText = `Encryption Time: ${encryptionTime} ms`;

            const originalFileSize = fileContent.length;
            const encryptedFileSize = encryptedContent.length;
            document.getElementById('fileSize').innerText = `Original File Size: ${originalFileSize} bytes, Encrypted File Size: ${encryptedFileSize} bytes`;
        };
        reader.readAsText(fileInput);
    } else {
        alert('Please upload a file and enter an AES key.');
    }
}

function encryptAESKey() {
    const rsaPublicKey = document.getElementById('rsaPublicKey').value;
    const aesKey = document.getElementById('aesKey').value;

    if (rsaPublicKey && aesKey) {
        encryptedAESKey = btoa(aesKey);
        document.getElementById('encryptedAESKey').innerText = `Encrypted AES Key: ${encryptedAESKey}`;
        document.getElementById('decryptAESBtn').style.display = 'inline-block';
    } else {
        alert('Please enter both RSA public key and AES key.');
    }
}

function decryptAESKey() {
    const rsaPrivateKey = prompt('Enter RSA Private Key to decrypt AES key:');
    if (rsaPrivateKey && encryptedAESKey) {
        decryptedAESKey = atob(encryptedAESKey);
        alert(`Decrypted AES Key: ${decryptedAESKey}`);
    } else {
        alert('Please provide an RSA private key and make sure the AES key is encrypted.');
    }
}

function decryptFile() {
    if (decryptedAESKey && encryptedFileData) {
        const startTime = performance.now();
        const decryptedContent = CryptoJS.AES.decrypt(encryptedFileData, decryptedAESKey).toString(CryptoJS.enc.Utf8);
        const endTime = performance.now();
        const decryptionTime = (endTime - startTime).toFixed(2);

        decryptedFileData = decryptedContent;
        document.getElementById('encryptedFile').innerHTML = `<div style="overflow-y: auto; height: 150px; border: 1px solid #ccc; padding: 10px;">${decryptedFileData}</div>`;
        document.getElementById('downloadDecryptedBtn').style.display = 'inline-block';
        document.getElementById('decryptionTime').innerText = `Decryption Time: ${decryptionTime} ms`;
    } else {
        alert('Please ensure both AES key is decrypted and file is encrypted.');
    }
}

function downloadFile() {
    const blob = new Blob([encryptedFileData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'encryptedFile.txt';
    link.click();
}

function downloadDecryptedFile() {
    const blob = new Blob([decryptedFileData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'decryptedFile.txt';
    link.click();
}

function simulateBruteForce() {
    const possibleKeys = ['123456', 'password', 'abc123', 'testkey'];
    let decryptedData = '';
    let resultText = 'Brute force failed to find the correct key.';

    for (let key of possibleKeys) {
        try {
            const attempt = CryptoJS.AES.decrypt(encryptedFileData, key).toString(CryptoJS.enc.Utf8);
            if (attempt && attempt.length > 0) {
                decryptedData = attempt;
                resultText = `Brute Force Success! Key: ${key}, Decrypted Data: ${decryptedData}`;
                break;
            }
        } catch (e) {
            continue;
        }
    }

    document.getElementById('bruteForceResult').innerText = resultText;
}
