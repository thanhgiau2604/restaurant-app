import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const BASIC_AUTH_USER = process.env.BASIC_AUTH_USERNAME ?? ''
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? ''

const unauthorizedResponse = () =>
  new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin"',
    },
  })

export function proxy(request: NextRequest) {
  if (!BASIC_AUTH_USER || !BASIC_AUTH_PASSWORD) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Basic ')) {
    return unauthorizedResponse()
  }

  const decoded = atob(authHeader.slice(6))
  const separatorIndex = decoded.indexOf(':')
  if (separatorIndex === -1) {
    return unauthorizedResponse()
  }

  const username = decoded.slice(0, separatorIndex)
  const password = decoded.slice(separatorIndex + 1)

  if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
    return unauthorizedResponse()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*'],
}
