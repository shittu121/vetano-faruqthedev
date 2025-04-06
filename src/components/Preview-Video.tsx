"use client";
import { useEffect, useState } from "react";
import { NavBar } from "./navbar";

const PreviewVideo = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const storedUrl = localStorage.getItem("vetano_uploaded_video");
    if (storedUrl) {
      setVideoSrc(storedUrl);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden">
      <NavBar />

      {/* Background with stars */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* Content below the navbar */}
      <div className="relative z-10 flex items-center justify-center px-8 lg:px-4 md:px-4 pt-40 pb-16">
        {videoSrc ? (
          <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-lg border border-white/20">
            <video
              src={videoSrc}
              controls
              className="w-full max-h-[450px] object-contain rounded-md"
            />
          </div>
        ) : (
          <p className="text-center text-white text-lg">No uploaded video found.</p>
        )}
      </div>

      {/* Background star animation styles */}
      <style jsx>{`
        .stars {
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export { PreviewVideo };
