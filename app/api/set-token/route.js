export async function POST(request) {
    const {token} = await request.json()

    return new Response(
        JSON.stringify({
            message: 'Token is set',
        }),
        {
            status: 200,
            headers: {
                'Set-Cookie': `auth_token=${token}; HttpOnly; Path=/; SameSite=Lax`,
                'Content-Type': 'application/json',
            }
        }
    )
}