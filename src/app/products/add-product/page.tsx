"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUp, Package, Plus, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

// Assuming these are from previous modules
type Category = { id: string; name: string; isActive: boolean };
type Subcategory = { id: string; name: string; isActive: boolean; categoryId: string };
type Tag = { id: string; name: string; isActive: boolean };
type Supplier = { id: string; name: string; phone: string; brand: string; address: string; isActive: boolean };
type VariantType = { id: string; name: string };
type Variant = { id: string; name: string; isActive: boolean; typeId: string; hexCode?: string };

const categories: Category[] = [
  { id: 'CAT001', name: 'Electronics', isActive: true },
  { id: 'CAT002', name: 'Clothing', isActive: true },
  { id: 'CAT003', name: 'Home & Kitchen', isActive: false },
];

const subcategories: Subcategory[] = [
  { id: 'SUB001', name: 'Smartphones', isActive: true, categoryId: 'CAT001' },
  { id: 'SUB002', name: 'Laptops', isActive: true, categoryId: 'CAT001' },
  { id: 'SUB003', name: 'Men’s Clothing', isActive: false, categoryId: 'CAT002' },
];

const tags: Tag[] = [
  { id: 'TAG001', name: 'New', isActive: true },
  { id: 'TAG002', name: 'Sale', isActive: true },
  { id: 'TAG003', name: 'Women', isActive: true },
  { id: 'TAG004', name: 'Beauty', isActive: true },
  { id: 'TAG005', name: 'Trending', isActive: false },
];

const suppliers: Supplier[] = [
  { id: 'SUP001', name: 'TechTrend Innovations', phone: '+1234567890', brand: 'TechTrend', address: '123 Tech St', isActive: true },
  { id: 'SUP002', name: 'Fashion Forward Ltd', phone: '+1987654321', brand: 'FashionF', address: '456 Style Ave', isActive: true },
];

const variantTypes: VariantType[] = [
  { id: 'color', name: 'Color' },
  { id: 'size', name: 'Size' },
  { id: 'weight', name: 'Weight' },
];

const initialVariants: Variant[] = [
  { id: 'VAR001', name: 'Red', isActive: true, typeId: 'color', hexCode: '#FF0000' },
  { id: 'VAR002', name: 'Blue', isActive: true, typeId: 'color', hexCode: '#0000FF' },
  { id: 'VAR003', name: 'Small', isActive: false, typeId: 'size' },
  { id: 'VAR004', name: 'Medium', isActive: true, typeId: 'size' },
  { id: 'VAR005', name: 'Large', isActive: true, typeId: 'size' },
  { id: 'VAR006', name: 'Black', isActive: false, typeId: 'color', hexCode: '#000000' },
  { id: 'VAR007', name: 'Purple', isActive: true, typeId: 'color', hexCode: '#9F2B68' },
  { id: 'VAR008', name: 'Extra Large', isActive: true, typeId: 'size' },
];

interface ProductVariant {
  type: string;
  value: string;
  price: string;
  stock: string;
  sku: string;
  imageUrl: string | null;
  colorCode?: string;
}

