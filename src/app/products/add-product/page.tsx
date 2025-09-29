import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Package } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Add Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-start gap-5">
                <div>
                    <h2 className="mt-3 mb-1 text-2xl font-semibold">Add Product</h2>
                    <p className="text-muted-foreground text-sm">Build your inventory with new items.</p>
                </div>
                <Link href="/products">
                    <Button variant="outline"><Package className="mr-2" />See All Products</Button>
                </Link>
            </div>

            <div className="card border rounded-lg mt-5 overflow-hidden">
                <div className="card-header py-5 border-b bg-muted-foreground/5">
                    <h2 className="px-5 text-xl font-semibold">Add New Product</h2>
                </div>
                <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    <div>
                        <fieldset className="border p-5 xl:p-8 rounded-2xl h-full ">
                            <legend className="text-xl">Product Description</legend>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label>Product Name</Label>
                                    <Input type="text" placeholder="Product Name" className="mt-2" />
                                </div>
                                <div className="flex gap-3">
                                    <div className="grow">
                                        <Label>Category</Label>
                                        <div>
                                            <Select>
                                                <SelectTrigger className="w-full mt-2">
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="category1">Category 1</SelectItem>
                                                    <SelectItem value="category2">Category 2</SelectItem>
                                                    <SelectItem value="category3">Category 3</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grow">
                                        <Label>SKU</Label>
                                        <Input type="text" placeholder="Stock Keeping Unit" className="mt-2" />
                                    </div>
                                </div>
                                <div>
                                    <Label>Description</Label>
                                    <textarea
                                        rows={8}
                                        className="w-full mt-2 p-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border p-5 xl:p-8 rounded-2xl h-full">
                            <legend className="text-xl">Pricing & Inventory</legend>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <div className='grow'>
                                        <Label>Price</Label>
                                        <Input type="number" placeholder="Product Price" className="mt-2" />
                                    </div>
                                    <div className='grow'>
                                        <Label>Cost</Label>
                                        <Input type="number" placeholder="Product Cost" className="mt-2" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className='grow'>
                                        <Label>Quantity</Label>
                                        <Input type="number" placeholder="Available Quantity" className="mt-2" />
                                    </div>
                                    <div className='grow'>
                                        <Label>Reorder Level</Label>
                                        <Input type="number" placeholder="Reorder Level" className="mt-2" />
                                    </div>
                                </div>
                                <div>
                                    <Label>Availability Status</Label>
                                    <div>
                                        <Select>
                                            <SelectTrigger className="w-full mt-2">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="in_stock">In Stock</SelectItem>
                                                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                                                <SelectItem value="pre_order">Pre-order</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border p-5 xl:p-8 rounded-2xl h-full">
                            <legend className="text-xl">Supplier Information</legend>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label>Supplier Name</Label>
                                    <Input type="text" placeholder="Supplier Name" className="mt-2" />
                                </div>

                                <div>
                                    <Label>Supplier Phone</Label>
                                    <Input type="tel" placeholder="Supplier Phone" className="mt-2" />
                                </div>
                                <div>
                                    <Label>Supplier Company</Label>
                                    <Input type="text" placeholder="Supplier Company" className="mt-2" />
                                </div>
                                <div>
                                    <Label>Supplier Address</Label>
                                    <textarea
                                        rows={2}
                                        className="w-full mt-2 p-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default page