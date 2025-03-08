import { unstable_noStore } from "next/cache";
// モックデータを使用して在庫情報を表示

interface StockStatusProps {
    id: string;
}

export default function StockStatus({ id }: StockStatusProps) {
    // 動的コンテンツであることを明示
    unstable_noStore();

    // 本来はAPIから取得するが、今回はモックデータを使用
    // 実際にはListProductsなどを使って取得するか、
    // プロトファイルに在庫取得用のAPIを追加する必要がある
    const stockStatus = {
        inStock: id === "product-1", // product-1のみ在庫あり
        quantity: 5
    };

    return (
        <div className="stock-status">
            <h2>在庫状況</h2>
            {stockStatus.inStock ? (
                <p className="in-stock">在庫あり ({stockStatus.quantity}個)</p>
            ) : (
                <p className="out-of-stock">在庫切れ</p>
            )}
        </div>
    );
}