const Page = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [metaImage, setMetaImage] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isSupplierSheetOpen, setIsSupplierSheetOpen] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newSupplierPhone, setNewSupplierPhone] = useState('');
  const [newSupplierBrand, setNewSupplierBrand] = useState('');
  const [newSupplierAddress, setNewSupplierAddress] = useState('');
  const [newSupplierStatus, setNewSupplierStatus] = useState(true);

  const filteredSubcategories = subcategories.filter(sub => sub.categoryId === selectedCategory && sub.isActive);

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
    setVariants(prev => [...prev, { type: variantTypes[0]?.id || '', value: '', price: '', stock: '', sku: '', imageUrl: null, colorCode: '' }]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string) => {
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

  const handleAddSupplier = () => {
    if (newSupplierName && newSupplierPhone && newSupplierBrand && newSupplierAddress) {
      console.log('New Supplier:', { name: newSupplierName, phone: newSupplierPhone, brand: newSupplierBrand, address: newSupplierAddress, isActive: newSupplierStatus });
      setNewSupplierName('');
      setNewSupplierPhone('');
      setNewSupplierBrand('');
      setNewSupplierAddress('');
      setNewSupplierStatus(true);
      setIsSupplierSheetOpen(false);
    }
  };

  const handleSaveProduct = () => {
    console.log('Product Saved:', {
      productName, selectedCategory, selectedSubcategory, sku, description, price, cost, quantity, reorderLevel,
      availabilityStatus, selectedSupplier, selectedTags, isActive, selectedImages, variants
    });
  };

  const handleSaveMeta = () => {
    console.log('Meta Saved:', { metaTitle, metaKeywords, metaDescription, metaImage });
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
        <div className="card-header py-5 border-b bg-muted/5">
          <h2 className="px-5 text-xl font-semibold">Add New Product</h2>
        </div>
        <div className="card-body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
          <div>
            <fieldset className="border p-5 xl:p-8 rounded-2xl h-full">
              <legend className="text-xl">Product Description</legend>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>Product Name</Label>
                  <Input type="text" placeholder="Product Name" className="mt-2" value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <div className="grow">
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat.isActive).map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grow">
                    <Label>Subcategory</Label>
                    <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory} disabled={!selectedCategory}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredSubcategories.map(sub => (
                          <SelectItem key={sub.id} value={sub.id}>{sub.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="grow">
                    <Label>SKU</Label>
                    <Input type="text" placeholder="Stock Keeping Unit" className="mt-2" value={sku} onChange={(e) => setSku(e.target.value)} />
                  </div>
                  <div className="grow">
                    <Label>Tags</Label>
                    <Select value={undefined} onValueChange={(value) => setSelectedTags(prev => prev.includes(value) ? prev : [...prev, value])}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Tags" />
                      </SelectTrigger>
                      <SelectContent>
                        {tags.filter(tag => tag.isActive).map(tag => (
                          <SelectItem key={tag.id} value={tag.id}>{tag.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTags.map(tagId => {
                        const tag = tags.find(t => t.id === tagId);
                        return tag ? <span key={tagId} className="border rounded-full px-2 text-xs">{tag.name} <X className="inline h-3 w-3 cursor-pointer" onClick={() => setSelectedTags(prev => prev.filter(id => id !== tagId))} /></span> : null;
                      })}
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={5}
                    className="mt-2"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="mb-2">Status</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={isActive}
                      onCheckedChange={setIsActive}
                      className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
                    />
                    <span>{isActive ? 'Active' : 'Inactive'}</span>
                  </div>
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
                    <Input type="number" placeholder="Product Price" className="mt-2" value={price} onChange={(e) => setPrice(e.target.value)} />
                  </div>
                  <div className='grow'>
                    <Label>Cost</Label>
                    <Input type="number" placeholder="Product Cost" className="mt-2" value={cost} onChange={(e) => setCost(e.target.value)} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className='grow'>
                    <Label>Quantity</Label>
                    <Input type="number" placeholder="Available Quantity" className="mt-2" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </div>
                  <div className='grow'>
                    <Label>Reorder Level</Label>
                    <Input type="number" placeholder="Reorder Level" className="mt-2" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Availability Status</Label>
                  <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
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
                <div className='mt-3'>
                  <Label>Supplier</Label>
                  <div className='flex justify-between gap-3'>
                    <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                      <SelectTrigger className="w-full mt-2">
                        <SelectValue placeholder="Select Supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.filter(sup => sup.isActive).map(sup => (
                          <SelectItem key={sup.id} value={sup.id}>{sup.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <img src={src} className="max-h-40 object-contain" alt={`Product ${index + 1}`} />
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
                              onValueChange={(value) => {
                                updateVariant(index, 'type', value);
                                updateVariant(index, 'value', ''); // Reset value when type changes
                                updateVariant(index, 'colorCode', ''); // Reset colorCode when type changes
                              }}
                            >
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select Variant Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {variantTypes.map(type => (
                                  <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className='grow'>
                            <Label>Variant Value</Label>
                            <Select
                              value={variant.value}
                              onValueChange={(value) => {
                                updateVariant(index, 'value', value);
                                const selectedVariant = initialVariants.find(v => v.name === value && v.typeId === variant.type);
                                if (selectedVariant && selectedVariant.hexCode) {
                                  updateVariant(index, 'colorCode', selectedVariant.hexCode);
                                } else {
                                  updateVariant(index, 'colorCode', '');
                                }
                              }}
                              disabled={!variant.type}
                            >
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="Select Variant Value" />
                              </SelectTrigger>
                              <SelectContent>
                                {initialVariants
                                  .filter(v => v.typeId === variant.type && v.isActive)
                                  .map(v => (
                                    <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {/* {variant.type === 'color' && (
                          <div>
                            <Label>Color Code</Label>
                            <Input
                              type="text"
                              placeholder="e.g., #FF0000"
                              value={variant.colorCode || ''}
                              onChange={(e) => updateVariant(index, 'colorCode', e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        )} */}
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
                              <img src={variant.imageUrl} className="max-h-40 object-contain" alt={`Variant ${index + 1}`} />
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
        <div className="card-footer bg-muted/5 border-t p-5 flex justify-end">
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className='bg-indigo-500 dark:bg-indigo-300' onClick={handleSaveProduct}>Save Product</Button>
          </div>
        </div>
      </div>

      <div className="card border rounded-lg mt-5 overflow-hidden">
        <div className="card-header py-5 border-b bg-muted/5">
          <h2 className="px-5 text-xl font-semibold">Meta Information</h2>
        </div>
        <div className="card-body p-5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className='grow'>
                <Label>Meta Title</Label>
                <Input type="text" placeholder="Meta Title" className="mt-2" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
              </div>
              <div className='grow'>
                <Label>Meta Keywords</Label>
                <Input type="text" placeholder="Meta Keywords, comma separated" className="mt-2" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Meta Description</Label>
              <Textarea
                rows={4}
                className="mt-2"
                placeholder="Meta Description"
                value={metaDescription}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMetaDescription(e.target.value)}
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
                  <img src={metaImage} className="max-h-40 object-contain" alt="Meta" />
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
        <div className="card-footer bg-muted/5 border-t p-5 flex justify-end">
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className='bg-indigo-500 dark:bg-indigo-300' onClick={handleSaveMeta}>Save Meta Information</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;