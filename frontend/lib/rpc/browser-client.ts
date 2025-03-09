'use client';

import type { ProductService } from "@/gen/proto/product/v1/product_pb";

// Create a vanilla JS object with methods that call the RPC endpoints
export const browserProductClient = {
    async getProduct(request: { id: string }) {
        const resp = await fetch("/api/proto.product.v1.ProductService/GetProduct", {
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
        const resp = await fetch("/api/proto.product.v1.ProductService/ListProducts", {
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