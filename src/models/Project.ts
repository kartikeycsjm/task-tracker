import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Project = models.Project || mongoose.model('Project', projectSchema);

export default Project;
