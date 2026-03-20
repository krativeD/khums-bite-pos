import { useState } from 'react'

export default function KitchenDisplay() {
  const [orders, setOrders] = useState([
    { id: 'ORD001', items: [{name: 'Burger', qty: 2}, {name: 'Fries', qty: 1}], status: 'pending', time: '10:30' },
    { id: 'ORD002', items: [{name: 'Pizza', qty: 1}, {name: 'Coke', qty: 2}], status: 'preparing', time: '10:32' },
    { id: 'ORD003', items: [{name: 'Chicken Wings', qty: 3}], status: 'ready', time: '10:28' },
  ])

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? {...order, status: newStatus} : order
    ))
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-gray-700'
      case 'preparing': return 'bg-primary-gold text-black'
      case 'ready': return 'bg-green-600'
      default: return 'bg-gray-700'
    }
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary-gold mb-6">Kitchen Display</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div 
            key={order.id} 
            className={`${getStatusColor(order.status)} p-6 rounded-xl shadow-soft border border-gray-700 transition-all hover:scale-105`}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">#{order.id}</span>
              <span className="text-sm bg-black/30 px-3 py-1 rounded-full">{order.time}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-lg">
                  <span>{item.qty}x {item.name}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              {order.status === 'pending' && (
                <button 
                  onClick={() => updateStatus(order.id, 'preparing')}
                  className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
                >
                  Start Preparing
                </button>
              )}
              {order.status === 'preparing' && (
                <button 
                  onClick={() => updateStatus(order.id, 'ready')}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Mark Ready
                </button>
              )}
              {order.status === 'ready' && (
                <button 
                  onClick={() => updateStatus(order.id, 'completed')}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
