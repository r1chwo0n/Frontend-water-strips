import "../style/insert.css";
import Header from "./Header";
import { useState } from "react";

export default function Insert() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // สร้าง URL ตัวอย่างสำหรับภาพ
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !brand || !location) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("stripImage", selectedFile);
    formData.append("s_brand", brand);
    formData.append("s_location", location);

    try {
      const response = await fetch("http://localhost:3000/strips/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        // alert("Strip added successfully!");
        alert(`Strip added successfully! Image URL: ${result.imageUrl}`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (err) {
      alert(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <>
      <Header
        username="username"
        userAvatar="https://i.pinimg.com/736x/2c/01/e8/2c01e8d27a9aab256394677fd598e766.jpg"
        bgColor="#C9E0EF"
      />
      <div
        className="flex justify-center items-center w-screen min-h-screen"
        style={{ backgroundColor: "#C9E0EF" }}
      >
        <div className="font-['Arial'] flex flex-col space-y-5 items-center">
          <div className="text-center">
            <p className="font-bold text-3xl">Add new</p>
            <p className="">add new ...</p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="flex justify-center mt-4">
              <img
                src={preview}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="flex flex-row justify-center space-x-4 mt-4">
            {/* Select Photo Button */}
            <label className="Button border rounded-2xl px-12 py-2 text-white font-bold cursor-pointer">
              Select Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Camera Button */}
            <label className="rounded-full px-3 Button cursor-pointer flex items-center justify-center">
              <img
                className="w-5 h-5"
                src="src/pic/camera.png"
                alt="camera icon"
              />
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Other Form Inputs */}
          <div className="flex flex-col space-y-2 mt-6">
            <p className="font-bold">Brand</p>
            <input
              type="text"
              className="appearance-none border rounded-lg w-[300px] h-[36px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              style={{ backgroundColor: "white" }}
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex flex-col space-y-2 mt-4">
            <p className="font-bold">Location</p>
            <input
              type="text"
              className="appearance-none border rounded-lg w-[300px] h-[36px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              style={{ backgroundColor: "white" }}
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            ></input>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={handleSubmit}
              className="Button border rounded-full px-9 py-2 text-white font-bold"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
