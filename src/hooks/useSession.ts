import { useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties based on your session data
} | null;

type UseSessionReturn = {
  user: User;
  loading: boolean;
};

export function useSession(): UseSessionReturn {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { user, loading };
}
