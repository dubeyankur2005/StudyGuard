import { useCallback, useEffect, useMemo, useState } from "react";
import client from "../api/client";
import { AuthContext } from "./authContext";
import { restoreSession } from "./session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("studyguard_token")));
  const [sessionError, setSessionError] = useState(false);

  const verifySession = useCallback(async () => {
    setLoading(true);
    setSessionError(false);
    const token = localStorage.getItem("studyguard_token");
    const result = await restoreSession({
      token,
      fetchUser: async () => {
        const { data } = await client.get("/auth/me");
        return data.data;
      },
      onInvalidToken: () => localStorage.removeItem("studyguard_token"),
    });
    setUser(result.user);
    setSessionError(result.retryable);
    setLoading(false);
  }, []);

  useEffect(() => {
    const clear = () => {
      setUser(null);
      setSessionError(false);
      setLoading(false);
    };
    window.addEventListener("studyguard:unauthorized", clear);
    const verificationTask = window.setTimeout(verifySession, 0);
    return () => {
      window.clearTimeout(verificationTask);
      window.removeEventListener("studyguard:unauthorized", clear);
    };
  }, [verifySession]);

  const value = useMemo(() => ({
    user,
    loading,
    sessionError,
    retrySession: verifySession,
    async authenticate(path, values) {
      const { data } = await client.post(`/auth/${path}`, values);
      localStorage.setItem("studyguard_token", data.data.token);
      setUser(data.data.user);
      setSessionError(false);
      setLoading(false);
    },
    logout() {
      localStorage.removeItem("studyguard_token");
      setUser(null);
      setSessionError(false);
      setLoading(false);
    },
  }), [user, loading, sessionError, verifySession]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
