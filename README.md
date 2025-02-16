# 📝 Simple Note Master

**Live Demo:** [Simple Note Master](https://simple-note-master.vercel.app/)  
**Repository:** [GitHub - Ujjawalps/notes-app](https://github.com/Ujjawalps/notes-app)  

## 📌 About the Project  

**Simple Note Master** is a modern **note-taking application** built using **React, Firebase, and Quill.js**.  
It allows users to **create, edit, delete, and format notes effortlessly**.  
The app features a **dark mode UI** for a clean and distraction-free writing experience.  

## 🚀 Features  

✅ **User Authentication** – Sign in/up securely with Firebase Authentication.  
✅ **Rich Text Editing** – Powered by Quill.js for text formatting & styling.  
✅ **Cloud Storage** – Notes are stored securely in Firebase Firestore.  
✅ **Image Upload** – Users can upload and insert images into their notes.  
✅ **Fully Responsive** – Works smoothly on mobile and desktop.  
✅ **Dark Theme UI** – Elegant and modern dark mode design.  

## 🛠️ Tech Stack  

- **Frontend:** React.js, React Router, React Hook Form  
- **Backend:** Firebase Authentication & Firestore  
- **Rich Text Editor:** Quill.js  
- **Styling:** CSS (Dark Mode)  
- **Hosting:** Vercel

## 📂 Folder Structure  
```notes-app/
│── src/
│ ├── components/ # UI Components (Notes, NoteForm, Auth)
│ ├── context/ # Authentication Context
│ ├── firebase/ # Firebase Configuration
│ ├── styles/ # CSS Files
│ ├── utils/ # Utility Files (Quill Config, etc.)
│ ├── App.jsx # Main Application Component
│ ├── main.jsx # Entry Point
│── public/ # Static Files
│── .env # Environment Variables
│── package.json # Dependencies
│── README.md # Project Documentation
 ```
## 📦 Installation & Setup  

To run this project locally, follow these steps:  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/Ujjawalps/notes-app.git  
cd notes-app
```
### 2️⃣ Install Dependencies
``` sh
npm install  
```
### 3️⃣ Set Up Firebase

  - Create a Firebase project at Firebase Console.
  - Get your Firebase API keys and create a .env file in the root directory:
``` sh
VITE_FIREBASE_API_KEY=your-api-key  
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain  
VITE_FIREBASE_PROJECT_ID=your-project-id  
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket  
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id  
VITE_FIREBASE_APP_ID=your-app-id  
```
### 4️⃣ Start the Development Server
``` sh
npm run dev  
```
Now, open http://localhost:5173/ in your browser. 🚀


## 📤 Deployment

This project is deployed on Vercel. To deploy your own version:

  - Push your code to GitHub.
  - Connect your GitHub repo to Vercel.
  - Set up environment variables on Vercel.
  - Click Deploy and your app is live! 🎉

## 📌 Future Enhancements
🔹 Drag & Drop Notes Sorting.
🔹 Note Sharing via Links.
🔹 Tags & Search Functionality.
🔹 Speech-to-Text Notes/

## 📄 License

This project is open-source under the MIT License.
✨ Made with ❤️ by [Ujjawal Pratap Singh](https://github.com/Ujjawalps)
