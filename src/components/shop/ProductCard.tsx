'use client'

import { useState } from 'react'
import Image from 'next/image'

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

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string) => void
  onViewDetails?: (productId: string) => void
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  if (product.comingSoon) {
    return (
      <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 opacity-75">
        <div className="aspect-square bg-sand rounded-lg mb-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-charcoal/10 flex items-center justify-center mx-auto mb-2">
              <svg className="w-6 h-6 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm text-charcoal/60">Coming Soon</p>
          </div>
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-charcoal/85 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="px-3 py-1 bg-sand text-charcoal text-xs font-medium rounded-full inline-block">
          Coming Soon
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-charcoal/10 hover:ring-clay/30 transition-all duration-200 group">
      <div className="aspect-square bg-sand rounded-lg mb-4 overflow-hidden">
        {!imageError ? (
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-charcoal/10 flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-charcoal/60">Image Coming Soon</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-1 bg-sand text-charcoal text-xs font-medium rounded-full">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Out of Stock
            </span>
          )}
        </div>
        <h3 className="font-heading text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-charcoal/85 text-sm mb-3 line-clamp-2">{product.description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-charcoal">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-charcoal/60 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails?.(product.id)}
            className="px-3 py-1 text-sm text-charcoal/80 hover:text-charcoal border border-charcoal/20 rounded-md hover:border-charcoal/40 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => onAddToCart?.(product.id)}
            disabled={!product.inStock}
            className="px-4 py-1 bg-clay text-charcoal text-sm font-semibold rounded-md hover:bg-clay/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
