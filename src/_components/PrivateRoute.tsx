import { Route, Redirect, RouteProps } from "react-router-dom";
import { accountService } from "../_services";

interface PrivateRouteProps extends RouteProps {
  roles?: string[];
}

function PrivateRoute({
  component: Component,
  roles,
  ...rest
}: PrivateRouteProps) {
  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={(props) => {
        const user = accountService.userValue;
        if (!user) {
          console.log("redirect");
          // not logged in so redirect to signin page with the return url
          return (
            <Redirect
              to={{
                pathname: "/account",
                state: { from: props.location },
              }}
            />
          );
        }

        console.log(user);

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorized so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
