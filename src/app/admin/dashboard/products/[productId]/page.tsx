"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SizeStock {
  size: string;
  stock: number;
}

interface Product {
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  sizes: SizeStock[]; // Updated to include stock for each size
  price: number;
  discountedPrice?: number;
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    images: [],
    category: "",
    tags: [],
    sizes: [],
    price: 0,
    discountedPrice: 0,
  });
  const [newSize, setNewSize] = useState<string>("");
  const [newStock, setNewStock] = useState<number>(0);

  const categories = ["Saree", "Kurti", "Shirt", "Salwar", "Dupatta"];
  const tagOptions = ["New Arrival", "Best Seller", "Trending", "Discounted"];
  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "FREE-SIZE"];

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      };

      fetchProduct();
    }
  }, [productId]);

  const handleUpdateProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("Product updated successfully");
    } else {
      alert("Failed to update the product. Please try again.");
    }
  };


  const removeTag = (tag: string) => {
    setProduct((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const removeSize = (size: string) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.size !== size),
    }));
  };

  return (
    <div className="w-full">
      {product ? (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Edit Product</h1>
          <form onSubmit={handleUpdateProduct}>

            {/* Product Name */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={product.title}
                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Product Description */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Product Description</label>
              <input
                type="text"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Product Category */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Product Category</label>
              <select
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700">Tags</label>
              <select
                value=""
                onChange={(e) => {
                  const newTag = e.target.value;
                  if (newTag && !product.tags.includes(newTag)) {
                    setProduct((prev) => ({
                      ...prev,
                      tags: [...prev.tags, newTag],
                    }));
                  }
                }}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Tag</option>
                {tagOptions.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes and Stock */}
            <div className="mb-4">
            <label className="block font-medium text-gray-700">Sizes</label>
            <div className="flex gap-2">
              <select
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                className="w-1/2 p-2 border rounded-md"
              >
                <option value="">Select Size</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Stock"
                value={newStock}
                onChange={(e) => setNewStock(parseInt(e.target.value))}
                className="w-1/2 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSize && newStock > 0) {
                    setProduct((prev) => ({
                      ...prev,
                      sizes: [...prev.sizes, { size: newSize, stock: newStock }],
                    }));
                    setNewSize("");
                    setNewStock(0);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.sizes.map((s, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full flex items-center gap-2"
                >
                  {s.size} (Stock: {s.stock})
                  <button
                    type="button"
                    onClick={() => removeSize(s.size)}
                    className="text-red-500"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

  

          
        

          {/* Price */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/*Discounted Price */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Discount Price
            </label>
            <input
              type="number"
              value={product.discountedPrice}
              onChange={(e) =>
                setProduct({ ...product, discountedPrice: parseInt(e.target.value) })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Update Product
            </button>
          </form>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetailPage;
