import { Client, Account, Databases, Storage, ID } from "appwrite"; // ✅ Ensure ID is imported

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ Use environment variables
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseID = "67a85daf0001080a6db7";  
export const collectionID = "67a85dce00217ec8dca7";  
export const bucketID = "67a88f7d000050063918";  

export { ID }; // ✅ Ensure ID is exported
