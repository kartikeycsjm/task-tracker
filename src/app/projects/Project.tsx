'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
  title: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      console.log(data);
      
      setProjects(data.projects);
    };
    fetchProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    setProjects([...projects, data.project]);
    setTitle('');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </form>

      <ul className="space-y-2">
        {projects.map((project) => (
          <li
            key={project._id}
            onClick={() => router.push(`/projects/${project._id}`)}
            className="border p-4 rounded 
            cursor-pointer hover:bg-gray-100"
          >
            {project.title}
          </li>
        ))}
      </ul>
      <p className='text-center mt-5 font-light'>
        Click on project and read, add task, update and delete.
        </p>
    </div>
  );
}
