import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Sign Up function
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Log In function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // function Log out
  function logout() {
    return auth.signOut();
  }

  // function Reset Password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // function Update email
  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  // function Update Password
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
