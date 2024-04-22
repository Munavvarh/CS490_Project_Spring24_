import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 10,
  iteration: 40,
}

export default function () {
  http.get('http://localhost:8910/home')
  sleep(1)
}
