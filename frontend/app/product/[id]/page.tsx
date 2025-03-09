import { productClient } from "@/lib/rpc/client";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import StockStatus from "./StockStatus";

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    try {
        // Server-side data fetching using Connect RPC
        const response = await productClient.getProduct({
            id: params.id,
        });

        const product = response.product;

        if (!product) {
            return notFound();
        }

        return (
            <div className={styles.container}>
                <div className={styles.productDetail}>
                    <h1>{product.name}</h1>
                    <p className={styles.description}>{product.description}</p>
                    <p className={styles.price}>¥{product.price.toLocaleString()}</p>

                    {/* Client component for dynamic UI */}
                    <StockStatus productId={product.id} />

                    <div className={styles.actions}>
                        <button className={styles.addToCartButton}>
                            カートに追加
                        </button>
                        <button className={styles.favoriteButton}>
                            お気に入り
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return notFound();
    }
}