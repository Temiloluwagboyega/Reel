import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { Link } from "react-router-dom";
import img from "./heart-of-stone.jpg";
import "../../App.css";

function Form({ route, method }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({}); // State for field-specific errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Set the form title based on the method (login or register)
  const title = method === "login" ? "Login" : "Register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the specific input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Clear previous errors

    try {
      const payload =
        method === "login"
          ? { email: formData.email, password: formData.password }
          : { ...formData };

      const res = await api.post(route, payload);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/profile-setup");
      } else {
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data); // Store field-specific errors from backend
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="logo text-6xl text-green-600 fixed top-3 left-3">reel</div>
      <div className="form-containe flex">
        <form
          onSubmit={handleSubmit}
          className="grid justify-center self-center w-full"
        >
          <h1 className="text-xl mb-5">
            Welcome To Reel Kindly {title}
          </h1>

          {/* General Error Message */}
          {errors.general && <p className="text-red-500">{errors.general}</p>}

          <div className="form grid gap-7 self">
            <input
              className="border-solid border-gray-300 outline-green-600 transition-all border-2 rounded-md px-3 py-2 w-96"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
            />
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}  {/* Email error */}

            {method !== "login" && (
              <>
                <input
                  className="border-solid border-gray-300 outline-green-600 transition-all border-2 rounded-md px-3 py-2 w-96"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
                {errors.username && <p className="text-red-500">{errors.username[0]}</p>} {/* Username error */}
              </>
            )}

            <input
              className="border-solid border-gray-300 outline-green-600 transition-all border-2 rounded-md px-3 py-2 w-96"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
            />
            {errors.password && <p className="text-red-500">{errors.password[0]}</p>}  {/* Password error */}

            {method !== "login" && (
              <>
                <input
                  className="border-solid border-gray-300 outline-green-600 transition-all border-2 rounded-md px-3 py-2 w-96"
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                />
                {errors.password2 && <p className="text-red-500">{errors.password2[0]}</p>}  {/* Confirm password error */}
              </>
            )}

            <button
              className="form-button text-white rounded-lg pl-1 pr-10 py-2 bg-green-600"
              type="submit"
              disabled={loading}
            >
              {title}
            </button>

            <h1 className="text-white">
              <span className="text-gray-400">
                {method === "login" ? (
                  <p>
                    Don't Have an account?{" "}
                    <Link to="/register" className="text-green-600 font-bold">
                      Register
                    </Link>
                  </p>
                ) : (
                  <p>
                    Already Have an Account? Kindly{" "}
                    <Link to="/login" className="text-green-600 font-bold">
                      Login
                    </Link>
                  </p>
                )}
              </span>
            </h1>
          </div>
        </form>
        <img src={img} alt="" className="h-screen w-2/5" />
      </div>
    </>
  );
}

export default Form;
