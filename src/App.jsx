import { useEffect, useState } from "react";
import { account } from "./appwriteConfig";
import AuthForm from "./components/AuthForm";
import Notes from "./components/Notes";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account.get()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <Notes user={user} onLogout={handleLogout} />
      ) : (
        <AuthForm setUser={setUser} />
      )}
    </div>
  );
}

export default App;
