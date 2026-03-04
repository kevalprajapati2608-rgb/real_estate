import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    soldProperties: 0,
    monthlySales: {},
  });
  const [ratings,setRatings] = useState([]);
const [feedbacks,setFeedbacks] = useState([]);
const [complaints,setComplaints] = useState([]);
  const chartData = stats?.monthlySales
    ? Object.entries(stats.monthlySales).map(([month, revenue]) => ({
        month,
        revenue,
      }))
    : [];
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

        const transactionRes = await fetch("/api/admin/transactions", {
          credentials: "include",
        });
        const statsRes = await fetch("/api/admin/stats", {
          credentials: "include",
        });

        const statsData = await statsRes.json();

        const ratingRes = await fetch("/api/admin/ratings",{credentials:"include"});
const ratingData = await ratingRes.json();

const feedbackRes = await fetch("/api/admin/feedbacks",{credentials:"include"});
const feedbackData = await feedbackRes.json();

const complaintRes = await fetch("/api/admin/complaints",{credentials:"include"});
const complaintData = await complaintRes.json();


        setStats(statsData);
        const transactionData = await transactionRes.json();

        setUsers(usersData);
        setListings(listingData);
        setTransactions(transactionData);
        setRatings(ratingData);
setFeedbacks(feedbackData);
setComplaints(complaintData);
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
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold text-indigo-600">{users.length}</h2>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="text-4xl font-bold text-green-600">
            ₹ {stats.totalRevenue}
          </h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Sold Properties</p>
          <h2 className="text-4xl font-bold text-red-600">
            {stats.soldProperties}
          </h2>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <p className="text-gray-500">Total Listings</p>
          <h2 className="text-4xl font-bold text-emerald-600">
            {listings.length}
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">
        <h2 className="text-2xl font-bold mb-6">📈 Monthly Sales</h2>

        <div className="bg-white p-6 rounded-3xl shadow-xl mb-10">
          <h2 className="text-2xl font-bold mb-6">📈 Monthly Sales</h2>

          {chartData.length === 0 ? (
            <p className="text-gray-500">No sales data</p>
          ) : (
            chartData.map((item) => (
              <div
                key={item.month}
                className="flex justify-between items-center py-3 border-b last:border-none"
              >
                <span className="font-medium text-gray-700">{item.month}</span>

                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-semibold">
                  ₹ {item.revenue}
                </span>
              </div>
            ))
          )}
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
                  <td className="p-3">
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
                  </td>
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
                  <td className="p-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* TRANSACTIONS TABLE */}

      <div className="bg-white rounded-3xl shadow-xl p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">💳 Transactions</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">User</th>
                <th className="p-3">Property</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{t.userId?.username}</td>
                  <td className="p-3">{t.listingId?.name}</td>
                  <td className="p-3">₹ {t.amount}</td>
                  <td className="p-3">
                    {new Date(t.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*Ratings-feedback-complaint*/}
      <div className="bg-white rounded-3xl shadow-xl p-6 mt-10">
<h2 className="text-2xl font-bold mb-4">⭐ Ratings</h2>

<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="p-3">User</th>
<th className="p-3">Rating</th>
</tr>
</thead>

<tbody>
{ratings.map((r)=>(
<tr key={r._id} className="border-b">
<td className="p-3">{r.userId?.username}</td>
<td className="p-3">{r.rating} ⭐</td>
</tr>
))}
</tbody>
</table>
</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-10">
<h2 className="text-2xl font-bold mb-4">💬 Feedback</h2>

<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="p-3">User</th>
<th className="p-3">Message</th>
</tr>
</thead>

<tbody>
{feedbacks.map((f)=>(
<tr key={f._id} className="border-b">
<td className="p-3">{f.userId?.username}</td>
<td className="p-3">{f.message}</td>
</tr>
))}
</tbody>
</table>
</div>

<div className="bg-white rounded-3xl shadow-xl p-6 mt-10">
<h2 className="text-2xl font-bold mb-4">⚠ Complaints</h2>

<table className="w-full text-left">
<thead>
<tr className="border-b">
<th className="p-3">User</th>
<th className="p-3">Complaint</th>
</tr>
</thead>

<tbody>
{complaints.map((c)=>(
<tr key={c._id} className="border-b">
<td className="p-3">{c.userId?.username}</td>
<td className="p-3">{c.complaint}</td>
</tr>
))}
</tbody>
</table>
</div>
    </div>
  );
};

export default AdminDashboard;
