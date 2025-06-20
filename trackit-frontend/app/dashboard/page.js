"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../utils/api"; // Correct import

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // For dropdown users
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "To Do",
    assignedTo: "", // Required for assigning task
  });

  // localStorage access inside useEffect to avoid SSR error
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    fetchTasks();
    if (storedRole === "admin") {
      fetchUsers();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      const res = await apiRequest("get", "/tasks", {}, token);
      setTasks(res.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiRequest("get", "/user/all", {}, token);
      setUsers(res.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await apiRequest("post", "/tasks", newTask, token);
      console.log("Task created:", res);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task._id}
          className="bg-white p-4 rounded shadow mb-4 transition transform hover:scale-105"
        >
          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard ({role})</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {role === "admin" ? (
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {showForm ? "Close" : "Create New Task"}
          </button>

          {showForm && (
            <form
              onSubmit={handleCreateTask}
              className="mt-4 space-y-4 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Create New Task
              </h2>

              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Task Title"
                required
                className="w-full p-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Task Description"
                required
                className="w-full p-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
                className="w-full p-2 border text-black border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>

              {/* User Dropdown */}
              <select
                name="assignedTo"
                value={newTask.assignedTo}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.email}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Create Task
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">To Do</h2>
            {renderTasks("To Do")}
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">
              In Progress
            </h2>
            {renderTasks("In Progress")}
          </div>

          <div className="bg-green-100 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Completed
            </h2>
            {renderTasks("Completed")}
          </div>
        </div>
      )}
    </div>
  );
}
