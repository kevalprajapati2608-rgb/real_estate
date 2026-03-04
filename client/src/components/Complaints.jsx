import { useState } from "react";

const Complaints = () => {

const [complaint,setComplaint] = useState("");

const handleSubmit = async () => {

  try {

    const res = await fetch("/api/complaints/create",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      credentials:"include",
      body: JSON.stringify({complaint})
    });

    const data = await res.json();

    if(!res.ok){
      alert(data.message);
      return;
    }

    alert("Complaint submitted successfully");
    setComplaint("");

  } catch(err){
    console.log(err);
  }

};

return (

<div className="max-w-md mx-auto p-[2px] rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-pink-500">

<div className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/40">

<h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
⚠ Report Complaint
</h2>

<textarea
value={complaint}
onChange={(e)=>setComplaint(e.target.value)}
placeholder="Describe your issue..."
rows="4"
className="w-full p-4 rounded-xl border border-gray-300
focus:ring-2 focus:ring-red-400 focus:border-red-400
outline-none resize-none
transition-all duration-300
shadow-sm focus:shadow-lg"
/>

<button
onClick={handleSubmit}
className="mt-6 w-full py-3 rounded-xl font-bold text-lg text-white
bg-gradient-to-r from-red-500 via-orange-500 to-pink-500
hover:scale-105 hover:shadow-2xl
transition-all duration-300"
>
Submit Complaint
</button>

</div>

</div>

);

};

export default Complaints;