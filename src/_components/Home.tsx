import Navbar from "./home-pages/Navbar";
import { useHistory } from "react-router-dom";
import { accountService } from "../_services";
import styleClasses from "./css/Home.module.css";

const Home = () => {
  let history = useHistory();

  return (
    <div className={styleClasses.MainDiv}>
      <Navbar />
      <h1 className='center'>Home </h1>

      <button
        onClick={() => {
          accountService.logout();
          history.push("/");
        }}
        type="button"
        className="btn btn-primary"
        style={{ position: 'fixed', bottom: '2px', right: '2px' }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
