const LOCAL_STORAGE_KEY = "tasks";

export function getTasks() {
  const tasks = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (tasks == null) return [];

  return JSON.parse(tasks);
}

export function addTask(task) {
  const tasks = getTasks();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify([...tasks, { id: crypto.randomUUID(), ...task }])
  );
}

export function removeTask(id) {
  const tasks = getTasks();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(tasks.filter((task) => task.id !== id))
  );
}

export function updateTask(id, taskFields) {
  const tasks = getTasks();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(
      tasks.map((task) => {
        if (task.id === id) return { ...task, ...taskFields };
        return task;
      })
    )
  );
}
