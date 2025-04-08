import {NextResponse} from "next/server";
import {apiGet} from "@/app/lib/fetchUtils";

export async function middleware (request) {
    const {pathname} = request.nextUrl

    const loginUri = '/auth/login-register'

    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('XSRF-TOKEN')?.value

        if (!token) {
            return NextResponse.redirect(new URL(loginUri, request.url))
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
                method: 'get',
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(token),
                    'ACCEPT': 'application/json'
                },
                credentials: 'include',
            })

            const user = await response.json()

            if (user.user_type !== 1 || !user.mobile_verified_at) {
                // user login but is not admin
                return NextResponse.redirect(new URL('/', request.url))
            }

            if (!response.ok) {
                return NextResponse.redirect(new URL(loginUri, request.url))
            }

            return NextResponse.next()

        } catch (error) {
            return NextResponse.redirect(new URL(loginUri, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/admin'
    ]
}