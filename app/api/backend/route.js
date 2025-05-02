export async function GET(request) {
    const response = {
        data: {
            'backend_url': process.env.NEXT_PUBLIC_API_URL
        },
        meta: {
            status: 200,
            messages: []
        }
    };

    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        }
    });
}