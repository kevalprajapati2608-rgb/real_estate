import { useState, useEffect } from "react";

const ReviewSection = () => {

const [reviews,setReviews] = useState([]);

const [form,setForm] = useState({
  userName:"",
  type:"rating",
  rating:5,
  message:""
});

useEffect(()=>{
fetchReviews();
},[]);

const fetchReviews = async()=>{
const res = await fetch("/api/reviews");
const data = await res.json();
setReviews(data);
};

const handleSubmit = async(e)=>{
e.preventDefault();

await fetch("/api/reviews/create",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(form)
});

fetchReviews();
};

return(

<div className="bg-white py-16">

<h2 className="text-3xl font-bold text-center mb-10">
⭐ Ratings / Feedback / Complaints
</h2>

{/* FORM */}

<form
onSubmit={handleSubmit}
className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md space-y-4"
>

<input
placeholder="Your Name"
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,userName:e.target.value})}
/>

<select
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,type:e.target.value})}
>

<option value="rating">Rating</option>
<option value="feedback">Feedback</option>
<option value="complaint">Complaint</option>

</select>

{form.type==="rating" && (

<input
type="number"
min="1"
max="5"
className="w-full border p-3 rounded"
placeholder="Rating (1-5)"
onChange={(e)=>setForm({...form,rating:e.target.value})}
/>

)}

<textarea
placeholder="Write your message..."
className="w-full border p-3 rounded"
onChange={(e)=>setForm({...form,message:e.target.value})}
/>

<button
className="bg-indigo-600 text-white px-6 py-3 rounded-lg w-full"
>
Submit
</button>

</form>

{/* REVIEWS LIST */}

<div className="grid md:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">

{reviews.map((r)=>(
<div key={r._id} className="bg-gray-50 p-6 rounded-xl shadow">

<h3 className="font-bold">{r.userName}</h3>

<p className="text-sm text-gray-500 mb-2">{r.type}</p>

{r.type==="rating" && (
<p className="text-yellow-500">
{"⭐".repeat(r.rating)}
</p>
)}

<p>{r.message}</p>

</div>
))}

</div>

</div>

);

};

export default ReviewSection;