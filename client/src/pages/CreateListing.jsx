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
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>

  {/* Message */}
      {message && (
        <div className="bg-green-200 text-green-800 p-3 rounded mb-4">
          {message}
        </div>
      )}
      
      <form className="flex flex-col sm:flex-row gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col flex-1 gap-4">
          <input type="text" placeholder="Name" id="name" onChange={handleChange} className="border p-3 rounded-lg" required />
          <textarea placeholder="Description" id="description" onChange={handleChange} className="border p-3 rounded-lg" required />
          <input type="text" placeholder="Address" id="address" onChange={handleChange} className="border p-3 rounded-lg" required />

          <div className="flex gap-6 flex-wrap">
            {["sale","rent","parking","furnished","offer"].map((field) => (
              <label key={field} className="flex gap-2 items-center">
                <input type="checkbox" id={field} onChange={handleChange} className="w-5" />
                <span>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-6">
           <div> <p>Bed Rooms:</p><input type="number" placeholder="Bed Rooms" id="bedrooms" min="1" max="10" value={formData.bedrooms} onChange={handleChange} className="p-3 border rounded-lg" /></div>
            <div><p>Bath Rooms</p><input type="number" placeholder="Bath Rooms" id="bathrooms" min="1" max="10" value={formData.bathrooms} onChange={handleChange} className="p-3 border rounded-lg" /></div>
           <div> Reguler Price:
            <input type="number" placeholder="Reguler Price" id="regularPrice" min="500000" value={formData.regularPrice} onChange={handleChange} className="p-3 border rounded-lg" /></div> 
            <div>Discounte price<input type="number" id="discountPrice" min="0" value={formData.discountPrice} onChange={handleChange} className="p-3 border rounded-lg" />
            </div>
            </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images: <span className="font-normal text-gray-600 ml-2">The first image will be cover (max 6)</span>
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

  className="border p-3 rounded"
/>
<div className="flex flex-wrap gap-4 mt-4">
  {files.map((file, index) => {
    const previewUrl = URL.createObjectURL(file);

    return (
      <div key={index} className="relative w-32 h-24">

        <img
          src={previewUrl}
          alt="preview"
          className="w-full h-full object-cover rounded-lg"
        />

        <button
          type="button"
          onClick={() =>
            setFiles((prevFiles) =>
              prevFiles.filter((_, i) => i !== index)
            )
          }
          className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
        >
          X
        </button>

      </div>
    );
  })}
</div>



        
          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer">Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
