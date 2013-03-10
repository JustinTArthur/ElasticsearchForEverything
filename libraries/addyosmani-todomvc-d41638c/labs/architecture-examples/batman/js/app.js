var Alfred,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Alfred = (function(_super) {

  __extends(Alfred, _super);

  function Alfred() {
    return Alfred.__super__.constructor.apply(this, arguments);
  }

  Alfred.root('todos#all');

  Alfred.route('/completed', 'todos#completed');

  Alfred.route('/active', 'todos#active');

  return Alfred;

})(Batman.App);

Alfred.TodosController = (function(_super) {

  __extends(TodosController, _super);

  function TodosController() {
    TodosController.__super__.constructor.apply(this, arguments);
    this.set('newTodo', new Alfred.Todo({
      completed: false
    }));
  }

  TodosController.prototype.routingKey = 'todos';

  TodosController.prototype.currentTodoSet = 'all';

  TodosController.accessor('currentTodos', function() {
    return Alfred.Todo.get(this.get('currentTodoSet'));
  });

  TodosController.prototype.all = function() {
    return this.set('currentTodoSet', 'all');
  };

  TodosController.prototype.completed = function() {
    this.set('currentTodoSet', 'completed');
    return this.render({
      source: 'todos/all'
    });
  };

  TodosController.prototype.active = function() {
    this.set('currentTodoSet', 'active');
    return this.render({
      source: 'todos/all'
    });
  };

  TodosController.prototype.createTodo = function() {
    var _this = this;
    return this.get('newTodo').save(function(err, todo) {
      if (err) {
        if (!(err instanceof Batman.ErrorsSet)) {
          throw err;
        }
      } else {
        return _this.set('newTodo', new Alfred.Todo({
          completed: false,
          title: ""
        }));
      }
    });
  };

  TodosController.prototype.todoDoneChanged = function(node, event, context) {
    var todo;
    todo = context.get('todo');
    return todo.save(function(err) {
      if (err && !err instanceof Batman.ErrorsSet) {
        throw err;
      }
    });
  };

  TodosController.prototype.destroyTodo = function(node, event, context) {
    var todo;
    todo = context.get('todo');
    return todo.destroy(function(err) {
      if (err) {
        throw err;
      }
    });
  };

  TodosController.prototype.toggleAll = function(node, context) {
    return Alfred.Todo.get('all').forEach(function(todo) {
      todo.set('completed', !!node.checked);
      return todo.save(function(err) {
        if (err && !err instanceof Batman.ErrorsSet) {
          throw err;
        }
      });
    });
  };

  TodosController.prototype.clearCompleted = function() {
    return Alfred.Todo.get('completed').forEach(function(todo) {
      return todo.destroy(function(err) {
        if (err) {
          throw err;
        }
      });
    });
  };

  TodosController.prototype.toggleEditing = function(node, event, context) {
    var editing, input, todo, _ref;
    todo = context.get('todo');
    editing = todo.set('editing', !todo.get('editing'));
    if (editing) {
      input = document.getElementById("todo-input-" + (todo.get('id')));
      return input.focus();
    } else {
      if (((_ref = todo.get('title')) != null ? _ref.length : void 0) > 0) {
        return todo.save(function(err, todo) {
          if (err && !err instanceof Batman.ErrorsSet) {
            throw err;
          }
        });
      } else {
        return todo.destroy(function(err, todo) {
          if (err) {
            throw err;
          }
        });
      }
    }
  };

  TodosController.prototype.disableEditingUponSubmit = function(node, event, context) {
    if (Batman.DOM.events.isEnter(event)) {
      return this.toggleEditing(node, event, context);
    }
  };

  return TodosController;

})(Batman.Controller);

Alfred.Todo = (function(_super) {

  __extends(Todo, _super);

  function Todo() {
    return Todo.__super__.constructor.apply(this, arguments);
  }

  Todo.encode('title', 'completed');

  Todo.persist(Batman.LocalStorage);

  Todo.validate('title', {
    presence: true
  });

  Todo.storageKey = 'todos-batman';

  Todo.classAccessor('active', function() {
    return this.get('all').filter(function(todo) {
      return !todo.get('completed');
    });
  });

  Todo.classAccessor('completed', function() {
    return this.get('all').filter(function(todo) {
      return todo.get('completed');
    });
  });

  Todo.wrapAccessor('title', function(core) {
    return {
      set: function(key, value) {
        return core.set.call(this, key, value != null ? value.trim() : void 0);
      }
    };
  });

  return Todo;

})(Batman.Model);

window.Alfred = Alfred;

Alfred.run();
