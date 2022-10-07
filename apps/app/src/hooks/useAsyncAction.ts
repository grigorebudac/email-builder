import { useState } from 'react';

function useAsyncAction<T = any, K = any>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<K | null>(null);

  async function onTriggerAction(
    action: () => Promise<T>,
    onError?: (err: K) => void
  ): Promise<T> {
    try {
      setError(null);
      setIsLoading(true);
      return await action();
    } catch (err) {
      setError(err);
      onError?.(err);

      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function onClearError() {
    if (error) {
      setError(null);
    }
  }

  return { isLoading, error, onClearError, onTriggerAction };
}

export default useAsyncAction;
