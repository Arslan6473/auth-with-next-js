"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignupPage() {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();
  const changeHandle = (e: any) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast("User signup successfully!");
      if (response.data) router.push("/signin");
      setLoading(false);
    } catch (error: any) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.userName.length > 0
    ) {
      setIsDisabled(false);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col min-h-screen gap-y-3 justify-center items-center">
        <h1 className="text-lg">{loading ? "Loading..." : "Sign Up"}</h1>
        <div className="w-60 h-12 relative flex rounded-xl">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="userName"
            placeholder="Enter username"
            type="text"
            onChange={changeHandle}
            value={user.userName}
          />
        </div>
        <div className="w-60 h-12 relative flex rounded-xl">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="email"
            placeholder="Enter email"
            type="text"
            onChange={changeHandle}
            value={user.email}
          />
        </div>
        <div className="w-60 h-12 relative flex rounded-xl">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="password"
            placeholder="Enter password"
            type="text"
            onChange={changeHandle}
            value={user.password}
          />
        </div>
        {isDisabled ? (
          <div>No Sign Up</div>
        ) : (
          <button
            onClick={onSignUp}
            className="bg-[#222630] px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
          >
            Sign Up
          </button>
        )}
        <Link href={"/signin"}>Already have an account?</Link>
      </div>
    </>
  );
}

export default SignupPage;
