'use client';

import { useState, useEffect } from 'react';
import styles from './StockStatus.module.css';
import { browserProductClient } from '@/lib/rpc/browser-client';

interface StockStatusProps {
    productId: string;
}

export default function StockStatus({ productId }: StockStatusProps) {
    const [isInStock, setIsInStock] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkStock = async () => {
            try {
                setIsLoading(true);

                // Real RPC call to the backend through the API route
                const response = await browserProductClient.getProduct({
                    id: productId,
                });

                // For demo purposes, determine stock based on product ID
                // In a real app, this would come from the product response
                const stockStatus = productId.endsWith('1') || productId.endsWith('3') || productId.endsWith('5');

                setIsInStock(stockStatus);
            } catch (error) {
                console.error('Failed to check stock status:', error);
                setIsInStock(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkStock();
    }, [productId]);

    if (isLoading) {
        return <div className={styles.loading}>在庫状況を確認中...</div>;
    }

    return (
        <div className={isInStock ? styles.inStock : styles.outOfStock}>
            {isInStock ? '在庫あり - すぐに発送できます' : '在庫切れ - 入荷をお待ちください'}
        </div>
    );
}