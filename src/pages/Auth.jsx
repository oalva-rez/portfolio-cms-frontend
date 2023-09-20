import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import dashboardImg from "../../assets/images/dashboard-2.png";

export default function Auth({ pageState }) {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            serverError: "",
        },
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({
            ...prevInputData,
            [name]: value,
            errors: {
                ...prevInputData.errors,
                [name]: "", // clear the error message for the corresponding input field
            },
        }));
    };

    return (
        <main className="auth--container">
            <div className="image-block">
                {/* <img src={dashboardImg} alt="trayecto dashboard" /> */}
            </div>
            <div className="info-block">
                <h1>
                    Empowering Job Seekers with{" "}
                    <span className="gradient-text">AI-Powered</span> Tools for
                    Success.
                </h1>
                <h2>
                    Streamline Your Job Search Journey with Powerful AI Mock
                    Interviews and Personalized Cover Letters.
                </h2>
            </div>
            <div className="input-block">
                <form>
                    <div className="form-heading">
                        Let's login to your account first
                    </div>
                    <fieldset>
                        {inputData.errors.serverError && (
                            <p className="input-error">
                                {inputData.errors.serverError}
                            </p>
                        )}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                            value={inputData.email}
                            className={
                                inputData.errors.email ? "error-border" : ""
                            }
                        />
                        {inputData.errors.email && (
                            <p className="input-error">
                                {inputData.errors.email}
                            </p>
                        )}
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                            value={inputData.password}
                            className={
                                inputData.errors.password ? "error-border" : ""
                            }
                        />
                        {inputData.errors.password && (
                            <p className="input-error">
                                {inputData.errors.password}
                            </p>
                        )}
                    </fieldset>
                    <button
                        className="submit"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="submit"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        Demo Version
                    </button>
                    <p className="nav-link">
                        Dont have an account?{" "}
                        <Link to="/signup">Register Here</Link>
                    </p>
                </form>
                <div className="footer">
                    <p>&copy; 2023 TrayectoAI All rights reserved.</p>
                    <a href="#">Terms & Conditions</a> |{" "}
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
        </main>
    );
}
