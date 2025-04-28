import mongoose, { Schema, models } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  projectId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = models.Task || mongoose.model('Task', taskSchema);

export default Task;
