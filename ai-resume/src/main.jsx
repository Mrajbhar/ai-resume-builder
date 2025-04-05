import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

// Your Google Client ID (make sure this is correct)
const GOOGLE_CLIENT_ID = "634676853918-7dr12n3elqilj3p2cjo5h7h5f6u93gle.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>  {/* Wrap with GoogleOAuthProvider */}
      <ThemeProvider> 
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
