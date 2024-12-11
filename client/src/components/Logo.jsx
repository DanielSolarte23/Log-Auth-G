import LogoDan from "../../public/DANSOL.png"
import "../App.css"

const Logo = ({ className }) => (
    <div className={`object-contain ${className}`}>
        <img className="images" src={LogoDan} alt="" />
    </div>
);

export default Logo;