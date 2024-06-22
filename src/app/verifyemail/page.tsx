"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const varifyToken = searchParams.get("token");
    if (varifyToken) setToken(varifyToken);
  }, []);

  const varifyHandle = async () => {
    try {
      console.log(token);
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data) {
        setVerified(true);
      }
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
        <h1 className="text-lg">
          {loading ? "Loading" : "Click to varify your account "}
        </h1>
        {verified ? (
          <div className="text-lg">Your account is varified</div>
        ) : (
          <button
            onClick={varifyHandle}
            className="bg-orange-600 px-3 py-2 text-white rounded-lg border-2  border-solid focus:border-[#596A95] border-[#2B3040]"
          >
            Varify
          </button>
        )}

        {verified ? (
          <div className="text-lg text-green-600  font-semibold">Varified</div>
        ) : (
          <div className="text-lg text-red-600  font-semibold">
            Not Varified
          </div>
        )}

        <Link href={"/"}>Back to My Profile!</Link>
      </div>
    </>
  );
}

export default VerifyEmailPage;
