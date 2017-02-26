import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  id: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  dateAdded: { type: Date, default: Date.now, required: true },
});

export default mongoose.model('Todo', todoSchema);
