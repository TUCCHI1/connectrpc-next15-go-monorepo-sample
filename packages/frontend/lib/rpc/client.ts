import {
    GetProductRequest,
    ListProductsRequest
} from "@/gen/proto/product/v1/product_pb";

// Server-side client for use with server components
export const productClient = {
    async getProduct(request: { id: string }) {
        const baseUrl = process.env.RPC_SERVER_URL || "http://localhost:8080";

        const resp = await fetch(`${baseUrl}/proto.product.v1.ProductService/GetProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: request.id,
            }),
        });

        if (!resp.ok) {
            throw new Error(`Failed to fetch product: ${resp.status} ${resp.statusText}`);
        }

        return await resp.json();
    },

    async listProducts(request: { pageSize?: number, pageToken?: string }) {
        const baseUrl = process.env.RPC_SERVER_URL || "http://localhost:8080";

        const resp = await fetch(`${baseUrl}/proto.product.v1.ProductService/ListProducts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pageSize: request.pageSize || 10,
                pageToken: request.pageToken || "",
            }),
        });

        if (!resp.ok) {
            throw new Error(`Failed to list products: ${resp.status} ${resp.statusText}`);
        }

        return await resp.json();
    }
};