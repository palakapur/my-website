"use client";
import React, { useState } from "react";
import { GoogleIcon } from "../shared/IconComponents";
import { signIn } from "next-auth/react";
import { PulseLoader } from "react-spinners";

type OAuthTypes = "google";
export default function OAuthButtons() {
  const [isLoading, setIsLoading] = useState({
    google: false,
  });

  const handleLoadingAnimation = (provider: OAuthTypes, animate: boolean) => {
    if (provider === "google") {
      setIsLoading({ google: animate });
    }
  };

  const handleSignin = async (provider: OAuthTypes) => {
    handleLoadingAnimation(provider, true);

    try {
      const response = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });
    } catch (err) {
      handleLoadingAnimation(provider, false);
      console.error(err);
    }
  };

  return (
    <div className="mb-10 flex flex-col">
      <button
        onClick={() => handleSignin("google")}
        className="relative py-2.5 mt-8 rounded-full bg-[#274a83] uppercase w-full text-white text-center text-sm font-semibold hover:opacity-80 transition-all duration-150"
      >
        <GoogleIcon className="absolute w-7 top-1/2 -translate-y-1/2 ml-2" />
        <div className="flex justify-center items-center gap-2">
          {isLoading.google ? <p>Loading</p> : <p>Sign in with Google</p>}
          <PulseLoader color="#ffffff" size={6} loading={isLoading.google} />
        </div>
      </button>
    </div>
  );
}
