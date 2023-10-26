
import { storage } from "./index";

import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

export const uploadFile = (file, filepath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filepath);

    try {
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      console.log("image Url in function --->", url);
      resolve(url)
    } catch (error) {
      reject(error);
    }
  });
};
