import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 25 }, //ramp up
    { duration: '1m', target: 50 }, // stable
    { duration: '20s', target: 20 }, // ramp-down to 0 users
  ],
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
  const pages = [
    '/home',
    '/documentation',
    '/contact-us',
    '/translation-output',
    '/login',
  ]
  // http.get('http://localhost:8910/home')
  for (const page of pages) {
    const res = http.get('https://cs-490-project-spring24.vercel.app' + page)
    // check for 200 status and if requests come in within 200ms
    check(res, {
      'status is 200': (r) => r.status === 200,
      'duration was <=200ms': (r) => r.timings.duration <= 200,
    })
    sleep(1)
  }
}
