import { useState } from "react";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: "",
    discountPrice: "",
    sale: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
  });

    const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0 || files.length > 6) {
      alert("Upload 1 to 6 images");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    for (let i = 0; i < files.length; i++) {
      data.append("images", files[i]);
    }
data.append("userRef", currentUser._id);
    try {
      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        setMessage("Listing created successfully!");
        // Reset form
        setFormData({
          name: "",
          description: "",
          address: "",
          regularPrice: "",
          discountPrice: "",
          bedrooms: 1,
          bathrooms: 1,
          sale: false,
          rent: false,
          parking: false,
          furnished: false,
          offer: false,
        });
        setFiles([]);
      } else {
        setMessage(result.message || "Failed to create listing");
      }
    } catch (err) {
      console.error("Error uploading listing:", err);
    }
  };

return (
  <main className="relative min-h-screen px-6 py-10 
  bg-gradient-to-br from-slate-100 via-indigo-100 to-slate-200
  dark:from-slate-950 dark:via-slate-900 dark:to-black
  transition-colors duration-500">

    {/* Glow Background */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[120px] bottom-[-100px] right-[-100px]"></div>
    </div>

    <div className="max-w-6xl mx-auto bg-white/70 dark:bg-slate-900/60
    backdrop-blur-2xl border border-white/30 dark:border-slate-800
    shadow-2xl rounded-3xl p-10">

      <h1 className="text-4xl font-bold text-center mb-10
      text-slate-800 dark:text-white tracking-tight">
        Create Listing
      </h1>

      {message && (
        <div className="bg-green-100 dark:bg-green-900/40 
        text-green-800 dark:text-green-300 
        p-4 rounded-xl mb-6 text-center">
          {message}
        </div>
      )}

      <form className="flex flex-col lg:flex-row gap-10" onSubmit={handleSubmit}>

        {/* LEFT SECTION */}
        <div className="flex flex-col flex-1 gap-6">

          <input
            type="text"
            placeholder="Property Name"
            id="name"
            onChange={handleChange}
            className="premium-input"
            required
          />

          <textarea
            placeholder="Property Description"
            id="description"
            onChange={handleChange}
            className="premium-input min-h-[120px]"
            required
          />

          <input
            type="text"
            placeholder="Address"
            id="address"
            onChange={handleChange}
            className="premium-input"
            required
          />

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            {["sale","rent","parking","furnished","offer"].map((field) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  id={field}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-600"
                />
                <span className="text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 transition">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {/* Numbers Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div>
              <p className="label">Bedrooms</p>
              <input type="number" id="bedrooms" min="1" max="10"
                value={formData.bedrooms}
                onChange={handleChange}
                className="premium-input" />
            </div>

            <div>
              <p className="label">Bathrooms</p>
              <input type="number" id="bathrooms" min="1" max="10"
                value={formData.bathrooms}
                onChange={handleChange}
                className="premium-input" />
            </div>

            <div>
              <p className="label">Regular Price</p>
              <input type="number" id="regularPrice" min="500000"
                value={formData.regularPrice}
                onChange={handleChange}
                className="premium-input" />
            </div>

            <div>
              <p className="label">Discount Price</p>
              <input type="number" id="discountPrice" min="0"
                value={formData.discountPrice}
                onChange={handleChange}
                className="premium-input" />
            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col flex-1 gap-6">

          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Images
            <span className="text-sm font-normal text-slate-500 ml-2">
              (First image will be cover • Max 6)
            </span>
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files);
              setFiles((prevFiles) => {
                const updatedFiles = [...prevFiles, ...selectedFiles];
                if (updatedFiles.length > 6) {
                  alert("Maximum 6 images allowed");
                  return prevFiles;
                }
                return updatedFiles;
              });
            }}
            className="premium-input cursor-pointer"
          />

          {/* Image Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {files.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative group rounded-xl overflow-hidden shadow-md">
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full h-28 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prevFiles) =>
                        prevFiles.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 
                    text-white text-xs px-2 py-1 rounded-md shadow-md transition"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600
            text-white font-semibold py-3 rounded-xl
            shadow-lg hover:shadow-xl
            hover:scale-[1.02]
            transition-all duration-300
            disabled:opacity-70"
          >
            Create Listing
          </button>

        </div>

      </form>
    </div>
  </main>
);
};

export default CreateListing;
