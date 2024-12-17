function RSA() {
  var gcd, p, q, no, n, t, e, i, x, d, ct, ctt, dtt, dt;
  
  // Helper function to calculate GCD
  gcd = function (a, b) { 
      return (!b) ? a : gcd(b, a % b); 
  };
  
  // Get input values
  p = parseInt(document.getElementById('p').value);
  q = parseInt(document.getElementById('q').value);
  no = parseInt(document.getElementById('msg').value);
  
  // Calculate n and t
  n = p * q;
  t = (p - 1) * (q - 1);
  
  // Find a valid exponent e
  for (e = 2; e < t; e++) {
      if (gcd(e, t) == 1) {
          break;
      }
  }

  // Find the private key d
  for (i = 0; i < 10; i++) {
      x = 1 + i * t;
      if (x % e == 0) {
          d = x / e;
          break;
      }
  }

  // Encryption (c = m^e mod n)
  ctt = Math.pow(no, e).toFixed(0);
  ct = ctt % n;

  // Decryption (m = c^d mod n)
  dtt = Math.pow(ct, d).toFixed(0);
  dt = dtt % n;

  // Display results
  document.getElementById('publickey(N)').innerHTML = n;
  document.getElementById('exponent(e)').innerHTML = e;
  document.getElementById('privatekey(d)').innerHTML = d;
  document.getElementById('ciphertext(ct)').innerHTML = ct;
}
