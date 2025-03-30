'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Header from '../../components/Public/PublicHeader/PublicHeader';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [googleUserData, setGoogleUserData] = useState(null);
  const [supabaseUserData, setSupabaseUserData] = useState(null);
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error getting session:', error);
      setSession(data?.session || null);
      setGoogleUserData(data?.session?.user ?? null);

      if (data?.session?.user) {
        fetchSupabaseUserData(data.session.user.id);
      }
    };

    fetchSession();

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
    console.log("Session:", session);
    console.log("isLoading:", isLoading);

    if (!isLoading && session === null) {
      console.log('Redirecting to home page...');
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
    signIn: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
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
      <Header />
      {/* <StudentNavbar /> */}
      <main>{children}</main>
    </AuthProvider>
  );
}
