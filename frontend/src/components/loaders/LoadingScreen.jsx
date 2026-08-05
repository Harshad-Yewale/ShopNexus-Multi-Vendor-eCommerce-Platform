import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <DotLottieReact
        src="/animations/PageLoading.json"
        loop
        autoplay
        style={{ width: 180, height: 180 }}
      />

      <h2 className="mt-3 text-xl font-semibold text-gray-900">
         Verifying your session
      </h2>

      <p className="mt-2 text-sm text-gray-500">
         Just a moment while we get things ready for you.
      </p>

      <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-180%);
          }
          100% {
            transform: translateX(360%);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;