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
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Listing</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          id="name"
          value={formData.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 rounded"
        />

        <textarea
          id="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="border p-3 rounded"
        />

        <input
          type="text"
          id="address"
          value={formData.address || ""}
          onChange={handleChange}
          placeholder="Address"
          className="border p-3 rounded"
        />

        <input
          type="number"
          id="regularPrice"
          value={formData.regularPrice || ""}
          onChange={handleChange}
          placeholder="Price"
          className="border p-3 rounded"
        />
        <input
  type="number"
  id="discountPrice"
  value={formData.discountPrice || ""}
  onChange={handleChange}
  placeholder="Discount Price"
  className="border p-3 rounded"
  required="false"
/>
<input
  type="number"
  id="bedrooms"
  value={formData.bedrooms || ""}
  onChange={handleChange}
  placeholder="Bedrooms"
  className="border p-3 rounded"
/>
<input
  type="number"
  id="bathrooms"
  value={formData.bathrooms || ""}
  onChange={handleChange}
  placeholder="Bathrooms"
  className="border p-3 rounded"
/>
<select
  id="type"
  value={formData.type || ""}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select Type</option>
  <option value="rent">Rent</option>
  <option value="sale">Sale</option>
</select>
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    id="furnished"
    checked={formData.furnished || false}
    onChange={handleChange}
  />
  Furnished
</label>
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    id="parking"
    checked={formData.parking || false}
    onChange={handleChange}
  />
  Parking
</label>


        {/* Old Images */}
        <div className="flex gap-2 flex-wrap">
          {formData.images?.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={`http://localhost:3000/uploads/${img}`}
                className="w-24 h-20 object-cover rounded"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    images: formData.images.filter((_, i) => i !== index),
                  })
                }
                className="absolute top-0 right-0 bg-red-500 text-white px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>

        {/*New image Preview*/}
        <div className="flex flex-wrap gap-4 mt-4">

  {newFiles.map((file, index) => {
    const previewUrl = URL.createObjectURL(file);

    return (
      <div key={index} className="relative w-32 h-24">

        <img
          src={previewUrl}
          alt="new"
          className="w-full h-full object-cover rounded-lg"
        />

        <button
          type="button"
          onClick={() =>
            setNewFiles((prev) =>
              prev.filter((_, i) => i !== index)
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


        {/* New Images */}
        <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const selectedFiles = Array.from(e.target.files);

    setNewFiles((prev) => [...prev, ...selectedFiles]);
  }}
  className="border p-3 rounded"
/>


        <button
          disabled={loading}
          className="bg-blue-600 text-white p-3 rounded"
        >
          {loading ? "Updating..." : "Update Listing"}
        </button>

      </form>
    </div>
  );
};

export default UpdateListing;
