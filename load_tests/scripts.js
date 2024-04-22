import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
  vus: 10,
  duration: '30s',
  ext: {
    loadimpact: {
      // Project: CS490 Project
      projectID: 3692932,
      // Test runs with the same name groups test runs together.
      name: 'Test BMT',
    },
  },
}

export default function () {
  http.get('https://test.k6.io')
  sleep(1)
}
