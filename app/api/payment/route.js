import {NextResponse} from "next/server";

export async function POST(request) {
    try {
        const {amount, description} = await request.json()

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payments/create`,
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                    description,
                }),
            }
        );

        const result = await response.json();

        return NextResponse.json(result);
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            message: e.message,
        }, {
            status: 500,
        })
    }
}