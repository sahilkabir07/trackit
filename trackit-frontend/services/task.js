import { apiRequest } from "../utils/api";

export const getAllTasks = async () => {
  return await apiRequest("get", "/tasks");
};

export const createTask = async (taskData) => {
  return await apiRequest("post", "/tasks", taskData);
};

export const updateTask = async (taskId, updatedTaskData) => {
  return await apiRequest("put", `/tasks/${taskId}`, updatedTaskData);
};

export const deleteTask = async (taskId) => {
  return await apiRequest("delete", `/tasks/${taskId}`);
};
