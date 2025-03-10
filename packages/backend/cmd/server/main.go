package main

import (
	"log"
	"net/http"

	"github.com/TUCCHI1/connectrpc-next15-go-monorepo-sample/backend/gen/proto/product/v1/productv1connect"
	"github.com/TUCCHI1/connectrpc-next15-go-monorepo-sample/backend/internal/product"
	"github.com/rs/cors"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
    productService := &product.Service{}
    
    mux := http.NewServeMux()
    
    // プロダクトサービスハンドラーの登録
    mux.Handle(productv1connect.NewProductServiceHandler(productService))
    
    // CORS設定
    corsHandler := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
        AllowedMethods: []string{"GET", "POST", "OPTIONS"},
        AllowedHeaders: []string{"Content-Type", "Connect-Protocol-Version"},
    })
    
    log.Println("Starting server on :8080...")
    http.ListenAndServe(
        ":8080",
        h2c.NewHandler(corsHandler.Handler(mux), &http2.Server{}),
    )
}