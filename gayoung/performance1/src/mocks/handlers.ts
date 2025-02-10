import { http, HttpResponse } from 'msw'
import school from './data/school.json' 

export const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/school`, () => {
    return HttpResponse.json(school)
  }),
]