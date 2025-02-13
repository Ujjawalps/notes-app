import { Client, Databases, Storage, ID } from "appwrite"; // ✅ Ensure ID is imported

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ Use environment variables
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;  
export const collectionID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;  
export const bucketID = import.meta.env.VITE_APPWRITE_BUCKET_ID;  

export { ID }; // ✅ Ensure ID is exported
