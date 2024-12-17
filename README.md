Berikut adalah versi yang sudah dirapikan dari deskripsi tugas besar:

---

## **Tugas Besar: Sistem Keamanan File Sharing Berbasis Hybrid Cryptography**

### **Deskripsi Proyek**
Mahasiswa bekerja dalam tim untuk membangun **sistem keamanan file sharing berbasis hybrid cryptography**.  
Sistem ini dirancang untuk memungkinkan pengiriman file secara aman antara dua pihak, di mana file dienkripsi sebelum dikirimkan, dan hanya penerima yang sah dapat mendekripsinya.

---

### **Fitur Utama Sistem**
1. **Menggabungkan Algoritma AES dan RSA**:
   - **AES (Advanced Encryption Standard)**:  
     Digunakan untuk mengenkripsi file karena cepat dan efisien untuk data besar.
   - **RSA (Rivest-Shamir-Adleman)**:  
     Digunakan untuk mengenkripsi kunci AES agar kunci tetap aman selama proses pengiriman.

2. **Antarmuka Pengguna (UI/CLI)**:  
   Sistem harus memiliki antarmuka sederhana untuk pengguna agar dapat melakukan:
   - Upload file.
   - Enkripsi file menggunakan kombinasi AES dan RSA.
   - Simulasi pengiriman file terenkripsi.
   - Dekripsi file di sisi penerima.
   - Download file yang telah dienkripsi atau didekripsi.

3. **Evaluasi Kinerja**:  
   Sistem mampu mengukur kinerja berdasarkan:
   - Waktu proses enkripsi/dekripsi.
   - Ukuran file yang diproses.
   - Penggunaan sumber daya (RAM/CPU) selama proses enkripsi dan dekripsi.

---

### **Komponen Utama Proyek**

#### **1. Algoritma Hybrid Cryptography**
   - **AES (Advanced Encryption Standard)**:  
     Digunakan untuk mengenkripsi file agar lebih cepat dan efisien, terutama untuk file berukuran besar.
   - **RSA (Rivest-Shamir-Adleman)**:  
     Digunakan untuk mengenkripsi kunci AES yang dipakai dalam proses enkripsi file. Hal ini memastikan keamanan kunci AES saat file dikirimkan.

#### **2. Dataset**
   - **File Input**:  
     Dataset berupa file dengan ukuran yang bervariasi, seperti:
     - 1MB, 5MB, 10MB, hingga 100MB.
   - **Sumber Dataset**:  
     - Dataset dapat berupa file acak yang dibuat menggunakan Python.
     - Dataset publik seperti gambar, teks, atau video juga dapat digunakan.

#### **3. Tools dan Libraries**
   - **Python Libraries**:
     - `pycryptodome` atau `cryptography`: Untuk implementasi algoritma AES dan RSA.
     - `time`: Untuk mengukur waktu proses enkripsi dan dekripsi.
   - **Hardware Monitoring Tools**:
     - `psutil`: Untuk memantau penggunaan sumber daya (RAM dan CPU) selama proses.
   - **IDE yang Direkomendasikan**:
     - VS Code, PyCharm, atau Jupyter Notebook.

---

### **Antarmuka Pengguna**

Sistem dapat menggunakan:
1. **Command Line Interface (CLI)** atau **aplikasi GUI sederhana** (dengan `tkinter` atau `PyQt`).
2. **Fungsi Utama** dalam antarmuka meliputi:
   1. Upload file yang akan dienkripsi.
   2. Pilih algoritma hybrid cryptography (AES untuk file, RSA untuk kunci AES).
   3. Enkripsi file dan simpan file terenkripsi.
   4. Simulasi pengiriman file.
   5. Dekripsi file di sisi penerima.

---

### **Proses Evaluasi**

1. **Analisis Performa Algoritma Hybrid**:
   - **Waktu Proses**:
     - Mengukur waktu yang diperlukan untuk enkripsi dan dekripsi file dengan ukuran yang berbeda.
   - **Konsumsi Sumber Daya**:
     - Mengukur penggunaan RAM dan CPU selama proses enkripsi/dekripsi menggunakan tools seperti `psutil`.

2. **Simulasi Keamanan**:
   - Melakukan simulasi serangan brute force terhadap kunci AES untuk menilai tingkat keamanan sistem.

---

Deskripsi ini sudah dirapikan dan dibuat lebih terstruktur untuk memudahkan implementasi dan pengembangan sistem. Semoga membantu! 😊
