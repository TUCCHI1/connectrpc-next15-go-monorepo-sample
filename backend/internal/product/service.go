package product

import (
	"context"

	productv1 "github.com/TUCCHI1/connectrpc-next15-go-monorepo-sample/backend/gen/proto/product/v1"
	"github.com/bufbuild/connect-go"
)

type Service struct{}

func (s *Service) GetProduct(
    ctx context.Context,
    req *connect.Request[productv1.GetProductRequest],
) (*connect.Response[productv1.GetProductResponse], error) {
    productID := req.Msg.Id
    
    product := &productv1.Product{
        Id:          productID,
        Name:        "スマートフォン",
        Description: "最新モデルのスマートフォン",
        Price:       79800,
    }
    
    response := &productv1.GetProductResponse{
        Product: product,
    }
    
    return connect.NewResponse(response), nil
}

func (s *Service) ListProducts(
    ctx context.Context,
    req *connect.Request[productv1.ListProductsRequest],
) (*connect.Response[productv1.ListProductsResponse], error) {
    // ページングパラメータ取得
    pageSize := int(req.Msg.PageSize)
    if pageSize <= 0 {
        pageSize = 10 // デフォルトページサイズ
    }
    
    // サンプル製品リスト作成
    products := []*productv1.Product{
        {
            Id:          "product-1",
            Name:        "スマートフォン",
            Description: "最新モデルのスマートフォン",
            Price:       79800,
        },
        {
            Id:          "product-2",
            Name:        "タブレット",
            Description: "高性能タブレット",
            Price:       59800,
        },
    }
    
    response := &productv1.ListProductsResponse{
        Products:      products,
        NextPageToken: "", // 簡略化のため空にしています
    }
    
    return connect.NewResponse(response), nil
}