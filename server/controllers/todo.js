import Todo from '../models/todo';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

export function listTodos(req, res) {
  Todo.find().sort('-dateAdded').exec((err, todos) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todos });
  });
}

export function addTodo(req, res) {
  if (!req.body.todo.content) {
    res.status(403).end();
  }

  const newTodo = new Todo(req.body.todo);
  newTodo.id = cuid();

  // Let's sanitize inputs
  newTodo.content = sanitizeHtml(newTodo.content);

  newTodo.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ todo: saved });
  });
}

export function toggleDoneTodo(req, res) {
  Todo.findOne({ id: req.params.id }).exec((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    todo.isDone = !todo.isDone;
    todo.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ todo: saved });
    });
  });
}
