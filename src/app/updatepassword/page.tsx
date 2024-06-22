"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function updatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const resetToken = searchParams.get("token");
    if (resetToken) setToken(resetToken);
  }, []);

  const onUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/updatepassword", {
        password,
        token,
      });
      if (response.data) router.push("/signin");
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
        <h1 className="text-lg">{loading ? "Loading..." : "Create New Password"}</h1>

        <div className="w-60 h-12 relative flex rounded-xl">
          <input
            className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
            name="password"
            placeholder="Enter new password"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          onClick={onUpdate}
          className="bg-[#222630] px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
        >
          Update Password
        </button>
      </div>
    </>
  );
}

export default updatePasswordPage;
