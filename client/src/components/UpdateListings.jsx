import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateListing = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [newFiles, setNewFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  // Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/api/listing/${id}`);
      const data = await res.json();
      if (res.ok) setFormData(data);
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const form = new FormData();

  // Append text fields except images
  Object.keys(formData).forEach((key) => {
    if (key !== "images") {
      form.append(key, formData[key]);
    }
  });

  // Send updated old images array
  form.append("images", JSON.stringify(formData.images || []));

  // Append new images
  newFiles.forEach((file) => {
    form.append("images", file);
  });

  const res = await fetch(`/api/listing/update/${id}`, {
    method: "PUT",
    credentials: "include",
    body: form,
  });

  const data = await res.json();
  setLoading(false);

  if (res.ok) {
    alert("Updated Successfully");
    navigate("/my-listings");
  } else {
    alert(data.message);
  }
};

return (
  <div className="min-h-screen bg-[#9eafb4] py-10 px-4">
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-800 mb-2">
          ✏️ Update Property
        </h1>
        <p className="text-slate-800">
          Update your listing details professionally
        </p>
      </div>

      {/* MAIN CARD */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#d9dadd] border border-slate-700 rounded-3xl shadow-2xl p-8 space-y-8"
      >

        {/* GRID FIELDS */}
        <div className="grid md:grid-cols-2 gap-6">

          <input
            type="text"
            id="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Property Name"
            className="input-pro"
          />

          <input
            type="text"
            id="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="input-pro"
          />

          <input
            type="number"
            id="regularPrice"
            value={formData.regularPrice || ""}
            onChange={handleChange}
            placeholder="Regular Price"
            className="input-pro"
          />

          <input
            type="number"
            id="discountPrice"
            value={formData.discountPrice || ""}
            onChange={handleChange}
            placeholder="Discount Price"
            className="input-pro"
          />

          <input
            type="number"
            id="bedrooms"
            value={formData.bedrooms || ""}
            onChange={handleChange}
            placeholder="Bedrooms"
            className="input-pro"
          />

          <input
            type="number"
            id="bathrooms"
            value={formData.bathrooms || ""}
            onChange={handleChange}
            placeholder="Bathrooms"
            className="input-pro"
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          id="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Property Description"
          className="input-pro h-32"
        />

        {/* CHECKBOXES */}
        <div className="flex flex-wrap gap-6 bg-slate-800/60 p-5 rounded-2xl border border-slate-700">

          <label className="check-pro">
            <input
              type="checkbox"
              checked={formData.sale || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sale: e.target.checked,
                  rent: false,
                })
              }
            />
            🏷 Sale
          </label>

          <label className="check-pro">
            <input
              type="checkbox"
              checked={formData.rent || false}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rent: e.target.checked,
                  sale: false,
                })
              }
            />
            🏠 Rent
          </label>

          <label className="check-pro">
            <input
              type="checkbox"
              id="furnished"
              checked={formData.furnished || false}
              onChange={handleChange}
            />
            🛋 Furnished
          </label>

          <label className="check-pro">
            <input
              type="checkbox"
              id="parking"
              checked={formData.parking || false}
              onChange={handleChange}
            />
            🚗 Parking
          </label>
        </div>

        {/* OLD IMAGES */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Existing Images
          </h3>

          <div className="flex flex-wrap gap-4">
            {formData.images?.map((img, index) => (
              <div
                key={index}
                className="relative w-36 h-24 rounded-xl overflow-hidden group border border-slate-700"
              >
                <img
                  src={`http://localhost:3000/uploads/${img}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      images: formData.images.filter((_, i) => i !== index),
                    })
                  }
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* NEW FILE INPUT */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const selectedFiles = Array.from(e.target.files);
            setNewFiles((prev) => [...prev, ...selectedFiles]);
          }}
          className="input-pro"
        />

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
        >
          {loading ? "Updating..." : "🚀 Update Listing"}
        </button>
      </form>
    </div>
  </div>
);

};

export default UpdateListing;
