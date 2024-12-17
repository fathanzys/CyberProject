let encryptedFileData = null;
let encryptedAESKey = null;
let decryptedAESKey = null;
let decryptedFileData = null;

// Function to encrypt the file using AES
function encryptFile() {
    const aesKey = document.getElementById('aesKey').value;
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput && aesKey) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const fileContent = event.target.result;
            // Encrypt file content with AES
            const encryptedContent = CryptoJS.AES.encrypt(fileContent, aesKey).toString();

            encryptedFileData = encryptedContent;
            document.getElementById('encryptedFile').innerText = `Encrypted File Content: ${encryptedFileData}`;
            document.getElementById('decryptBtn').style.display = 'inline-block';  // Show decrypt button
            document.getElementById('downloadBtn').style.display = 'inline-block';  // Show download button
        };
        reader.readAsText(fileInput); // Assuming the file is text, modify if binary data
    } else {
        alert('Please upload a file and enter an AES key.');
    }
}

// Function to encrypt the AES key using RSA
function encryptAESKey() {
    const rsaPublicKey = document.getElementById('rsaPublicKey').value;
    const aesKey = document.getElementById('aesKey').value;

    if (rsaPublicKey && aesKey) {
        // Simulate RSA encryption of AES key (replace with actual RSA encryption)
        encryptedAESKey = `RSA Encrypted AES Key: ${rsaPublicKey}`;  // Placeholder logic

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
        // Simulate RSA decryption (replace with actual RSA decryption logic)
        decryptedAESKey = encryptedAESKey.replace('RSA Encrypted AES Key: ', '');  // Placeholder logic

        alert(`AES Key decrypted: ${decryptedAESKey}`);
    } else {
        alert('Please provide an RSA private key and make sure the AES key is encrypted.');
    }
}

// Function to decrypt the file using the decrypted AES key
function decryptFile() {
    if (!decryptedAESKey) {
        alert("Please decrypt the AES key first.");
        return;
    }

    if (!encryptedFileData) {
        alert("Please encrypt the file first.");
        return;
    }

    const decryptedContent = CryptoJS.AES.decrypt(encryptedFileData, decryptedAESKey).toString(CryptoJS.enc.Utf8);
    if (decryptedContent) {
        decryptedFileData = decryptedContent;
        document.getElementById('encryptedFile').innerText = `Decrypted File Content: ${decryptedFileData}`;
        document.getElementById('downloadDecryptedBtn').style.display = 'inline-block';  // Show download button for decrypted file
    } else {
        alert('Decryption failed. Please ensure the AES key is valid and the file is correctly encrypted.');
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
