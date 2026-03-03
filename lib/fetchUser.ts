export const fetchUser = async (): Promise<User | null> => {
  try {
    const res = await fetch("/api/credentials/auth/me", {
      credentials: "include",
    });

    if (!res.ok) return null;
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Fetch user failed:", error);
    return null;
  }
};
