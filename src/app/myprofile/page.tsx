"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function page() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users/myprofile");
      setUser(response.data.user._id);
      setLoading(false);
    } catch (error: any) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onLogout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/signout");
      toast.success("User signout successfully!");
      router.push("/signin");
      setLoading(false);
    } catch (error: any) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen gap-y-3 justify-center items-center">
        <h1 className="text-lg">{loading ? "Loading..." : "My Profile"}</h1>
        <button
          onClick={getUserDetails}
          className="bg-green-600 px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
        >
          Get User Details
        </button>
        <div>
          {user === null ? (
            "No User Data"
          ) : (
            <Link href={`/myprofile/${user}`}>{user}</Link>
          )}
        </div>
        <button
          onClick={onLogout}
          className="bg-blue-600 px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default page;
