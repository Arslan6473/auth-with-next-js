"use client"
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

function resetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const onReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetpassword", { email });
      console.log(response.data.user);
      setUser(response.data.user);
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
        <h1 className="text-lg">{loading ? "Loading..." : "Reset Password"}</h1>
        {user ? (
          <div>Check email to varify</div>
        ) : (
          <>
            <div className="w-60 h-12 relative flex rounded-xl">
              <input
                className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                name="username"
                placeholder="Enter email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              onClick={onReset}
              className="bg-[#222630] px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default resetPasswordPage;
