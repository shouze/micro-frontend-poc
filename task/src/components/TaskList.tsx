import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Task } from "../types/Task";
import { Loader } from "./Loader";
import { MarkdownContent } from "./MarkdownContent";
import { useGetShadowRoot } from '../hooks/useShadowRoot';

interface TaskListProps {
  apiBaseUrl: string;
  onToggle: (taskId: number) => void;
  loadingDelay?: number;
}

export function TaskList({
  apiBaseUrl,
  onToggle,
  loadingDelay = 600,
}: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const listName = location.pathname.substring(1);

  const doc = useGetShadowRoot() ?? document;

  useEffect(() => {
    setIsLoading(true);
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/${listName}.json`);
        const data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, loadingDelay));
        setTasks(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [apiBaseUrl, listName, loadingDelay]);

  if (isLoading) {
    return <Loader />;
  }

  const toggleTask = (taskIndex: number) => {
    setTasks(
      tasks.map((task, index) =>
        index === taskIndex ? { ...task, done: !task.done } : task
      )
    );
    onToggle(taskIndex);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={index} className="task-item">
          <div className="task-header">
            <input
              type="checkbox"
              id={`task-${index}`}
              checked={task.done}
              onChange={() => toggleTask(index)}
              aria-label={`Marquer "${task.name}" comme ${task.done ? 'non terminé' : 'terminé'}`}
            />
            <label 
              htmlFor={`task-${index}`}
              className={`task-name ${task.done ? 'task-done' : ''}`}
            >
              {task.name}
            </label>
            {task.description && (
              <button
                className="task-details-toggle"
                onClick={() => {
                  const details = doc.getElementById(`details-${index}`);
                  details?.classList.toggle('open');
                }}
                aria-expanded="false"
                aria-controls={`details-${index}`}
              >
                <span className="sr-only">Voir les détails</span>
                <svg viewBox="0 0 20 20" width="16" height="16">
                  <path d="M5 6l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
          {task.description && (
            <div 
              id={`details-${index}`}
              className="task-description"
              role="region"
              aria-label="Détails de la tâche"
            >
              <MarkdownContent content={task.description} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
