import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateListingPage = () => {
  const { id } = useParams();   // ✅ listing id

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    sale: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    images: [],
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/listing/${id}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Listing fetch failed");
        }

        const listingDataFromBackend = await response.json();

        // 🔥 PRE-FILL FORM
        setFormData(listingDataFromBackend);
      } catch (error) {
        console.log("Fetch listing error:", error);
      }
    };

    fetchListing();
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Update Listing</h1>

      <form>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(event) =>
            setFormData({ ...formData, address: event.target.value })
          }
        />
      </form>
    </div>
  );
};

export default UpdateListingPage;
