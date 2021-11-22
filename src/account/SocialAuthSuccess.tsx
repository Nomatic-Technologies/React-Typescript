import { useEffect } from "react";
import Cookies from "js-cookie";
import { accountService } from "../_services";
import { useLocation, useHistory } from "react-router-dom";

const SocialAuthSuccess = () => {
  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      accountService.setUser(user);
      const { from } = location.state || { from: { pathname: "/" } };
      history.push(from);
    }
  });
  return <div>Authentication Successful. Logging in....</div>;
};

export default SocialAuthSuccess;
