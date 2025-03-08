import { createConnectTransport } from "@connectrpc/connect-node";
import { createClient } from "@connectrpc/connect";
import { ProductService } from "@/gen/proto/product/v1/product_pb";

const transport = createConnectTransport({
    baseUrl: process.env.RPC_SERVER_URL || "http://localhost:8080",
    httpVersion: "1.1"
})

export const productClient = createClient(ProductService, transport);