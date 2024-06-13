import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Redirect to the sign-in page if the user is not authenticated
  pages: {
    // The sign-in page route exists or else it will give 404
    signIn: "/api/auth/signin",
  },
});

// Middleware should match only the protected routes that can't be accessed without authentication
export const config = {
  matcher: ["/watchlist"],
};
