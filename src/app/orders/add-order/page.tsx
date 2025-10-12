"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X, Package, BaggageClaim } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface OrderItem {
    product: string;
    variant: string;
    quantity: string;
    price: string;
}

const AddOrderPage = () => {
    const [orderItems, setOrderItems] = useState<OrderItem[]>([{ product: '', variant: '', quantity: '', price: '' }]);

    const addOrderItem = () => {
        setOrderItems(prev => [...prev, { product: '', variant: '', quantity: '', price: '' }]);
    };

    const updateOrderItem = (index: number, field: keyof OrderItem, value: string) => {
        setOrderItems(prev => prev.map((item, i) => i === index ? { ...item, [field]: value } : item));
    };

    const removeOrderItem = (index: number) => {
        setOrderItems(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/orders">Orders</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Order</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-start gap-5 mt-3">
                <div>
                    <h2 className="mb-1 text-2xl font-semibold">Add New Order</h2>
                    <p className="text-muted-foreground text-sm">Create a new customer order for processing.</p>
                </div>
                <Link href="/orders">
                    <Button variant="outline"><BaggageClaim className='mr-2' />View All Orders</Button>
                </Link>
            </div>

            <div className="card border rounded-lg mt-5 overflow-hidden">
                <div className="card-header py-5 border-b bg-muted-foreground/5">
                    <h2 className="px-5 text-xl font-semibold">New Order Details</h2>
                </div>
                <div className="card-body grid grid-cols-1 md:grid-cols-2 gap-5 p-3">
                    <div>
                        <fieldset className="border p-5 rounded-2xl h-full">
                            <legend className="text-xl">Customer Information</legend>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label>Customer Name</Label>
                                    <Input type="text" placeholder="Customer Name" className="mt-2" />
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <Input type="email" placeholder="Customer Email" className="mt-2" />
                                </div>
                                <div>
                                    <Label>Phone Number</Label>
                                    <Input type="tel" placeholder="Customer Phone" className="mt-2" />
                                </div>
                                <div>
                                    <Label>Shipping Address</Label>
                                    <textarea
                                        rows={4}
                                        className="w-full mt-2 p-2 border rounded-lg"
                                        placeholder="Shipping Address"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border p-5 rounded-2xl h-full">
                            <legend className="text-xl">Order Details</legend>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label>Order Status</Label>
                                    <Select>
                                        <SelectTrigger className="w-full mt-2">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="delivered">Delivered</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Order Notes</Label>
                                    <textarea
                                        rows={4}
                                        className="w-full mt-2 p-2 border rounded-lg"
                                        placeholder="Additional notes for the order"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="card-body p-3 border-t bg-muted-foreground/5">
                    <fieldset className="border p-5 rounded-2xl">
                        <legend className="text-xl">Order Items</legend>
                        <Button variant="outline" onClick={addOrderItem} className="mb-4">
                            <Plus className="h-4 w-4 mr-2" /> Add Item
                        </Button>
                        {orderItems.map((item, index) => (
                            <div key={index} className="border p-4 rounded-lg mt-4 relative">
                                <button
                                    onClick={() => removeOrderItem(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-3">
                                        <div className="grow">
                                            <Label>Product</Label>
                                            <Select
                                                value={item.product}
                                                onValueChange={(value) => updateOrderItem(index, 'product', value)}
                                            >
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder="Select Product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="product1">Product 1</SelectItem>
                                                    <SelectItem value="product2">Product 2</SelectItem>
                                                    <SelectItem value="product3">Product 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grow">
                                            <Label>Quantity</Label>
                                            <Input
                                                type="number"
                                                placeholder="Quantity"
                                                value={item.quantity}
                                                onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)}
                                                className="mt-2"
                                                min="1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="grow">
                                            <Label>Variant</Label>
                                            <Select
                                                value={item.variant}
                                                onValueChange={(value) => updateOrderItem(index, 'variant', value)}
                                            >
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder="Select Variant" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="variant1">Variant 1</SelectItem>
                                                    <SelectItem value="variant2">Variant 2</SelectItem>
                                                    <SelectItem value="variant3">Variant 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='grow'>
                                            <Label>Price</Label>
                                            <Input
                                                type="number"
                                                placeholder="Price per unit"
                                                value={item.price}
                                                onChange={(e) => updateOrderItem(index, 'price', e.target.value)}
                                                className="mt-2"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </fieldset>
                </div>
                <div className="card-footer bg-muted-foreground/5 border-t p-5 flex justify-end">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-indigo-500 dark:bg-indigo-300">Save Order</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddOrderPage