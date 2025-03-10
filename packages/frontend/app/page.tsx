import Link from "next/link";
import styles from "./page.module.css";
import { productClient } from "@/lib/rpc/client";

// Use server component to directly fetch data from backend
export default async function Home() {
  // Server-side data fetching with Connect RPC
  const response = await productClient.listProducts({
    pageSize: 10,
  });

  const products = response.products;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>製品一覧</h1>
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className={styles.price}>¥{product.price.toLocaleString()}</p>
              <Link
                href={`/product/${product.id}`}
                className={styles.viewButton}
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
