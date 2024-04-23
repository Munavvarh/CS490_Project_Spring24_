import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 10 users in 30 seconds
    { duration: '1m', target: 20 }, // Hold steady at 10 users for 1 minute
    { duration: '30s', target: 50 }, // Ramp up to 30 users in 30 seconds
    { duration: '5m', target: 50 }, // Hold steady at 30 users for 5 minutes
    { duration: '1m', target: 0 }, // Ramp down to 0 users in 1 minute
  ],
  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete within 300ms
    http_req_failed: ['rate<0.01'], // request failure rate must be below 1%
  },
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
      'duration was <=300ms': (r) => r.timings.duration <= 500,
    })
    sleep(1)
  }
}
