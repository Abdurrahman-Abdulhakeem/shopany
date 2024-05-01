import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div class="register-container">
      <form class="register card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login to your Shopany account</h2>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            {...register("Email", { required: "Email is required!" })}
            className={errors.Email ? "error-input" : ""}
          />

          <ErrorMessage
            errors={errors}
            name="Email"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>
        <div>
          <span className="flex pass-eye-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("Password", { required: "Password is required" })}
              className={errors.Password ? "error-input" : ""}
            />

            <span className="eye-icon" onClick={handleShowPassword}>
              {" "}
              {showPassword ? (
                <IoEyeOffOutline size={22} />
              ) : (
                <IoEyeOutline size={22} />
              )}
            </span>
          </span>

          <ErrorMessage
            errors={errors}
            name="Password"
            render={({ message }) => (
              <span className="error-msg">{message}</span>
            )}
          />
        </div>

        <input type="submit" value="Login" class="btn" />

        <p>
          Don't have an account yet?{" "}
          <Link
            to="/register"
            style={{ marginLeft: "10px", color: "rgb(123, 104, 238)" }}
          >
            Sign up
          </Link>
        </p>
      </form>

      <p style={{ fontSize: "1.3em", color: "#fff" }}> &copy; Shopany {new Date().getFullYear()}</p>
    </div>
  );
}

export default LoginScreen;
