import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      next(); // ✅ Allow access
    } else {
      next("/about"); // 🔒 Redirect if not authenticated
    }
  });
}
