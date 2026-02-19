import { useEffect, useState } from "react";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const usersRes = await fetch("/api/admin/users", {
          credentials: "include",
        });
        const usersData = await usersRes.json();

        const listingRes = await fetch("/api/admin/listings", {
          credentials: "include",
        });
        const listingData = await listingRes.json();

        setUsers(usersData);
        setListings(listingData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        🛠 Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold text-indigo-600">{users.length}</h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Total Listings</p>
          <h2 className="text-4xl font-bold text-emerald-600">
            {listings.length}
          </h2>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-4">👥 Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.isAdmin ? "✅ Yes" : "❌ No"}</td>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm("Delete this user?");
                      if (!confirmDelete) return;

                      const res = await fetch(`/api/admin/user/${u._id}`, {
                        method: "DELETE",
                        credentials: "include",
                      });

                      if (res.ok) {
                        setUsers(users.filter((user) => user._id !== u._id));
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LISTINGS TABLE */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">🏠 Listings</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Type</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{l.name}</td>
                  <td className="p-3">₹ {l.regularPrice}</td>
                  <td className="p-3">
                    {l.sale ? "Sale" : l.rent ? "Rent" : "-"}
                  </td>
                  <button
                    onClick={async () => {
                      const confirmDelete = confirm("Delete this listing?");
                      if (!confirmDelete) return;

                      const res = await fetch(`/api/admin/listing/${l._id}`, {
                        method: "DELETE",
                        credentials: "include",
                      });

                      if (res.ok) {
                        setListings(
                          listings.filter((item) => item._id !== l._id),
                        );
                      }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
