import Navbar from "./home-pages/Navbar"
import styleClasses from "./css/Home.module.css";

const Nearby = () => {
    return (
        <div className={styleClasses.MainDiv}>
            <Navbar />
            <h1 className='center'>Nearby </h1>
        </div>
    )
}

export default Nearby
