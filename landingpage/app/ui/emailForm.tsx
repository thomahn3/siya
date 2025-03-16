"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
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
  };

  return (
    <div className="p-4 max-w-md mx-auto pt-8">
      <div className="text-xl mb-4 place-items-center text-green-600">
        <p>Interested in the application?</p>
        <p>Join the waiting list below.</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="border bg-white border-white p-2 rounded-lg"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded-lg">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}