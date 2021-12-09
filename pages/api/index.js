// // import sha256 from "crypto-js/sha256";
// import hmacSHA512 from "crypto-js/hmac-sha512";
// import Base64 from "crypto-js/enc-base64";

// export default function handler(req, res) {
//   //   res.status(200).send(generateCodeChallengeFromVerifier(generateCodeVerifier));
//   res.status(200).send("yo");
// }
// function dec2hex(dec) {
//   return ("0" + dec.toString(16)).substr(-2);
// }
// function generateCodeVerifier() {
//   var array = new Uint32Array(56 / 2);
//   crypto.getRandomValues(array);
//   return Array.from(array, dec2hex).join("");
// }

// function sha256(plain) {
//   // returns promise ArrayBuffer
//   const encoder = new TextEncoder();
//   const data = encoder.encode(plain);
//   return crypto.subtle.digest("SHA-256", data);
// }

// function base64urlencode(a) {
//   var str = "";
//   var bytes = new Uint8Array(a);
//   var len = bytes.byteLength;
//   for (var i = 0; i < len; i++) {
//     str += String.fromCharCode(bytes[i]);
//   }
//   return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
// }

// async function generateCodeChallengeFromVerifier(v) {
//   var hashed = await sha256(v);
//   var base64encoded = base64urlencode(hashed);
//   return base64encoded;
// }

// // const code_verifier = base64url(crypto.pseudoRandomBytes(32));

// // const code_challenge = crypto
// //   .createHash("sha256")
// //   .update(code_verifier)
// //   .digest();
