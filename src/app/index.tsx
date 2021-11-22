import { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import SignUp from "../account/SignUp";
import SocialAuthSuccess from "../account/SocialAuthSuccess";
import { PrivateRoute } from "../_components";
import Home from "../_components/Home";
import Bookshelf from "../_components/home-pages/Bookshelf";
import Nearby from "../_components/Nearby";
import AddBook from "../_components/home-pages/AddBook";
import Onboarding from "../_components/Onboarding/Onboarding";
import { accountService } from "../_services";
import { User } from "../_shared/models";

const App = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    const subscription = accountService.user.subscribe({
      next: (user) => {
        user && setUser(user as User);
      },
    });
    return subscription.unsubscribe;
  }, []);

  return (
    <div >
      <Switch>
        <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/bookshelf" component={Bookshelf} />
        <PrivateRoute exact path="/nearby" component={Nearby} />
        <PrivateRoute exact path="/add" component={AddBook} />
        <PrivateRoute exact path="/onboarding" component={Onboarding} />
        <Route exact path="/socialauth/success" component={SocialAuthSuccess} />
        <Route path="/account" component={SignUp} />
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
};

export default App;
