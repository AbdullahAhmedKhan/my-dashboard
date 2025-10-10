"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Search } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

type Category = {
  id: string;
  name: string;
  isActive: boolean;
};

const initialCategories: Category[] = [
  { id: 'CAT001', name: 'Electronics', isActive: true },
  { id: 'CAT002', name: 'Clothing', isActive: true },
  { id: 'CAT003', name: 'Home & Kitchen', isActive: false },
  { id: 'CAT004', name: 'Books', isActive: true },
  { id: 'CAT005', name: 'Sports & Outdoors', isActive: true },
  { id: 'CAT006', name: 'Beauty & Personal Care', isActive: false },
  { id: 'CAT007', name: 'Toys & Games', isActive: true },
  { id: 'CAT008', name: 'Automotive', isActive: true },
];

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryStatus, setEditCategoryStatus] = useState(true);

  useEffect(() => {
    setCategories(initialCategories);
    setFilteredCategories(initialCategories);
  }, []);

  useEffect(() => {
    let filtered = categories;
    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(category =>
        statusFilter === 'active' ? category.isActive : !category.isActive
      );
    }
    setFilteredCategories(filtered);
  }, [searchTerm, statusFilter, categories]);

  const openAddSheet = () => {
    setSelectedCategory(null);
    setEditCategoryName('');
    setEditCategoryStatus(true);
    setIsSheetOpen(true);
  };

  const openEditSheet = (category: Category) => {
    setSelectedCategory(category);
    setEditCategoryName(category.name);
    setEditCategoryStatus(category.isActive);
    setIsSheetOpen(true);
  };

  const handleSaveCategory = () => {
    if (editCategoryName) {
      if (selectedCategory) {
        // Edit existing
        const updatedCategories = categories.map(cat =>
          cat.id === selectedCategory.id 
            ? { ...cat, name: editCategoryName, isActive: editCategoryStatus } 
            : cat
        );
        setCategories(updatedCategories);
      } else {
        // Add new
        const newCategory: Category = {
          id: `CAT${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editCategoryName,
          isActive: editCategoryStatus,
        };
        setCategories([...categories, newCategory]);
      }
      setEditCategoryName('');
      setEditCategoryStatus(true);
      setIsSheetOpen(false);
      setSelectedCategory(null);
    }
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
      <div className="mb-4 flex space-x-4">
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
        <div>
          <Label htmlFor="status-filter">Status</Label>
          <Select onValueChange={(value) => setStatusFilter(value as 'all' | 'active' | 'inactive')} defaultValue="all">
            <SelectTrigger id="status-filter" className="w-[180px] mt-1">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Category Name</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(category)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
              {selectedCategory ? 'Update the category name and status' : 'Create a new category'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Category Name</Label>
            <Input
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="mb-4"
            />
            <Label className="mb-2">Status</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={editCategoryStatus}
                onCheckedChange={setEditCategoryStatus}
                aria-label="Toggle category status"
                className="data-[state=checked]:bg-teal-400 data-[state=unchecked]:bg-gray-300"
              />
              <span>{editCategoryStatus ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <SheetFooter>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCategory}>Save Category</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CategoryPage;