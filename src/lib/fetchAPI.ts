async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  upload = false,
): Promise<T> {
  const url = `${endpoint}`

  const headers = new Headers(options.headers || {})
  if (upload) {
  } else {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    if (error.message) {
      // 404 等
      return Promise.reject(error.message || '认证请求失败')
    }
    const message = error?.errors?.map((e: Error) => e.message).join(', ')
    if (message) {
      // 约束未通过
      return Promise.reject(message || '认证请求失败')
    }

    console.error('认证请求失败：', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      options: options,
      error: error,
    })

    return Promise.reject('认证请求失败：未知错误')
  }

  return response.json()
}

export const fetchAPIBuild = (baseURL: string, upload = false) => {
  return <T>(endpoint: string, options: RequestInit = {}) => {
    return fetchAPI<T>(`${baseURL}${endpoint}`, options, upload)
  }
}
