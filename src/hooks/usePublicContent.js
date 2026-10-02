import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const deepMerge = (target, source) => {
  if (!source) return target;
  if (!target) return source;

  const result = { ...target };
  for (const key of Object.keys(source)) {
    const sourceVal = source[key];
    const targetVal = target[key];

    if (Array.isArray(sourceVal)) {
      // Only override defaults if Firestore actually has items — don't blank out with empty []
      result[key] = sourceVal.length > 0 ? sourceVal : (Array.isArray(targetVal) ? targetVal : sourceVal);
    } else if (sourceVal !== null && typeof sourceVal === 'object') {
      result[key] = deepMerge(targetVal || {}, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
};

export const usePublicContent = (pageId, defaultContent = {}) => {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pageId) {
      setLoading(false);
      return;
    }

    let unsubscribe = () => {};

    try {
      const docRef = doc(db, 'content', pageId);
      unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setContent(deepMerge(defaultContent, data));
          } else {
            setContent(defaultContent);
          }
          setLoading(false);
        },
        (err) => {
          console.warn(`[usePublicContent] Falling back to default content for ${pageId}:`, err);
          setError(err.message);
          setContent(defaultContent);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn(`[usePublicContent] Could not connect to Firestore for ${pageId}, using defaults:`, err);
      setError(err.message);
      setContent(defaultContent);
      setLoading(false);
    }

    return () => unsubscribe();
  }, [pageId]);

  return { content, loading, error };
};

export default usePublicContent;
