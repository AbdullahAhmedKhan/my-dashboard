"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsRight, Pencil, Plus } from "lucide-react"
import Image from "next/image"
import Necklace02 from '../../assets/images/products/Necklace02.webp'
import Necklace05 from '../../assets/images/products/Necklace05.webp'
import Necklace09 from '../../assets/images/products/Necklace09.webp'
import Necklace11 from '../../assets/images/products/Necklace11.webp'
import Rings04 from '../../assets/images/products/Rings04.webp'
import Rings05 from '../../assets/images/products/Rings05.webp'
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import React, { useState } from 'react';

// Product data array
const products = [
  {
    id: 1,
    image: Necklace02,
    name: "Celestial Love Chain",
    sku: "SKU-Necklaces-029",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 420.00,
    sellPrice: 550.00,
    stock: 43,
    variants: 3,
    stockStatus: "High",
    progressValue: 86,
    progressColor: "bg-emerald-400",
    inStock: true
  },
  {
    id: 2,
    image: Necklace05,
    name: "Alphabet Chic Pendant",
    sku: "SKU-Necklaces-030",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 13,
    variants: 6,
    stockStatus: "High",
    progressValue: 26,
    progressColor: "bg-rose-400",
    inStock: true
  },
  {
    id: 3,
    image: Necklace09,
    name: "Celestial Love Chain",
    sku: "SKU-Necklaces-029",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 420.00,
    sellPrice: 550.00,
    stock: 43,
    variants: 3,
    stockStatus: "High",
    progressValue: 86,
    progressColor: "bg-emerald-400",
    inStock: true
  },
  {
    id: 4,
    image: Necklace11,
    name: "Alphabet Chic Pendant",
    sku: "SKU-Necklaces-030",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 13,
    variants: 6,
    stockStatus: "High",
    progressValue: 26,
    progressColor: "bg-rose-400",
    inStock: true
  },
  {
    id: 5,
    image: Rings04,
    name: "Dainty Moonlight Ring",
    sku: "SKU-Rings-030",
    tags: ["Rings", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 13,
    variants: 6,
    stockStatus: "High",
    progressValue: 26,
    progressColor: "bg-rose-400",
    inStock: true
  },
  {
    id: 6,
    image: Rings05,
    name: "Whimsical Paw Delight",
    sku: "SKU-Rings-029",
    tags: ["Rings", "beauty", "woman"],
    buyPrice: 420.00,
    sellPrice: 550.00,
    stock: 43,
    variants: 3,
    stockStatus: "High",
    progressValue: 86,
    progressColor: "bg-emerald-400",
    inStock: true
  },
  {
    id: 7,
    image: Necklace05,
    name: "Alphabet Chic Pendant",
    sku: "SKU-Necklaces-030",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 0,
    variants: 0,
    stockStatus: "Out of Stock",
    progressValue: 0,
    progressColor: "bg-rose-400",
    inStock: false
  },
  {
    id: 8,
    image: Necklace02,
    name: "Celestial Love Chain",
    sku: "SKU-Necklaces-029",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 420.00,
    sellPrice: 550.00,
    stock: 43,
    variants: 3,
    stockStatus: "High",
    progressValue: 86,
    progressColor: "bg-emerald-400",
    inStock: true
  },
  {
    id: 9,
    image: Necklace05,
    name: "Alphabet Chic Pendant",
    sku: "SKU-Necklaces-030",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 13,
    variants: 6,
    stockStatus: "High",
    progressValue: 26,
    progressColor: "bg-rose-400",
    inStock: true
  },
  {
    id: 10,
    image: Necklace05,
    name: "Alphabet Chic Pendant",
    sku: "SKU-Necklaces-030",
    tags: ["necklaces", "beauty", "woman"],
    buyPrice: 600.00,
    sellPrice: 750.00,
    stock: 13,
    variants: 6,
    stockStatus: "High",
    progressValue: 26,
    progressColor: "bg-rose-400",
    inStock: true
  }
];

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  type Product = typeof products[number];
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
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
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center">
        <h2 className="my-3 text-2xl font-semibold">Products</h2>
        <Link href="/products/add-product">
          <Button><Plus className="mr-1" />Add New Product</Button>
        </Link>
      </div>
      <div>
        <Tabs defaultValue="active" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archive">Archive</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <div className="flex gap-3 items-center">
              <div className='flex justify-between items-center'>
                <input type='text' placeholder='Search here' className='border rounded-sm py-1 px-3 lg:min-w-[300px]' />
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                  <SelectItem value="Juwellery">Juwellery</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In-Active">In-Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="archive">No archive data found.</TabsContent>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 my-5">
        {products.map((product) => (
          <Card key={product.id} className={`shadow-none py-3 ${!product.inStock ? 'bg-accent' : ''}`}>
            <CardHeader className="px-3">
              <CardTitle className="flex items-start gap-2">
                <Image src={product.image} alt="product" width={50} className="rounded-md object-cover border" />
                <div className="flex flex-col gap-1">
                  <p>{product.name}</p>
                  <span className="text-xs text-muted-foreground">{product.sku}</span>
                </div>
              </CardTitle>
              <CardAction>
                <div className="flex items-center justify-center p-2 border rounded-md">
                  <Pencil size={16} />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent className="px-3">
              <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                {product.tags.map((tag, index) => (
                  <span key={index} className="border rounded-full px-2">{tag}</span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <p className="text-muted-foreground">Buy</p>
                  <p className="text-base font-semibold">${product.buyPrice.toFixed(2)}</p>
                </div>
                <div>
                  <div className="flex flex-col">
                    <p className="text-muted-foreground">Sell</p>
                    <p className="text-base font-semibold">${product.sellPrice.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center gap-5 px-3">
              <div className="flex flex-col gap-2 w-full">
                {product.inStock ? (
                  <>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <p>{product.stock} Stock - {product.stockStatus}</p>
                      <p>Variants ({product.variants})</p>
                    </div>
                    <Progress value={product.progressValue} fill={product.progressColor} />
                  </>
                ) : (
                  <span className="bg-gray-50 dark:bg-gray-900 shadow-sm text-rose-700 dark:text-rose-400 rounded-full px-2 py-1 text-sm w-24">Out of Stock</span>
                )}
              </div>
              <div 
                className="p-2 rounded-md border cursor-pointer"
                onClick={() => handleOpenDetails(product)}
              >
                <ChevronsRight size={14} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="p-5 w-[600px] sm:w-[700px] lg:w-[900px] max-w-[90vw]">
          <SheetHeader>
            <SheetTitle>{selectedProduct?.name}</SheetTitle>
          </SheetHeader>
          {selectedProduct && (
            <div className="py-4">
              <div className="flex justify-center mb-4">
                <Image 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  width={200} 
                  height={200} 
                  className="rounded-md object-cover border" 
                />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">SKU</p>
                  <p className="font-medium">{selectedProduct.sku}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tags</p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.tags.map((tag, index) => (
                      <span key={index} className="border rounded-full px-3 py-1 text-sm">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Buy Price</p>
                    <p className="font-medium">${selectedProduct.buyPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sell Price</p>
                    <p className="font-medium">${selectedProduct.sellPrice.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Stock</p>
                  {selectedProduct.inStock ? (
                    <div>
                      <p className="font-medium">{selectedProduct.stock} - {selectedProduct.stockStatus}</p>
                      <Progress value={selectedProduct.progressValue} fill={selectedProduct.progressColor} className="mt-2" />
                    </div>
                  ) : (
                    <span className="bg-gray-50 dark:bg-gray-900 shadow-sm text-rose-700 dark:text-rose-400 rounded-full px-3 py-1 text-sm">Out of Stock</span>
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Variants</p>
                  <p className="font-medium">{selectedProduct.variants}</p>
                </div>
              </div>
            </div>
          )}
          <SheetClose asChild>
            <Button variant="outline" className="mt-4">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default page