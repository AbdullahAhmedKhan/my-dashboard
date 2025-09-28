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

<Card className="mt-5 p-6 rounded-lg">
    <CardHeader className="p-0 text-xl font-bold text-gray-800 border-b pb-4">Add New Product</CardHeader>
    <form className="grid gap-6 mt-6 md:grid-cols-3">
        {/* <!-- Product Description Section --> */}
        <Card className="p-4 shadow-sm border border-gray-200 rounded-lg">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-sm font-semibold text-gray-800">Product Description</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="product-name" className="text-sm font-medium text-gray-700">Product Name</Label>
                    <Input id="product-name" className="w-full" placeholder="Enter product name" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category</Label>
                    <Select>
                        <SelectTrigger id="category">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="clothing">Clothing</SelectItem>
                            <SelectItem value="books">Books</SelectItem>
                            <SelectItem value="home">Home</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="variant" className="text-sm font-medium text-gray-700">Variant</Label>
                    <div className="flex gap-2">
                        <Input id="variant" className="flex-1" placeholder="Enter variant (e.g., Size: M)" />
                        <Button type="button" variant="outline">Add Variant</Button>
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                    <textarea id="description" placeholder="Enter product description" rows={5} className="w-full border rounded-md p-2"/>
                </div>
            </CardContent>
        </Card>

        {/* <!-- Pricing and Availability Section --> */}
        <Card className="p-4 shadow-sm border border-gray-200 rounded-lg">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-sm font-semibold text-gray-800">Pricing and Availability</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="stock-quantity" className="text-sm font-medium text-gray-700">Stock Quantity</Label>
                    <Input type="number" id="stock-quantity" className="w-full" placeholder="Enter stock quantity" min="0" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="avg-quantity" className="text-sm font-medium text-gray-700">Avg Quantity</Label>
                    <Input type="number" id="avg-quantity" className="w-full" placeholder="Enter average quantity" min="0" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="buy-price" className="text-sm font-medium text-gray-700">Buy Price ($)</Label>
                    <Input type="number" id="buy-price" className="w-full" placeholder="Enter buy price" step="0.01" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="sale-price" className="text-sm font-medium text-gray-700">Sale Price ($)</Label>
                    <Input type="number" id="sale-price" className="w-full" placeholder="Enter sale price" step="0.01" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="stock-availability" className="text-sm font-medium text-gray-700">Stock Availability</Label>
                    <Select>
                        <SelectTrigger id="stock-availability">
                            <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="unavailable">Unavailable</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>

        {/* <!-- Product Images Section --> */}
        <Card className="p-4 shadow-sm border border-gray-200 rounded-lg">
            <CardHeader className="p-0 mb-4">
                <CardTitle className="text-sm font-semibold text-gray-800">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-500 transition-colors">
                    <Label htmlFor="product-images" className="cursor-pointer block">
                        <div className="text-sm font-medium text-gray-700">Drag images here or click to upload</div>
                        <Input type="file" id="product-images" className="hidden" accept="image/*" multiple />
                    </Label>
                    <div className="mt-2 text-xs text-gray-500">Supports JPEG, PNG. Upload multiple images.</div>
                </div>
                {/* Placeholder for preview - in real app, use state to show previews */}
                <div className="mt-4 space-y-2">
                    {/* Add JS to display uploaded file names or previews */}
                </div>
            </CardContent>
        </Card>
    </form>
    <div className="mt-6 flex justify-end">
        <Button type="submit" className="px-6 py-2">Add Product</Button>
    </div>
</Card>
        </div>
    )
}

export default page