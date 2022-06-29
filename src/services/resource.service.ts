import axios from "axios";

const RESOURCE_API_URL = window.location.protocol + '//' + window.location.hostname + ':9002'

const staffAxiosInstance = axios.create({
  baseURL: RESOURCE_API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Origin': RESOURCE_API_URL
  }
})

const SHIFTS_ENDPOINT = '/api/v1/shifts'
const EMPLOYEES_ENDPOINT = '/api/v1/employees'

export async function fetchShifts() {
  return await staffAxiosInstance.get(SHIFTS_ENDPOINT)
}

export async function fetchEmployees() {
  return await staffAxiosInstance.get(EMPLOYEES_ENDPOINT)
}

export async function fetchEmployeeById(id: string) {
  return await staffAxiosInstance.get(`${EMPLOYEES_ENDPOINT}/${id}`)
}
