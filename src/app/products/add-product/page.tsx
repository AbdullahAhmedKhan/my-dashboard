"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ImageUp, Package, Plus, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface Variant {
    type: string;
    value: string;
    price: string;
    stock: string;
    sku: string;
    imageUrl: string | null;
}

const Page = () => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [metaImage, setMetaImage] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImages = files.map(file => URL.createObjectURL(file));
            setSelectedImages(prev => [...prev, ...newImages]);
            e.target.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index]);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const addVariant = () => {
        setVariants(prev => [...prev, { type: '', value: '', price: '', stock: '', sku: '', imageUrl: null }]);
    };

    const updateVariant = (index: number, field: keyof Variant, value: string) => {
        setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
    };

    const handleVariantImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newUrl = URL.createObjectURL(e.target.files[0]);
            setVariants(prev => {
                const oldUrl = prev[index].imageUrl;
                if (oldUrl) URL.revokeObjectURL(oldUrl);
                return prev.map((v, i) => i === index ? { ...v, imageUrl: newUrl } : v);
            });
            e.target.value = '';
        }
    };

    const removeVariant = (index: number) => {
        setVariants(prev => {
            const removed = prev[index];
            if (removed.imageUrl) URL.revokeObjectURL(removed.imageUrl);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleMetaImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newUrl = URL.createObjectURL(e.target.files[0]);
            if (metaImage) URL.revokeObjectURL(metaImage);
            setMetaImage(newUrl);
            e.target.value = '';
        }
    };

    const removeMetaImage = () => {
        if (metaImage) URL.revokeObjectURL(metaImage);
        setMetaImage(null);
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
                                <div className='mt-3'>
                                    <Label>Supplier</Label>
                                    <div className='flex justify-between gap-3'>
                                        <Select>
                                            <SelectTrigger className="w-full mt-2">
                                                <SelectValue placeholder="Select Supplier" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="supplier_1">Supplier 1</SelectItem>
                                                <SelectItem value="supplier_2">Supplier 2</SelectItem>
                                                <SelectItem value="supplier_3">Supplier 3</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Sheet>
                                            <SheetTrigger asChild><Button variant="outline" className="mt-2 p-0"><Plus className="mr-0" />Add New Supplier</Button></SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader>
                                                    <SheetTitle className='text-xl'>Add New Supplier</SheetTitle>
                                                    <SheetDescription>
                                                        <span>Please fill in the details for the new supplier.</span>
                                                    </SheetDescription>

                                                    <div className="flex flex-col gap-3 mt-8">
                                                        <div>
                                                            <Label>Supplier Name</Label>
                                                            <Input type="text" placeholder="Supplier Name" className="mt-2" />
                                                        </div>
                                                        <div>
                                                            <Label>Supplier Phone</Label>
                                                            <Input type="tel" placeholder="Supplier Phone" className="mt-2" />
                                                        </div>
                                                        <div>
                                                            <Label>Supplier Brand</Label>
                                                            <Input type="text" placeholder="Supplier Brand" className="mt-2" />
                                                        </div>
                                                        <div>
                                                            <Label>Supplier Address</Label>
                                                            <textarea
                                                                rows={2}
                                                                className="w-full mt-2 p-2 border rounded-lg"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5 flex justify-end gap-2">
                                                        <Button variant="outline">Cancel</Button>
                                                        <Button>Add Supplier</Button>
                                                    </div>
                                                </SheetHeader>
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset className="border p-5 xl:p-8 rounded-2xl h-full">
                            <legend className="text-xl">Product Image & Variant</legend>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <div className="w-full relative border-2 border-muted-accent border-dashed rounded-lg p-6" id="dropzone">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 z-50"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        <div className="text-center mx-auto flex flex-col items-center">
                                            <ImageUp className='h-8 w-8' />
                                            <h3 className="mt-2 text-sm font-medium ">
                                                <label className="relative cursor-pointer">
                                                    <span>Drag and drop</span>
                                                    <span className="text-indigo-600 dark:text-indigo-300"> or browse </span>
                                                    <span>to upload</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                            </h3>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                PNG, JPG, GIF up to 1MB (multiple files allowed)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {selectedImages.map((src, index) => (
                                        <div key={index} className="relative">
                                            <img src={src} className="max-h-40 object-contain" />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <Button variant="outline" onClick={addVariant} className=''>
                                        <Plus className="h-4 w-4" /> Add Variant
                                    </Button>
                                    {variants.map((variant, index) => (
                                        <fieldset key={index} className="border p-4 rounded-lg mt-4 relative">
                                            <legend className="text-lg font-semibold">Variant {index + 1}</legend>
                                            <button
                                                onClick={() => removeVariant(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <div className="flex flex-col gap-3">
                                                <div className="flex gap-3">
                                                    <div className='grow'>
                                                        <Label>Variant Type</Label>
                                                        <Select
                                                            value={variant.type}
                                                            onValueChange={(value) => updateVariant(index, 'type', value)}
                                                        >
                                                            <SelectTrigger className="w-full mt-2">
                                                                <SelectValue placeholder="Select Variant Type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="size">Size</SelectItem>
                                                                <SelectItem value="color">Color</SelectItem>
                                                                <SelectItem value="weight">Weight</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className='grow'>
                                                        <Label>Variant Value</Label>
                                                        <Input
                                                            type="text"
                                                            placeholder="e.g., Red"
                                                            value={variant.value}
                                                            onChange={(e) => updateVariant(index, 'value', e.target.value)}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-3">
                                                    <div className='grow'>
                                                        <Label>Price</Label>
                                                        <Input
                                                            type="number"
                                                            placeholder="Variant Price"
                                                            value={variant.price}
                                                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className='grow'>
                                                        <Label>Stock</Label>
                                                        <Input
                                                            type="number"
                                                            placeholder="Variant Stock"
                                                            value={variant.stock}
                                                            onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>SKU</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Variant SKU"
                                                        value={variant.sku}
                                                        onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Variant Image</Label>
                                                    <div className="w-full relative border-2 border-muted-accent border-dashed rounded-lg p-6 mt-2">
                                                        <input
                                                            type="file"
                                                            className="absolute inset-0 w-full h-full opacity-0 z-50"
                                                            onChange={(e) => handleVariantImageChange(index, e)}
                                                        />
                                                        <div className="text-center mx-auto flex flex-col items-center">
                                                            <ImageUp className='h-8 w-8' />
                                                            <h3 className="mt-2 text-sm font-medium ">
                                                                <label className="relative cursor-pointer">
                                                                    <span>Drag and drop</span>
                                                                    <span className="text-indigo-600 dark:text-indigo-300"> or browse </span>
                                                                    <span>to upload</span>
                                                                </label>
                                                            </h3>
                                                            <p className="mt-1 text-xs text-muted-foreground">
                                                                PNG, JPG, GIF up to 1MB
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {variant.imageUrl && (
                                                        <div className="mt-4 relative">
                                                            <img src={variant.imageUrl} className="max-h-40 object-contain" />
                                                            <button
                                                                onClick={() => {
                                                                    URL.revokeObjectURL(variant.imageUrl!);
                                                                    updateVariant(index, 'imageUrl', '');
                                                                }}
                                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </fieldset>
                                    ))}
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="card-footer bg-muted-foreground/5 border-t p-5 flex justify-end">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className='bg-indigo-500 dark:bg-indigo-300'>Save Product</Button>
                    </div>
                </div>
            </div>

            <div className="card border rounded-lg mt-5 overflow-hidden">
                <div className="card-header py-5 border-b bg-muted-foreground/5">
                    <h2 className="px-5 text-xl font-semibold">Meta Information</h2>
                </div>
                <div className="card-body p-5">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className='grow'>
                                <Label>Meta Title</Label>
                                <Input type="text" placeholder="Meta Title" className="mt-2" />
                            </div>
                            <div className='grow'>
                                <Label>Meta Keywords</Label>
                                <Input type="text" placeholder="Meta Keywords, comma separated" className="mt-2" />
                            </div>
                        </div>
                        <div>
                            <Label>Meta Description</Label>
                            <textarea
                                rows={4}
                                className="w-full mt-2 p-2 border rounded-lg"
                                placeholder="Meta Description"
                            />
                        </div>
                        <div>
                            <Label>Meta Image</Label>
                            <div className="w-full relative border-2 border-muted-accent border-dashed rounded-lg p-6 mt-2">
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 z-50"
                                    onChange={handleMetaImageChange}
                                />
                                <div className="text-center mx-auto flex flex-col items-center">
                                    <ImageUp className='h-8 w-8' />
                                    <h3 className="mt-2 text-sm font-medium ">
                                        <label className="relative cursor-pointer">
                                            <span>Drag and drop</span>
                                            <span className="text-indigo-600 dark:text-indigo-300"> or browse </span>
                                            <span>to upload</span>
                                        </label>
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        PNG, JPG, GIF up to 1MB
                                    </p>
                                </div>
                            </div>
                            {metaImage && (
                                <div className="mt-4 relative">
                                    <img src={metaImage} className="max-h-40 object-contain" />
                                    <button
                                        onClick={removeMetaImage}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-muted-foreground/5 border-t p-5 flex justify-end">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className='bg-indigo-500 dark:bg-indigo-300'>Save Meta Information</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page