import { productClient } from "@/lib/rpc/client";
import { Suspense } from "react";
import StockStatus from "./StockStatus";

interface PageParams {
    id: string;
}

export default async function ProductPage({ params }: { params: PageParams }) {
    const { id } = params;

    // RPC クライアントを使用して商品情報を取得
    const response = await productClient.getProduct({
        id: id
    });

    // product はレスポンスの中のフィールド
    const product = response.product;

    if (!product) {
        return <div>製品が見つかりません</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>

            {/* 動的コンテンツ (別コンポーネントで実装) */}
            <Suspense fallback={<p>在庫状況を確認中...</p>}>
                <StockStatus id={id} />
            </Suspense>
        </div>
    );
}