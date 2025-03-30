import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const auth = getAuth();

  // Check immediately
  if (auth.currentUser) {
    next(); // ✅ Allow access
  } else {
    // If currentUser is null, wait for auth state change
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); // ✅ Allow access after login
      } else {
        next("/about"); // 🔒 Redirect to About Us page
      }
    });
  }
}
