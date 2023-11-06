import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase.config";

export async function uploadDocuments(folderId, documents) {
  const urls = {};

  // Wait for all uploads to finish
  await Promise.all(
    Object.keys(documents).map(async (key) => {
      const fileRef = ref(storage, `${folderId}/${key}`);
      await uploadBytes(fileRef, documents[key]);
      urls[key] = await getDownloadURL(fileRef);
    })
  );

  return urls;
}
