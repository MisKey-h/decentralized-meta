import nacl from "tweetnacl";
import {getKeypairFromFile } from "@solana-developers/helpers";
import axios from "axios"; 

const keypair = await getKeypairFromFile("/Users/chester/.config/solana/id.json");

console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
const messageText = "Sign-in to Rugcheck.xyz";
const messageBytes = new TextEncoder().encode(messageText);
const timestamp = Date.now(); 
 
const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

const payload = {
    message: {
      message: messageText,
      publicKey: keypair.publicKey.toBase58(),
      timestamp: timestamp,
    },
    signature: {
      data: Array.from(signature), // Convert Uint8Array to array of numbers
      type: "Buffer", // Indicate the type of the signature (API-specific)
    },
    wallet: keypair.publicKey.toBase58(), // Duplicate public key for "wallet"
  };

  const BASE_URL = "https://api.rugcheck.xyz";

const authenticate = async () => {
    try {
      // Send the POST request to the /auth/login/solana endpoint
      const response = await axios.post(`${BASE_URL}/auth/login/solana`, payload);
  
      // Step 5: Handle the response and retrieve the JWT token
      const { token } = response.data;
      //console.log("Authentication successful! JWT Token:", token);
  
      // Return the token to be used for future requests
      return token;
    } catch (error) {
      //console.error("Authentication failed:", error.response?.data || error.message);
      throw error;
    }
  };


  (async () => {
    const token = await authenticate();
    //console.log("JWT Token:", token);
  })();