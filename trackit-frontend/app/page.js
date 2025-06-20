"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center text-center px-6 py-12">
      <h1 className="text-5xl font-bold text-blue-700 mb-4 drop-shadow-sm">
        TrackIt - Task Manager
      </h1>
      <p className="text-gray-600 text-lg mb-6 max-w-2xl">
        Efficiently manage and track tasks with real-time updates and secure AES
        encryption.
      </p>

      <Link href="/login">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
          Get Started
        </button>
      </Link>

      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-left">
          <h3 className="text-xl font-bold text-blue-700 mb-2">🔐 Secure</h3>
          <p className="text-gray-600 text-sm">
            AES encryption ensures secure communication and role-based data
            access.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-left">
          <h3 className="text-xl font-bold text-green-600 mb-2">
            💬 Real-Time Chat
          </h3>
          <p className="text-gray-600 text-sm">
            Chat instantly with users/admins to resolve queries quickly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-left">
          <h3 className="text-xl font-bold text-purple-600 mb-2">
            📅 Deadline Tracking
          </h3>
          <p className="text-gray-600 text-sm">
            View all tasks, statuses, and due dates at one place for easy
            tracking.
          </p>
        </div>
      </section>
    </div>
  );
}
