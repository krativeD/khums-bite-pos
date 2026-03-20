import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const [salesData] = useState([
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 4500 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 7000 },
    { name: 'Sun', sales: 5500 },
  ])

  const [recentOrders] = useState([
    { id: 'ORD001', items: 3, total: 250, status: 'completed' },
    { id: 'ORD002', items: 2, total: 180, status: 'preparing' },
    { id: 'ORD003', items: 4, total: 420, status: 'pending' },
  ])

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-gold">Dashboard</h1>
        <div className="flex gap-4">
          <button className="bg-primary-gold text-black px-4 py-2 rounded-xl">POS</button>
          <button className="bg-card text-white px-4 py-2 rounded-xl border border-primary-gold/30">Kitchen</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-xl border border-primary-gold/50 hover:shadow-gold-glow transition">
          <h3 className="text-gray-400 text-sm">Today's Sales</h3>
          <p className="text-3xl font-bold text-primary-gold">R 12,340</p>
          <span className="text-green-500 text-sm">+12% from yesterday</span>
        </div>
        <div className="bg-card p-6 rounded-xl border border-primary-gold/50 hover:shadow-gold-glow transition">
          <h3 className="text-gray-400 text-sm">Active Orders</h3>
          <p className="text-3xl font-bold text-primary-gold">24</p>
          <span className="text-yellow-500 text-sm">8 preparing, 16 pending</span>
        </div>
        <div className="bg-card p-6 rounded-xl border border-primary-gold/50 hover:shadow-gold-glow transition">
          <h3 className="text-gray-400 text-sm">Stock Alerts</h3>
          <p className="text-3xl font-bold text-red-500">3</p>
          <span className="text-gray-400 text-sm">Items low in stock</span>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-card p-6 rounded-xl border border-primary-gold/50 mb-8">
        <h2 className="text-xl font-bold mb-4">Weekly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#121212', border: '1px solid #D4AF37' }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="sales" fill="#D4AF37" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-card p-6 rounded-xl border border-primary-gold/50">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3 text-left">Order #</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-black/50 transition">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.items}</td>
                  <td className="p-3">R {order.total}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.status === 'completed' ? 'bg-green-600' : 
                        order.status === 'preparing' ? 'bg-primary-gold text-black' : 
                        'bg-gray-600'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
