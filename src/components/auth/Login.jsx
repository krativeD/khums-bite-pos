import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    // For now, just redirect to dashboard (we'll add real auth later)
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-2xl shadow-soft w-96 border border-primary-gold/30 animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-gold mb-2">🍔 Khum's Bite</h1>
          <p className="text-gray-400">Manager Login</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl bg-black border border-gray-700 text-white focus:border-primary-gold focus:ring-1 focus:ring-primary-gold outline-none transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl bg-black border border-gray-700 text-white focus:border-primary-gold focus:ring-1 focus:ring-primary-gold outline-none transition"
              required
            />
          </div>
          <button type="submit" className="glow-button w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
