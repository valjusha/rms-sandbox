import axios from "axios";

const TASK_API_URL = window.location.protocol + '//' + window.location.hostname + ':9001'

const taskAxiosInstance = axios.create({
  baseURL: TASK_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Origin': TASK_API_URL,
  }
})

const TASK_ENDPOINT = '/api/v1/tasks'
// const STAFF_ENDPOINT = '/api/v1/staff'

export async function getAllTasks() {
  return await taskAxiosInstance.get(TASK_ENDPOINT)
}

// export async function assignTask(id, shiftId, forceSkip = []) {
//   return await taskAxiosInstance.patch(`${TASK_ENDPOINT}/${id}/shift`, {
//     shiftId: shiftId,
//     forceSkip
//   })
// }
//
// export async function moveTask(id, dateOffset, forceSkip = []) {
//   return await taskAxiosInstance.patch(`${TASK_ENDPOINT}/${id}/move`, {
//     dateOffset,
//     forceSkip
//   })
// }
//
// export async function getPreparationTime(shiftId, taskId) {
//   return await taskAxiosInstance.get(`${STAFF_ENDPOINT}/${shiftId}/preparationTime`, {
//     params: {
//       taskId
//     }
//   })
// }
