// @generated by protoc-gen-connect-es v1.6.1 with parameter "target=ts"
// @generated from file packages/proto/product/v1/product.proto (package proto.product.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetProductRequest, GetProductResponse, ListProductsRequest, ListProductsResponse } from "./product_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * プロダクトサービス
 *
 * @generated from service proto.product.v1.ProductService
 */
export const ProductService = {
  typeName: "proto.product.v1.ProductService",
  methods: {
    /**
     * @generated from rpc proto.product.v1.ProductService.GetProduct
     */
    getProduct: {
      name: "GetProduct",
      I: GetProductRequest,
      O: GetProductResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc proto.product.v1.ProductService.ListProducts
     */
    listProducts: {
      name: "ListProducts",
      I: ListProductsRequest,
      O: ListProductsResponse,
      kind: MethodKind.Unary,
    },
  }
} as const;

