import { useCredentials } from "../hooks/useCredentials";
import LoginUser from "../pages/account/login";

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    // Login data added to props via redux-store (or use react context for example)
    const { token }: { token: string } = useCredentials();

    // If user is not logged in, return login component
    if (!token && typeof window !== "undefined") return <LoginUser />;

    // If user is logged in, return original component
    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
