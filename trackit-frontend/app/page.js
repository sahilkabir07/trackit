"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        TrackIt - Task Manager
      </h1>
      <p className="text-gray-600 text-lg mb-6 max-w-xl">
        Manage, assign, and track tasks efficiently. Built for teams and admins
        with secure AES encryption and real-time updates.
      </p>

      <Link href="/login">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow">
          Get Started
        </button>
      </Link>

      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p className="text-gray-500 text-sm">
            AES Encrypted communication with role-based access.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Real-Time Chat</h3>
          <p className="text-gray-500 text-sm">
            Communicate with users and admins instantly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Deadline Tracking</h3>
          <p className="text-gray-500 text-sm">
            Track task due dates and statuses in one place.
          </p>
        </div>
      </section>
    </div>
  );
}
