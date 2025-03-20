"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || "Something went wrong");
    setEmail("");
  }

  return (
    <div className="pt-4">
      {/* <div className="text-xl mb-4 place-items-center text-green-600">
        <p>Interested in the application?</p>
        <p>Join the waiting list below.</p>
      </div> */}
      <form onSubmit={handleSubmit} className="flex flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="p-2 pr-8 rounded-lg text-slate-600 bg-slate-100"
        />
        <button type="submit" className="bg-green-500 text-white pl-14 pr-14 rounded-lg">
          Stay updated
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}