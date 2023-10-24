'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import StudentNavbar from '../../components/StudentNavbar/StudentNavbar';
import { supabase } from '../../utils/supabase';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default function StudentContext({ children }) {
  return (
    <AuthProvider>
      <main>
        <StudentNavbar />
        {children}
      </main>
    </AuthProvider>
  );
}