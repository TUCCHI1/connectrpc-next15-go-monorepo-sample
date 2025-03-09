import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Proxy for Connect RPC requests from the browser to the Go backend server
export async function POST(request: NextRequest) {
    const contentType = request.headers.get("Content-Type") || "";
    const connectProtocol = request.headers.get("Connect-Protocol-Version");
    const url = new URL(request.url);
    const path = url.pathname.replace("/api", "");

    // Create the target URL by replacing the API path prefix with the backend URL
    const targetUrl = `${process.env.RPC_SERVER_URL || "http://localhost:8080"}${path}`;

    try {
        // Forward the request to the backend
        const response = await fetch(targetUrl, {
            method: "POST",
            headers: {
                "Content-Type": contentType,
                ...(connectProtocol && { "Connect-Protocol-Version": connectProtocol }),
            },
            body: await request.text(),
        });

        // Create a NextResponse with the same status and headers
        const responseData = await response.text();

        const headers = new Headers();
        response.headers.forEach((value, key) => {
            headers.set(key, value);
        });

        return new NextResponse(responseData, {
            status: response.status,
            headers,
        });
    } catch (error) {
        console.error("Error proxying request to backend:", error);
        return NextResponse.json(
            { error: "Failed to communicate with backend service" },
            { status: 500 }
        );
    }
}