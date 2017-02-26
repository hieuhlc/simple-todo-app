import { Router } from 'express';
import { listTodos, addTodo, toggleDoneTodo } from '../controllers/todo';
const router = new Router();

// Get todos
router.route('/todos').get(listTodos);

// Add a new todo
router.route('/todos').post(addTodo);

// Mark done a todo
router.route('/todos/:id').put(toggleDoneTodo);

export default router;
