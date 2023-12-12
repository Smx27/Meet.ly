// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux/slice/auth/AuthSlice";
import authSelector from "../../redux/selector/auth/AuthSelector";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import moment from 'moment'
const ValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Your name is required"),
  knownAs: Yup.string().required("Display name is required"),
  gender: Yup.string()
  .required("Gender is required")
  .oneOf(["male", "female", "others"], "Invalid gender"),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .typeError("Invalid date"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  //terms: Yup.boolean().oneOf([true], "You must accept the Terms and Conditions"),
});
const Registration = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
    mode: "all",
    shouldUnregister: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const selector = useSelector(authSelector);
  useEffect(() => {}, [selector]);
  const onSubmit = (data) => {
    console.log(data.dateOfBirth);
    data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
    console.log(data.dateOfBirth)
    dispatch(authActions.registration(data));
  };
  return (
    <div className="my-16 md:my-48 lg:my-56">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-gray-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" autoComplete="true">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your name
                </label>
                <input
                  type="name"
                  name="userName"
                  {...register("userName")}
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name"
                  required
                />
                {errors["userName"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["userName"].message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Display name
                </label>
                <input
                  type="text"
                  name="knownAs"
                  {...register("knownAs")}
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="display name"
                  required
                />
                {errors["knownAs"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["knownAs"].message}
                  </span>
                )}
              </div>
              <div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Gender
  </label>
  <div className="flex">
    <div className="flex items-center mr-4">
      <input
        id="inline-radio"
        type="radio"
        {...register("gender", { required: true })}
        value="male"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="inline-radio"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Male
      </label>
    </div>
    <div className="flex items-center mr-4">
      <input
        id="inline-2-radio"
        type="radio"
        {...register("gender", { required: true })}
        value="female"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="inline-2-radio"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Female
      </label>
    </div>
    <div className="flex items-center mr-4">
      <input
        id="inline-checked-radio"
        type="radio"
        {...register("gender", { required: true })}
        value="others"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="inline-checked-radio"
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Others
      </label>
    </div>
  </div>
  {errors.gender && (
    <span className="text-red-500 text-sm mt-2">
      Gender is required
    </span>
  )}
</div>


              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  DOB
                </label>
                <input
                  type="date"
                  pattern="\d{4}-\d{2}-\d{2}"
                  name="dateOfBirth"
                  id="password"
                  {...register("dateOfBirth")}
                  className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors["dateOfBirth"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["dateOfBirth"].message}
                  </span>
                )}
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-2">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="name"
                    name="city"
                    {...register("city")}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="City"
                    required
                  />
                   {errors["city"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["city"].message}
                  </span>
                )}
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    type="country"
                    name="country"
                    {...register("country")}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Country"
                    required
                  />
                   {errors["country"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["country"].message}
                  </span>
                )}
                </div>
              </div>
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                   {errors["confirmPassword"] && (
                  <span className="text-red-500 text-sm mt-2">
                    {errors["confirmPassword"].message}
                  </span>
                )}
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
