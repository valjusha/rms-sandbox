const SOCKET_URL = window.location.protocol + '//' + window.location.hostname + ':9005/ws'

/**
 * Получение информации о задаче, сразу после создания
 */
function subscribeToTaskCreation(id: string) {
  return `/topic/task/${id}`;
}

/**
 * Получение информации о задаче, сразу после созданияы
 */
const SUBSCRIBE_TO_ALL_CREATED_TASK = '/topic/task'

const SUBSCRIBE_TO_SHIFT_EVENTS = '/topic/shift.events'

const SUBSCRIBE_TO_EMPLOYEE = '/topic/employee'

const SUBSCRIBE_TO_TASK_EVENTS = '/topic/task.events'

export {
  SOCKET_URL,
  subscribeToTaskCreation,
  SUBSCRIBE_TO_ALL_CREATED_TASK,
  SUBSCRIBE_TO_SHIFT_EVENTS,
  SUBSCRIBE_TO_EMPLOYEE,
  SUBSCRIBE_TO_TASK_EVENTS
};

