'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  completedAt?: string; 
}
export default function ProjectDetails() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({ title: '', description: '', status: 'Pending' });

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`/api/projects/${projectId}/tasks`);
      const data = await res.json();
      setTasks(data.tasks);
      console.log(data);

    };
    fetchTasks();
  }, [projectId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setTasks([...tasks, data.task]);
    setFormData({ title: '', description: '' });
  };

  const handleDeleteTask = async (taskId: string) => {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task._id);
    setEditFormData({ title: task.title, description: task.description, status: task.status });
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTaskId) return;

    const res = await fetch(`/api/projects/${projectId}/tasks/${editingTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    });

    const data = await res.json();

    setTasks(tasks.map((task) => (task._id === editingTaskId ? data.task : task)));
    setEditingTaskId(null);
    setEditFormData({ title: '', description: '', status: 'Pending' });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Project Tasks</h1>

      <form onSubmit={handleCreateTask} className="flex flex-col gap-2 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Add Task
        </button>
      </form>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="border p-4 rounded flex flex-col gap-2">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-400">
                Created At: {new Date(task.createdAt).toLocaleString()}
              </p>
              {task.status === 'Completed' && task.completedAt && (
                <p className="text-sm text-green-500">
                  Completed At: {new Date(task.completedAt).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditTask(task)}
                className="bg-yellow-400 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingTaskId && (
        <form onSubmit={handleUpdateTask} className="bg-gray-100 p-6 mt-8 rounded">
          <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={editFormData.title}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-4"
            required
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={editFormData.description}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-4"
            required
          />
          <select
            name="status"
            value={editFormData.status}
            onChange={handleEditChange}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Update Task
          </button>
        </form>
      )}
    </div>
  );
}
