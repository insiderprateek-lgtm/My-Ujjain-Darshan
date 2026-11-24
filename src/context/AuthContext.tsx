import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../lib/firebase.ts';

interface AdminProfile {
  uid: string;
  email: string;
  displayName: string | null;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  adminProfile: AdminProfile | null;
  loading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getAuthHeaders: () => Promise<Record<string, string>>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const verifyAdmin = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setAdminProfile(null);
      setLoading(false);
      return;
    }
    try {
      const token = await firebaseUser.getIdToken();
      const response = await fetch('/api/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdminProfile(data.user);
        setAuthError(null);
      } else {
        const data = await response.json().catch(() => ({}));
        setAdminProfile(null);
        setAuthError(
          data.error ||
            'Signed-in Google account does not have administrator access.'
        );
      }
    } catch (err) {
      console.error('Admin verification failed:', err);
      setAdminProfile(null);
      setAuthError('Unable to verify administrator session.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      void verifyAdmin(firebaseUser);
    });
    return () => unsubscribe();
  }, [verifyAdmin]);

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null);
    setLoading(true);
    try {
      const credential = await signInWithPopup(auth, googleAuthProvider);
      await verifyAdmin(credential.user);
    } catch (err: unknown) {
      console.error('Google Sign-In failed:', err);
      setAuthError(
        err instanceof Error
          ? err.message
          : 'Google Sign-In was cancelled or blocked by the browser.'
      );
      setLoading(false);
    }
  }, [verifyAdmin]);

  const logout = useCallback(async () => {
    await signOut(auth);
    setAdminProfile(null);
    setAuthError(null);
  }, []);

  const getAuthHeaders = useCallback(async (): Promise<Record<string, string>> => {
    if (!auth.currentUser) {
      throw new Error('Not authenticated.');
    }
    const token = await auth.currentUser.getIdToken();
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        adminProfile,
        loading,
        authError,
        signInWithGoogle,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
