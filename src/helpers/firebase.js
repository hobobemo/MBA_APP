import { ref as storRef, getDownloadURL } from "firebase/storage";
import { storage, database } from "@/firebase.ts";
import { ref as dbRef, get } from "firebase/database";

export default {
    async getFileUrl(value){
      const fileRef = storRef(storage, value);
      const url = await getDownloadURL(fileRef);
      return url;
    },
    async getUser(userId) {
      const dataRef = dbRef(database, "users/" + userId);
      try {
        const snapshot = await get(dataRef);
        if (snapshot.exists()) {
          return await snapshot.val();
        } else {
          return 0;
        }
      } catch (error) {
        return 0;
      }
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