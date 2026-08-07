import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { db, storage } from '../../lib/firebase';

export const useContent = (pageId) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (!pageId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const docRef = doc(db, 'content', pageId);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setContent(docSnap.data());
        } else {
          setContent({});
        }
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching content for ${pageId}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [pageId]);

  const saveContent = async (newContent) => {
    if (!pageId) throw new Error('No pageId provided to saveContent');
    setSaving(true);
    setError(null);
    try {
      const docRef = doc(db, 'content', pageId);
      await setDoc(docRef, newContent, { merge: true });
      setContent(newContent);
      setSaving(false);
      return true;
    } catch (err) {
      console.error(`Error saving content for ${pageId}:`, err);
      setError(err.message);
      setSaving(false);
      throw err;
    }
  };

  const uploadImage = async (file, fieldPath = 'image') => {
    if (!file) return null;
    setUploadingImage(true);
    try {
      const compressionOptions = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      let fileToUpload = file;
      try {
        fileToUpload = await imageCompression(file, compressionOptions);
      } catch (compressionErr) {
        console.warn('Image compression fallback to original file:', compressionErr);
      }

      const fileName = `${fieldPath.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`;
      const storageRef = ref(storage, `content/${pageId}/${fileName}`);

      await uploadBytes(storageRef, fileToUpload);
      const downloadUrl = await getDownloadURL(storageRef);
      setUploadingImage(false);
      return downloadUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
      setUploadingImage(false);
      throw err;
    }
  };

  return {
    content,
    setContent,
    loading,
    saving,
    uploadingImage,
    error,
    saveContent,
    uploadImage,
  };
};

export default useContent;
