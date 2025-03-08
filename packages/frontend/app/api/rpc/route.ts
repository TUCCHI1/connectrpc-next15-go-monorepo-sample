import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { productClient } from "@/lib/rpc/client";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { service, method, data } = body;

        // サービスとメソッドに基づいて適切な RPC 呼び出しを行う
        if (service === "ProductService") {
            if (method === "GetProduct") {
                const result = await productClient.getProduct(data);
                return NextResponse.json(result);
            }

            if (method === "ListProducts") {
                const result = await productClient.listProducts(data);
                return NextResponse.json(result);
            }
        }

        return NextResponse.json({ error: "Invalid service or method" }, { status: 400 });
    } catch (error) {
        console.error("RPC API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}