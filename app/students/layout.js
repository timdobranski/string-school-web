'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import StudentNavbar from '../../components/StudentComponents/StudentNavbar/StudentNavbar';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';


const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [supabaseUserData, setSupabaseUserData] = useState(null);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);
    setGoogleUserData(session?.user ?? null);

    if (session?.user) {
      fetchSupabaseUserData(session.user.id);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        setSession(session);
        setGoogleUserData(session?.user ?? null);

        if (session?.user) {
          fetchSupabaseUserData(session.user.id);
        } else {
          setSupabaseUserData(null);
          setStudent(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !session) {
      // Redirect to the home page if not signed in
      router.push('/');
    }
  }, [session, isLoading, router]);

  async function fetchSupabaseUserData(userId) {
    setIsLoading(true);
    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching supabase user data', error);
      return;
    }

    setSupabaseUserData(userData);

    const studentId = userData?.student_id;
    if (studentId) {
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('id', studentId)
        .single();

      if (studentError) {
        console.error('Error fetching student data', studentError);
        return;
      }

      setStudent(studentData);
    }
  }

  const value = {
    session,
    googleUserData,
    supabaseUserData,
    student,
    isLoading,
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