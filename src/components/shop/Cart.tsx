'use client'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartProps {
  items: CartItem[]
  isOpen: boolean
  onClose: () => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal/50 z-40" 
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-xl border-l border-charcoal/10 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-charcoal/10 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="px-6 py-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-charcoal/80">Add some products to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-sand rounded-lg">
                  <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center">
                    <span className="text-xs text-charcoal/60">Image</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-charcoal/80 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-2 p-1 text-charcoal/60 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-charcoal/10 p-6">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-clay text-charcoal font-semibold py-3 rounded-md hover:bg-clay/90 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
