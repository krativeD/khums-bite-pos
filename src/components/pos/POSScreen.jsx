import { useState } from 'react'

export default function POSScreen() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Burgers')

  const categories = ['Burgers', 'Drinks', 'Combos', 'Sides']
  
  const menuItems = {
    Burgers: [
      { id: 1, name: 'Classic Burger', price: 65, image: '🍔' },
      { id: 2, name: 'Cheese Burger', price: 75, image: '🍔' },
      { id: 3, name: 'Chicken Burger', price: 70, image: '🍔' },
    ],
    Drinks: [
      { id: 4, name: 'Coke', price: 20, image: '🥤' },
      { id: 5, name: 'Fanta', price: 20, image: '🥤' },
      { id: 6, name: 'Water', price: 15, image: '💧' },
    ],
    Combos: [
      { id: 7, name: 'Burger Combo', price: 95, image: '🍱' },
      { id: 8, name: 'Chicken Combo', price: 105, image: '🍱' },
    ],
    Sides: [
      { id: 9, name: 'Fries', price: 35, image: '🍟' },
      { id: 10, name: 'Onion Rings', price: 40, image: '🧅' },
    ]
  }

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

  return (
    <div className="flex h-screen bg-background">
      {/* Categories Sidebar */}
      <div className="w-48 bg-card p-4 border-r border-gray-800">
        <h2 className="text-xl font-bold text-primary-gold mb-4">Categories</h2>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`w-full text-left p-3 rounded-xl mb-2 transition ${
              selectedCategory === cat 
                ? 'bg-primary-gold text-black font-semibold' 
                : 'hover:bg-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory}</h2>
        <div className="grid grid-cols-3 gap-4">
          {menuItems[selectedCategory]?.map(item => (
            <div 
              key={item.id} 
              className="bg-card p-4 rounded-xl border border-gray-800 hover:border-primary-gold transition cursor-pointer"
              onClick={() => addToCart(item)}
            >
              <div className="text-4xl mb-2">{item.image}</div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-primary-gold font-bold">R{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Panel */}
      <div className="w-80 bg-card p-4 border-l border-gray-800 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Current Order</h2>
        
        <div className="flex-1 overflow-y-auto">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-3 p-2 bg-black/50 rounded-lg">
              <div>
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2 mt-1">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600"
                  >-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600"
                  >+</button>
                </div>
              </div>
              <div className="text-right">
                <span className="text-primary-gold">R{item.price * item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="block text-red-500 text-sm mt-1"
                >Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-primary-gold">R{total}</span>
          </div>
          <button className="glow-button w-full">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
