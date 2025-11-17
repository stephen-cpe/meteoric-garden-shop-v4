import React from 'react'
import { Link, navigate } from '../Router'
import { Bell, User, ChevronDown } from 'lucide-react'
import { Button } from '../components/ui/button'
import { AdminSidebar, AdminHeader } from './AdminDashboardPage'
import { useDemoOrderStore } from '../../store/demoOrderStore'

// Helper function from AdminOrdersPage 
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Rush Order':
    case 'rush':
      return 'text-orange'
    case 'Same Day':
    case 'same-day':
      return 'text-red'
    default:
      return 'text-slate-gray'
  }
}

// Helper function from AdminOrdersPage 
const formatPriority = (priority) => {
  if (!priority) return 'Normal'
  if (priority === 'rush') return 'Rush Order'
  if (priority === 'same-day') return 'Same Day'
  return priority
}

export default function AdminOrderDetailPage() {
  const path = window.location.pathname
  const orderId = path.split('/').pop() 

  // Fetch from Store instead of DB
  const order = useDemoOrderStore((state) => 
    state.orders.find((o) => o._id === orderId)
  ) 
  const updateStatus = useDemoOrderStore((state) => state.updateStatus) 

  const isAdminAuth = sessionStorage.getItem('adminAuth') === 'true' 
  if (!isAdminAuth) {
    navigate('/admin')
    return null
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
            <p className="text-foreground text-lg mb-4">Order not found in active session.</p> 
            <Link to="/admin/orders" className="text-blue hover:underline">Back to Orders</Link> 
        </div>
      </div>
    )
  }

  const handleOrderComplete = () => {
    // Update local store
    updateStatus(orderId, 'completed') 
    alert(`Order #${orderId} has been completed`)
    navigate('/admin/orders')
  }

  const handleCancelOrder = () => {
    // Update local store
    updateStatus(orderId, 'cancelled') 
    alert(`Order #${orderId} has been cancelled`) 
    navigate('/admin/orders')
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar currentPage="orders" />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-8 bg-background">
           <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Customer Order #{orderId}</h1> 
            <p className="text-sm text-muted-foreground">via Website</p>
          </div>

          <div className="grid grid-cols-[1fr,auto] gap-8">
            {/* Left Column - Order Details */}
            <div>
               <h2 className="text-xl font-bold text-foreground mb-4">Order Details</h2> 
              
              <div className="space-y-3">
                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Customer Name: </span>
                  <span className="text-muted-foreground">{order.customerName || 'Guest'}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Email: </span>
                  <span className="text-muted-foreground">{order.recipientEmail || order.email || 'N/A'}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Contact #: </span>
                  <span className="text-muted-foreground">{order.recipientPhone || order.phone || 'N/A'}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Recipient Name: </span>
                  <span className="text-muted-foreground">{order.recipientFirstName && order.recipientLastName ?
 `${order.recipientFirstName} ${order.recipientLastName}` : order.recipientName || 'N/A'}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Delivery Date: </span>
                  <span className="text-muted-foreground">{order.deliveryDate ?
 new Date(order.deliveryDate).toLocaleString() : 'N/A'}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Request Type: </span>
                  <span className="text-muted-foreground">{order.deliveryType || 'Delivery'} - </span> 
 
                  <span className={`font-bold ${getPriorityColor(order.priority)}`}>{formatPriority(order.priority)}</span>
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Delivery Location: </span>
                  <span className="text-muted-foreground">
                     {order.addressLine1 || order.address || 'N/A'} 
                    {order.addressLine2 && `, ${order.addressLine2}`}
                    {order.city && `, ${order.city}`}
                    {order.state && `, ${order.state}`}
                    {order.zipCode && ` ${order.zipCode}`}
                   </span> 
                </div>

                {(order.message || order.specialMessage) && (
                  <div className="bg-muted p-6 rounded">
                    <div className="font-bold text-foreground mb-2">Message:</div>
                    <p className="text-muted-foreground">{order.specialMessage || order.message}</p> 
                  </div>
                )}

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Order Date: </span>
                   <span className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</span> 
                </div>

                <div className="bg-muted p-4 rounded">
                  <span className="font-bold text-foreground">Status: </span>
                  <span className="text-muted-foreground">{order.status}</span>
                 </div> 
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="font-bold text-foreground">Order Assigned To:</span>
                <div className="relative inline-flex items-center border-2 border-foreground rounded px-4 py-2 bg-background">
                  <span className="font-bold text-foreground mr-2">{order.handler || 'Unassigned'}</span>
                  <ChevronDown className="w-5 h-5 text-foreground" />
                </div>
              </div>

            </div>

            {/* Right Column - Products Ordered */}
            <div className="w-[400px]">
              <h2 className="text-2xl font-bold text-foreground mb-6">Products Ordered</h2> 
              
               <div className="space-y-4 mb-6"> 
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-muted p-4 rounded"> 
                      {item.image && (
                        <img 
                           src={item.image} 
                          alt={item.name} 
                          className="w-[120px] h-[120px] object-cover rounded" 
                         /> 
                      )}
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">Quantity: {item.quantity}</p> 
                        <p className="text-xl font-bold text-green">${Number.parseFloat(item.price).toFixed(2)}</p> 
                      </div>
                    </div>
                  ))
                 ) : (
                  <p className="text-muted-foreground">No items in this order</p> 
                )}
              </div>

              <div className="flex justify-between items-center mb-6 text-2xl">
                <span className="font-bold text-foreground">Total :</span>
                 <span className="font-bold text-green">${Number.parseFloat(order.totalAmount || 0).toFixed(2)}</span> 
              </div>

              <div className="mb-8">
                <span className="font-bold text-foreground">Payment Method : </span>
                <span className="font-bold text-dark-blue italic text-xl">{order.paymentMethod || 'Online'}</span> 
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleOrderComplete}
                  className="flex-1 bg-dark-green hover:bg-dark-green/20 text-white font-bold py-6 text-lg rounded-md"
                 > 
                  Order Complete
                </Button>
                <Button
                  onClick={handleCancelOrder}
                  className="flex-1 bg-orange hover:bg-orange/20 text-white font-bold py-6 text-lg rounded-md"
                 > 
                  Cancel Order
                </Button>
              </div>
            </div>
          </div>
        </main>
       </div> 
    </div>
  )
}