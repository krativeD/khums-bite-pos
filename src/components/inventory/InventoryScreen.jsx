import { useState } from 'react'

export default function InventoryScreen() {
  const [items, setItems] = useState([
    { id: 1, name: 'Chicken', quantity: 5, unit: 'kg', lowStock: 10, status: 'Low Stock' },
    { id: 2, name: 'Bread', quantity: 20, unit: 'loaves', lowStock: 5, status: 'OK' },
    { id: 3, name: 'Beef', quantity: 3, unit: 'kg', lowStock: 8, status: 'Low Stock' },
    { id: 4, name: 'Lettuce', quantity: 15, unit: 'heads', lowStock: 5, status: 'OK' },
    { id: 5, name: 'Cheese', quantity: 2, unit: 'kg', lowStock: 3, status: 'Low Stock' },
  ])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>Khum's Bite - Inventory Stock Take</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            h1 { color: #D4AF37; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f5f5f5; text-align: left; padding: 12px; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            .low-stock { color: red; font-weight: bold; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Khum's Bite - Inventory Stock Take</h1>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.unit}</td>
                  <td class="${item.status === 'Low Stock' ? 'low-stock' : ''}">${item.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p style="margin-top: 40px;">Total Items: ${items.length}</p>
          <p>Low Stock Items: ${items.filter(i => i.status === 'Low Stock').length}</p>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-gold">Inventory Management</h1>
        <button 
          onClick={handlePrint}
          className="bg-primary-gold text-black px-6 py-3 rounded-xl font-semibold hover:shadow-gold-glow transition flex items-center gap-2"
        >
          🖨️ Print Inventory List
        </button>
      </div>

      <div className="bg-card rounded-xl border border-primary-gold/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-black/50">
            <tr>
              <th className="p-4 text-left">Item Name</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Unit</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-gray-800 hover:bg-black/30">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{item.unit}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${item.status === 'OK' ? 'bg-green-600' : 'bg-red-600'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-primary-gold hover:underline">Update Stock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-primary-gold/30">
          <h3 className="text-gray-400">Total Items</h3>
          <p className="text-2xl font-bold">{items.length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-primary-gold/30">
          <h3 className="text-gray-400">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-500">{items.filter(i => i.status === 'Low Stock').length}</p>
        </div>
        <div className="bg-card p-4 rounded-xl border border-primary-gold/30">
          <h3 className="text-gray-400">Last Updated</h3>
          <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
