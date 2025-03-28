import { ref as storRef, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.ts";

export default {
    async getFileUrl(value){
      const fileRef = storRef(storage, value);
      const url = await getDownloadURL(fileRef);
      return url;
    },
    formatTimestamp(timestamp){
      if (!timestamp) return "";
      return new Date(timestamp).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          year: "numeric",
          month: "short",
          day: "numeric",
      });
    },
}