"use client"; // If using Next.js with App Router

import { useEffect, useState } from "react";

const getSubscriberCount = async (): Promise<number> => {
  try {
    const res = await fetch("/api/subscribers"); // Calls API route
    const data = await res.json();
    return data.count;
  } catch (error) {
    console.error("Failed to fetch subscriber count:", error);
    return 0;
  }
};

const SubscriberCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getSubscriberCount().then(setCount);
  }, []);

  return (
    <div className="text-lg font-semibold">
      {count !== null ? `Total Subscribers: ${count}` : "Loading..."}
    </div>
  );
};

export default SubscriberCount;