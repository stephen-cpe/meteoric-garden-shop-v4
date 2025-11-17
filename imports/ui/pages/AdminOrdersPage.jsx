import React, { useState } from 'react'
import { Link, navigate } from '../Router'
import { Bell, User, ChevronLeft, ChevronRight, Plus, Search, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { AdminSidebar, AdminHeader } from './AdminDashboardPage'
import { useDemoOrderStore } from '../../store/demoOrderStore'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  
  // Connect to Demo Store
  const orders = useDemoOrderStore((state) => state.orders)
  const addOrder = useDemoOrderStore((state) => state.addOrder)
  const getRandomHandler = useDemoOrderStore((state) => state.getRandomHandler)
  const getRandomImage = useDemoOrderStore((state) => state.getRandomImage)

  const [newOrder, setNewOrder] = useState({
    customer: '',
    email: '',
    phone: '',
    recipient: '',
    deliveryDate: '',
    deliveryAddress: '',
    message: '',
    orderType: 'Online',
    priority: 'normal',
    paymentMethod: 'Credit Card',
    total: 0,
  })

  // Check admin auth
  const isAdminAuth = sessionStorage.getItem('adminAuth') === 'true'
  if (!isAdminAuth) {
    navigate('/admin')
    return null
  }

  // Filter Logic (Applied to local state)
  const filteredOrders = orders.filter(order => 
    order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.recipientEmail && order.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.recipientName && order.recipientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.priority && order.priority.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.status && order.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (order.handler && order.handler.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleCreateOrder = () => {
    // Generate a dummy ID similar to sample
    const randomId = Math.floor(1000000 + Math.random() * 9000000).toString();
    
    // Create dummy item with random image for detail view
    const dummyItem = {
        name: 'Custom Arrangement',
        price: newOrder.total,
        quantity: 1,
        image: getRandomImage()
    };

    const orderData = {
      _id: randomId,
      customerName: newOrder.customer,
      recipientEmail: newOrder.email,
      recipientPhone: newOrder.phone,
      recipientName: newOrder.recipient,
      deliveryType: newOrder.orderType,
      createdAt: new Date(),
      priority: newOrder.priority,
      status: 'pending', 
      handler: getRandomHandler(), // Assign random handler
      deliveryDate: new Date(newOrder.deliveryDate),
      addressLine1: newOrder.deliveryAddress,
      specialMessage: newOrder.message,
      paymentMethod: newOrder.paymentMethod,
      totalAmount: newOrder.total,
      items: [dummyItem] // Add dummy item
    }

    // Add to local store
    addOrder(orderData)
    setIsCreateDialogOpen(false)
    
    // Reset form
    setNewOrder({
      customer: '',
      email: '',
      phone: '',
      recipient: '',
      deliveryDate: '',
      deliveryAddress: '',
      message: '',
      orderType: 'Online',
      priority: 'normal',
      paymentMethod: 'Credit Card',
      total: 0,
    })
  }

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

  const formatPriority = (priority) => {
    if (!priority) return 'Normal'
    if (priority === 'rush') return 'Rush Order'
    if (priority === 'same-day') return 'Same Day'
    return priority
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar currentPage="orders" />

      <div className="flex-1 flex flex-col">
        <AdminHeader />

        <main className="flex-1 p-8 bg-background">
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-light-steel-blue hover:bg-muted-foreground/20 text-blue font-semibold px-6 py-3 rounded-md flex items-center gap-2"
            >
              <span>Create New Order</span>
              <Plus className="w-5 h-5" />
            </Button>

            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue" />
              <Input 
                type="text" 
                placeholder="Search order" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 border-2 border-blue bg-light-steel-blue placeholder:text-blue text-blue rounded-md focus-visible:ring-blue"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue hover:text-dark-blue"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-muted border-b border-border">
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Order # <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Customer <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Order Type <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Date Received <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Priority <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Status <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Handled By <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      Total <span className="text-slate-gray">↓</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 text-center text-slate-gray">
                      {searchQuery ? 'No orders found matching your search' : 'No orders found'}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, index) => (
                    <tr 
                      key={order._id} 
                      className={`border-b border-border ${index % 2 === 0 ? 'bg-background' : 'bg-accent'}`}
                    >
                      <td className="px-6 py-4">
                        <Link 
                          to={`/admin/orders/${order._id}`}
                          className="font-bold text-blue hover:text-dark-blue hover:underline"
                        >
                          {order._id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-slate-gray">
                        {order.customerName || order.recipientEmail || 'Guest'}
                      </td>
                      <td className="px-6 py-4 text-slate-gray">{order.deliveryType || 'Online'}</td>
                      <td className="px-6 py-4 text-slate-gray">
                        {new Date(order.createdAt).toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 font-bold ${getPriorityColor(order.priority)}`}>
                        {formatPriority(order.priority)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-green' : 'bg-muted-foreground'}`} />
                          <span className="text-slate-gray">
                            {order.status === 'pending' ? 'Active' : order.status}
                          </span>
                        </div>
                      </td>
                      {/* Added Handler Cell */}
                      <td className="px-6 py-4 text-slate-gray">
                        {order.handler || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 text-slate-gray">
                        ${Number.parseFloat(order.totalAmount || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Previous</span>
            </button>
            <button className="flex items-center gap-1 text-foreground font-semibold hover:text-blue">
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </main>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">Create New Order</DialogTitle>
            <DialogDescription>
              Fill in the order details below to create a new order.
              Note: A random handler and product image will be assigned for this demo.
            </DialogDescription>
          </DialogHeader>
          
          {/* ... Form fields remain the same ... */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer Name *</Label>
                <Input
                  id="customer"
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newOrder.email}
                  onChange={(e) => setNewOrder({...newOrder, email: e.target.value})}
                  placeholder="john.doe@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newOrder.phone}
                  onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                  placeholder="555-0123"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Name *</Label>
                <Input
                  id="recipient"
                  value={newOrder.recipient}
                  onChange={(e) => setNewOrder({...newOrder, recipient: e.target.value})}
                  placeholder="Jane Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type *</Label>
                <Select
                  value={newOrder.orderType}
                  onValueChange={(value) => setNewOrder({...newOrder, orderType: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Phone Call">Phone Call</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="In-Store">In-Store</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority *</Label>
                <Select
                  value={newOrder.priority}
                  onValueChange={(value) => setNewOrder({...newOrder, priority: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="rush">Rush Order</SelectItem>
                    <SelectItem value="same-day">Same Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDate">Delivery Date & Time *</Label>
                <Input
                  id="deliveryDate"
                  type="datetime-local"
                  value={newOrder.deliveryDate}
                  onChange={(e) => setNewOrder({...newOrder, deliveryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select
                  value={newOrder.paymentMethod}
                  onValueChange={(value) => setNewOrder({...newOrder, paymentMethod: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="PayPal">PayPal</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress">Delivery Address *</Label>
              <Input
                id="deliveryAddress"
                value={newOrder.deliveryAddress}
                onChange={(e) => setNewOrder({...newOrder, deliveryAddress: e.target.value})}
                placeholder="123 Main Street, City, State ZIP"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">Total Amount ($) *</Label>
              <Input
                id="total"
                type="number"
                step="0.01"
                value={newOrder.total}
                onChange={(e) => setNewOrder({...newOrder, total: parseFloat(e.target.value) || 0})}
                placeholder="100.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={newOrder.message}
                onChange={(e) => setNewOrder({...newOrder, message: e.target.value})}
                placeholder="Add a personal message..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrder}
              className="bg-blue hover:bg-dark-blue text-white"
              disabled={!newOrder.customer || !newOrder.total}
            >
              Create Order
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}