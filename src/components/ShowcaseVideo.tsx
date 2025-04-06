"use client";
import React, { useRef, useState } from "react";
import { ShootingStar } from "@/components/ui/shooting-stars";
import { NavBar } from "./navbar";
import SlideArrowButton from "./ui/download-button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessComponent } from "./ui/success";

export function VideoShowcase() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "3080hostelhub");

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.cloudinary.com/v1_1/dtshyslt8/video/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          const videoUrl = response.secure_url;
          console.log("Uploaded URL:", response.secure_url);
          localStorage.setItem("vetano_uploaded_video", videoUrl);
          toast.success("Video uploaded successfully!");
          setShowSuccess(true);
        } else {
          toast.error("Upload failed. Try again.");
        }
        setUploadProgress(null);
      };

      xhr.onerror = () => {
        toast.error("An error occurred during upload.");
        setUploadProgress(null);
      };

      xhr.send(formData);
    } catch (error) {
      toast.error("Something went wrong.");
      setUploadProgress(null);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);


  return (
    <div className="h-[40rem] w-full bg-black relative overflow-hidden">
      <NavBar />
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Hidden file input */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Background with stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_80%)]" />
        <div className="stars absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-10 lg:mt-12 md:mt-12 h-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          <span className="text-[#ffae00]">CAPTURE YOUR TALENT,</span> CREATE YOUR CAREER!
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Make an impactful first impression with videos that show your skills upfront. Vetano helps candidates showcase abilities that often get overlooked, ensuring employers see potential from the start.
        </p>
        <div className="mt-10" onClick={handleButtonClick}>
          <SlideArrowButton text={uploadProgress ? "Uploading" : "Upload Video"} />
        </div>

        {/* Upload Progress Bar */}
        {uploadProgress !== null && (
          <div className="mt-6 w-2/3 max-w-md bg-white rounded-lg overflow-hidden h-10 relative">
            <div
              className="bg-[#ffae00] h-full transition-all duration-300 flex items-center justify-center text-white font-medium text-sm"
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        )}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 backdrop-blur-sm">
            <div className="p-10 relative">
              <SuccessComponent onClose={() => setShowSuccess(false)} />
            </div>
          </div>
        )}

      </div>

      {/* Shooting Stars */}
      <ShootingStar
        starColor="#9E00FF"
        trailColor="#2EB9DF"
        minSpeed={15}
        maxSpeed={35}
        minDelay={1000}
        maxDelay={3000}
      />
      <ShootingStar
        starColor="#FF0099"
        trailColor="#FFB800"
        minSpeed={10}
        maxSpeed={25}
        minDelay={2000}
        maxDelay={4000}
      />
      <ShootingStar
        starColor="#00FF9E"
        trailColor="#00B8FF"
        minSpeed={20}
        maxSpeed={40}
        minDelay={1500}
        maxDelay={3500}
      />

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
}
