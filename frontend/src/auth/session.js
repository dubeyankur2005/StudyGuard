export async function restoreSession({ token, fetchUser, onInvalidToken }) {
  if (!token) return { user: null, retryable: false };

  try {
    return { user: await fetchUser(), retryable: false };
  } catch (error) {
    if (error.response?.status === 401) {
      onInvalidToken();
      return { user: null, retryable: false };
    }
    return { user: null, retryable: true };
  }
}
