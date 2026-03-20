import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CustomerMenu() {
  const { tableId } = useParams()
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'Burgers', 'Drinks', 'Combos', 'Sides']
  
  const menuItems = [
    { id: 1, name: 'Classic Burger', price: 65, category: 'Burgers', image: '🍔', description: 'Beef patty with lettuce and tomato' },
    { id: 2, name: 'Cheese Burger', price: 75, category: 'Burgers', image: '🍔', description: 'Beef patty with cheese' },
    { id: 3, name: 'Chicken Burger', price: 70, category: 'Burgers', image: '🍔', description: 'Grilled chicken breast' },
    { id: 4, name: 'Coke', price: 20, category: 'Drinks', image: '🥤', description: 'Ice cold' },
    { id: 5, name: 'Fanta', price: 20, category: 'Drinks', image: '🥤', description: 'Orange flavor' },
    { id: 6, name: 'Water', price: 15, category: 'Drinks', image: '💧', description: 'Still water' },
    { id: 7, name: 'Burger Combo', price: 95, category: 'Combos', image: '🍱', description: 'Burger + Fries + Drink' },
    { id: 8, name: 'Chicken Combo', price: 105, category: 'Combos', image: '🍱', description: 'Chicken + Fries + Drink' },
    { id: 9, name: 'Fries', price: 35, category: 'Sides', image: '🍟', description: 'Crispy golden fries' },
    { id: 10, name: 'Onion Rings', price: 40, category: 'Sides', image: '🧅', description: 'Beer battered' },
  ]

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id)
    if (existing) {
      setCart(cart.map(i => 
        i.id === item.id ? {...i, quantity: i.quantity + 1} : i
      ))
    } else {
      setCart([...cart, {...item, quantity: 1}])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return newQty > 0 ? {...item, quantity: newQty} : null
      }
      return item
    }).filter(Boolean))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card p-6 border-b border-primary-gold/30">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-gold mb-2">🍔 Khum's Bite</h1>
          <p className="text-gray-400">Table {tableId}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-primary-gold text-black font-semibold' 
                  : 'bg-card hover:bg-gray-800'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-card p-4 rounded-xl border border-gray-800">
              <div className="text-4xl mb-2">{item.image}</div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-primary-gold font-bold text-lg">R{item.price}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-primary-gold text-black px-4 py-1 rounded-full text-sm font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <>
          <button
            onClick={() => setShowCart(!showCart)}
            className="fixed bottom-4 right-4 bg-primary-gold text-black p-4 rounded-full shadow-gold-glow"
          >
            🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </button>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="fixed inset-0 bg-black/50 flex justify-end">
              <div className="w-96 bg-card h-full p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Your Order</h2>
                  <button onClick={() => setShowCart(false)} className="text-2xl">✕</button>
                </div>

                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4 p-3 bg-black/30 rounded-lg">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-700"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-gray-700"
                        >+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-primary-gold">R{item.price * item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="block text-red-500 text-sm mt-2"
                      >Remove</button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total:</span>
                    <span className="text-primary-gold">R{total}</span>
                  </div>
                  <button className="glow-button w-full">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
