export class ServiceClientRouting {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)
    if (!response.ok) 
      throw new Error(`HTTP error: ${response.status}`)
    const body = await response.json()
    return body
  }
}

export const serviceClientRouting = new ServiceClientRouting("https://router.project-osrm.org")
