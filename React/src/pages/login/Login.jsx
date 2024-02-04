// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authActions } from "../../redux/slice/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import authSelector from "../../redux/selector/auth/AuthSelector";
import { useNavigate } from "react-router-dom";
const ValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Your name is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
    mode: "all",
    shouldUnregister: false,
  });
  const dispatch = useDispatch();
  const selector = useSelector(authSelector);
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {}, [selector]);
  const onSubmit = (data) => {
    dispatch(authActions.login(data));
    navigate("/HomePage")
  };
  return (
    <div className="my-16 md:my-24">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UserName
                </label>
                <input
                  type="text"
                  name="userName"
                  {...register("userName")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="abc"
                  required
                />
              </div>
              {errors["userName"] && (
                <span className="text-red-500 text-sm mt-2">
                  {errors["userName"].message}
                </span>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {errors["password"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["password"].message}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/registration"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
