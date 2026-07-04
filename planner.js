// planner.js — Academic Task Manager

var tasks = [];
var currentFilter = 'all';

function addTask() {
  var input = document.getElementById('task-input');
  var prioritySelect = document.getElementById('priority-select');
  var errMsg = document.getElementById('add-error');

  var text = input.value.trim();

  if (!text) {
    errMsg.style.display = 'block';
    return;
  }

  errMsg.style.display = 'none';

  var task = {
    id: Date.now(),
    text: text,
    priority: prioritySelect.value,
    completed: false
  };

  tasks.push(task);
  input.value = '';

  renderTasks();
}

// also allow pressing Enter to add
document.addEventListener('DOMContentLoaded', function() {
  var taskInput = document.getElementById('task-input');
  if (taskInput) {
    taskInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  }
});

function toggleComplete(id) {
  var task = tasks.find(function(t) { return t.id === id; });
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function(t) { return t.id !== id; });
  renderTasks();
}

function filterTasks(filter) {
  currentFilter = filter;

  // update button styles
  var btns = ['btn-all', 'btn-pending', 'btn-completed'];
  btns.forEach(function(btnId) {
    var btn = document.getElementById(btnId);
    if (btn) {
      btn.style.background = 'white';
      btn.style.color = 'var(--navy)';
    }
  });

  var active = document.getElementById('btn-' + filter);
  if (active) {
    active.style.background = 'var(--navy)';
    active.style.color = 'white';
  }

  renderTasks();
}

function renderTasks() {
  var list = document.getElementById('task-list');
  var emptyMsg = document.getElementById('empty-msg');

  if (!list) return;

  // filter tasks
  var visible = tasks.filter(function(t) {
    if (currentFilter === 'completed') return t.completed;
    if (currentFilter === 'pending') return !t.completed;
    return true;
  });

  // update stats
  var total = tasks.length;
  var done = tasks.filter(function(t) { return t.completed; }).length;
  var pending = total - done;

  document.getElementById('count-total').textContent = total;
  document.getElementById('count-done').textContent = done;
  document.getElementById('count-pending').textContent = pending;

  // clear list (keep empty msg)
  var items = list.querySelectorAll('.task-item');
  items.forEach(function(item) { item.remove(); });

  if (visible.length === 0) {
    emptyMsg.style.display = 'block';
    if (tasks.length > 0) {
      emptyMsg.textContent = 'No tasks match this filter.';
    } else {
      emptyMsg.textContent = 'No tasks yet — add one above to get started!';
    }
    return;
  }

  emptyMsg.style.display = 'none';

  visible.forEach(function(task) {
    var li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    var badgeClass = 'badge-' + task.priority;
    var badgeLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

    li.innerHTML =
      '<input type="checkbox" ' + (task.completed ? 'checked' : '') + ' onchange="toggleComplete(' + task.id + ')" />' +
      '<span class="task-text">' + escapeHtml(task.text) + '</span>' +
      '<span class="task-badge ' + badgeClass + '">' + badgeLabel + '</span>' +
      '<button class="task-delete" onclick="deleteTask(' + task.id + ')" title="Delete task">✕</button>';

    list.appendChild(li);
  });
}

// basic escape to prevent XSS
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Pre-load a couple of sample tasks so the page isn't empty
tasks = [
  { id: 1, text: 'Submit COS 106 Term Project', priority: 'high', completed: false },
  { id: 2, text: 'Read Chapter 4 of Web Technologies notes', priority: 'medium', completed: false },
  { id: 3, text: 'Watch JavaScript DOM tutorial', priority: 'low', completed: true }
];

document.addEventListener('DOMContentLoaded', function() {
  renderTasks();
});
