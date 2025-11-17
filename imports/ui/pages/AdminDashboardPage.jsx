import React from 'react'
import { Link, navigate } from '../Router'
import { Bell, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/card'
import { useTracker } from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor'
import StyledShopName from "../components/StyledShopName";

function AdminSidebar({ currentPage }) {
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  return (
    <aside className="w-[227px] bg-muted-foreground text-white flex-shrink-0">
      <nav className="flex flex-col h-screen">
        <Link 
          to="/admin/dashboard"
          className={`px-6 py-6 text-left font-bold text-xl ${currentPage === 'dashboard' ? 'bg-dark-blue' : 'hover:bg-blue'}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/admin/orders"
          className={`px-6 py-6 text-left font-bold text-xl ${currentPage === 'orders' ? 'bg-dark-blue' : 'hover:bg-blue'}`}
        >
          Orders
        </Link>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          Web Admin
        </button>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          Customers
        </button>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          Accounts
        </button>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          QuickBooks
        </button>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          Square POS
        </button>
        <button className="px-6 py-6 text-left font-bold text-xl hover:bg-blue">
          Settings
        </button>
        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="px-6 py-6 text-left font-bold text-xl hover:bg-blue w-full border-t border-blue"
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  )
}

function AdminHeader() {
  const user = useTracker(() => Meteor.user())
  const userName = user?.profile?.firstName || user?.username || 'Shancai'

  return (
    <header className="bg-muted px-8 py-4 flex items-center justify-between border-b border-muted-foreground/20">
      <div className="flex items-center gap-3">
        <div>
          <StyledShopName className="text-3xl"/>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="bg-background rounded-full p-3 border border-foreground">
          <Bell className="w-6 h-6 text-blue" />
        </div>
        <p className="text-xl text-foreground">
          Welcome, <span className="font-bold text-primary">{userName}</span>!
        </p>
        <div className="bg-background rounded-full p-2 border-2 border-foreground">
          <User className="w-8 h-8 text-foreground" />
        </div>
      </div>
    </header>
  )
}

export default function AdminDashboardPage() {
  // Check admin auth from session storage
  const isAdminAuth = sessionStorage.getItem('adminAuth') === 'true'
  
  if (!isAdminAuth) {
    navigate('/admin')
    return null
  }

  const inventoryItems = [
    { id: 1, name: 'Flower Number 1', used: 30, remaining: 70 },
    { id: 2, name: 'Flower Number 2', used: 30, remaining: 70 },
    { id: 3, name: 'Flower Number 3', used: 30, remaining: 70 },
    { id: 4, name: 'Flower Number 4', used: 30, remaining: 70 },
  ]

  const supplyItems = [
    { id: 1, name: 'Supply Number 1', used: 30, remaining: 70 },
    { id: 2, name: 'Supply Number 2', used: 30, remaining: 70 },
    { id: 3, name: 'Supply Number 3', used: 30, remaining: 70 },
    { id: 4, name: 'Supply Number 4', used: 30, remaining: 70 },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar currentPage="dashboard" />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-8 bg-background">
          <div className="grid grid-cols-2 gap-8">
            {/* Flower Inventory */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-primary">Flower Inventory</h2>
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-semibold">Sort By:</span>
                  <select className="border border-foreground px-4 py-2 rounded bg-background w-48">
                    <option>Lowest to Highest</option>
                    <option>Highest to Lowest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {inventoryItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="p-6 border-4 border-green rounded-lg bg-muted shadow-none"
                  >
                    <h3 className="text-center text-xl font-bold text-primary mb-4">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-center mb-4">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="red"
                          strokeWidth="20"
                          strokeDasharray={`${(item.used / 100) * 314} 314`}
                          strokeDashoffset="0"
                          transform="rotate(-90 60 60)"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="green"
                          strokeWidth="20"
                          strokeDasharray={`${(item.remaining / 100) * 314} 314`}
                          strokeDashoffset={`-${(item.used / 100) * 314}`}
                          transform="rotate(-90 60 60)"
                        />
                        <text
                          x="60"
                          y="60"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-2xl font-bold fill-blue"
                        >
                          {item.remaining}%
                        </text>
                      </svg>
                    </div>

                    <div className="flex justify-around text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div>
                          <div className="font-bold text-foreground">{item.used}</div>
                          <div className="text-muted-foreground">Used</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green" />
                        <div>
                          <div className="font-bold text-foreground">{item.remaining}</div>
                          <div className="text-muted-foreground">Remaining</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-semibold">Previous</span>
                </button>
                <button className="flex items-center gap-1 text-foreground font-semibold hover:text-blue">
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Supply Inventory */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-brown">Supply Inventory</h2>
                <div className="flex items-center gap-2">
                  <span className="text-foreground font-semibold">Sort By:</span>
                  <select className="border border-foreground px-4 py-2 rounded bg-background w-48">
                    <option>Lowest to Highest</option>
                    <option>Highest to Lowest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {supplyItems.map((item) => (
                  <Card 
                    key={item.id}
                    className="p-6 border-4 border-green rounded-lg bg-muted shadow-none"
                  >
                    <h3 className="text-center text-xl font-bold text-brown mb-4">
                      {item.name}
                    </h3>
                    
                    <div className="flex items-center justify-center mb-4">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="red"
                          strokeWidth="20"
                          strokeDasharray={`${(item.used / 100) * 314} 314`}
                          strokeDashoffset="0"
                          transform="rotate(-90 60 60)"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="green"
                          strokeWidth="20"
                          strokeDasharray={`${(item.remaining / 100) * 314} 314`}
                          strokeDashoffset={`-${(item.used / 100) * 314}`}
                          transform="rotate(-90 60 60)"
                        />
                        <text
                          x="60"
                          y="60"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-2xl font-bold fill-blue"
                        >
                          {item.remaining}%
                        </text>
                      </svg>
                    </div>

                    <div className="flex justify-around text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div>
                          <div className="font-bold text-foreground">{item.used}</div>
                          <div className="text-muted-foreground">Used</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green" />
                        <div>
                          <div className="font-bold text-foreground">{item.remaining}</div>
                          <div className="text-muted-foreground">Remaining</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-semibold">Previous</span>
                </button>
                <button className="flex items-center gap-1 text-foreground font-semibold hover:text-blue">
                  <span>Next</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export { AdminSidebar, AdminHeader }
