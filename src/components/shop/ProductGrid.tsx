'use client'

import { useState } from 'react'
import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  comingSoon?: boolean
  tags?: string[]
}

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (productId: string) => void
  onViewDetails?: (productId: string) => void
  loading?: boolean
}

export default function ProductGrid({ products, onAddToCart, onViewDetails, loading = false }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 animate-pulse">
            <div className="aspect-square bg-sand rounded-lg mb-4"></div>
            <div className="h-4 bg-sand rounded mb-2"></div>
            <div className="h-3 bg-sand rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-sand rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-clay text-charcoal'
                : 'bg-sand text-charcoal/80 hover:bg-clay/50'
            }`}
          >
            {category === 'all' ? 'All Products' : category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="font-heading text-lg font-semibold mb-2">No products found</h3>
          <p className="text-charcoal/80">Try selecting a different category or check back soon for new arrivals.</p>
        </div>
      )}
    </div>
  )
}
