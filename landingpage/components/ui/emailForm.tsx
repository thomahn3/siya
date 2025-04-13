"use client";

import React, { useState } from "react";

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
          className="p-2 w-5/8 md:w-1/2 flex rounded-lg text-slate-600 bg-slate-100"
        />
        <button type="submit" className="bg-green-500 text-white text-sm lg:text-md w-3/8 md:w-1/4 rounded-lg hover:bg-green-400">
          Stay updated
        </button>
      </form>
      {message && <p className="mt-2 text-green-500">{message}</p>}
    </div>
  );
}