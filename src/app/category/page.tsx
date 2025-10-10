// category-page.tsx
"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Edit, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import Link from 'next/link';

type Category = {
  id: string;
  name: string;
};

const initialCategories: Category[] = [
  { id: 'CAT001', name: 'Electronics' },
  { id: 'CAT002', name: 'Clothing' },
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    setCategories(initialCategories);
    setFilteredCategories(initialCategories);
  }, []);

  useEffect(() => {
    let filtered = categories;
    if (searchTerm) {
      filtered = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const openAddSheet = () => {
    setSelectedCategory(null);
    setEditCategoryName('');
    setIsSheetOpen(true);
  };

  const openEditSheet = (category: Category) => {
    setSelectedCategory(category);
    setEditCategoryName(category.name);
    setIsSheetOpen(true);
  };

  const handleSaveCategory = () => {
    if (editCategoryName) {
      if (selectedCategory) {
        // Edit existing
        const updatedCategories = categories.map(cat =>
          cat.id === selectedCategory.id ? { ...cat, name: editCategoryName } : cat
        );
        setCategories(updatedCategories);
      } else {
        // Add new
        const newCategory: Category = {
          id: `CAT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editCategoryName,
        };
        setCategories([...categories, newCategory]);
      }
      setEditCategoryName('');
      setIsSheetOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
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
            <BreadcrumbPage>Category</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-semibold">Manage Category</h2>
        <Button onClick={openAddSheet}>
          <Plus className="mr-1" /> Add New Category
        </Button>
      </div>
      <div className='mb-4 flex space-x-2'>
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 lg:min-w-lg"
            />
          </div>
        </div>
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {/* <Link href={`/subcategory/${category.id}`}> */}
                  <Link href="category/subcategory">
                    <Button variant="ghost" size="sm">
                      Manage Subcategories
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedCategory ? 'Edit Category' : 'Add New Category'}</SheetTitle>
            <SheetDescription>
              {selectedCategory ? 'Update the category name' : 'Create a new category'}
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Label>Category Name</Label>
            <Input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="mb-4"
            />
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>Save Category</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryPage;