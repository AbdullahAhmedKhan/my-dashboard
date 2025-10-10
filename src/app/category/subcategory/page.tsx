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

type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  isActive: boolean;
};

const initialSubcategories: Subcategory[] = [
  { id: 'SUB001', categoryId: 'CAT001', name: 'Smartphones', isActive: true },
  { id: 'SUB002', categoryId: 'CAT001', name: 'Laptops', isActive: true },
  { id: 'SUB003', categoryId: 'CAT002', name: 'Men’s Clothing', isActive: false },
  { id: 'SUB004', categoryId: 'CAT002', name: 'Women’s Clothing', isActive: true },
  { id: 'SUB005', categoryId: 'CAT002', name: 'Accessories', isActive: true },
  { id: 'SUB006', categoryId: 'CAT002', name: 'Footwear', isActive: false },
  { id: 'SUB007', categoryId: 'CAT003', name: 'Home Appliances', isActive: true },
  { id: 'SUB008', categoryId: 'CAT004', name: 'Books', isActive: true },
];

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState('');
  const [editSubcategoryCategoryId, setEditSubcategoryCategoryId] = useState('');
  const [editSubcategoryStatus, setEditSubcategoryStatus] = useState(true);

  useEffect(() => {
    setSubcategories(initialSubcategories);
    setFilteredSubcategories(initialSubcategories);
  }, []);

  useEffect(() => {
    let filtered = subcategories;
    if (searchTerm) {
      filtered = filtered.filter(subcategory =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(subcategory =>
        statusFilter === 'active' ? subcategory.isActive : !subcategory.isActive
      );
    }
    setFilteredSubcategories(filtered);
  }, [searchTerm, statusFilter, subcategories]);

  const openAddSheet = () => {
    setSelectedSubcategory(null);
    setEditSubcategoryName('');
    setEditSubcategoryCategoryId('');
    setEditSubcategoryStatus(true);
    setIsSheetOpen(true);
  };

  const openEditSheet = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setEditSubcategoryName(subcategory.name);
    setEditSubcategoryCategoryId(subcategory.categoryId);
    setEditSubcategoryStatus(subcategory.isActive);
    setIsSheetOpen(true);
  };

  const handleSaveSubcategory = () => {
    if (editSubcategoryName && editSubcategoryCategoryId) {
      if (selectedSubcategory) {
        // Edit existing
        const updatedSubcategories = subcategories.map(sub =>
          sub.id === selectedSubcategory.id
            ? { ...sub, name: editSubcategoryName, categoryId: editSubcategoryCategoryId, isActive: editSubcategoryStatus }
            : sub
        );
        setSubcategories(updatedSubcategories);
      } else {
        // Add new
        const newSubcategory: Subcategory = {
          id: `SUB${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          categoryId: editSubcategoryCategoryId,
          name: editSubcategoryName,
          isActive: editSubcategoryStatus,
        };
        setSubcategories([...subcategories, newSubcategory]);
      }
      setEditSubcategoryName('');
      setEditSubcategoryCategoryId('');
      setEditSubcategoryStatus(true);
      setIsSheetOpen(false);
      setSelectedSubcategory(null);
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
            <BreadcrumbPage>Subcategory</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-semibold">Manage Subcategory</h2>
        <Button onClick={openAddSheet}>
          <Plus className="mr-1" /> Add New Subcategory
        </Button>
      </div>
      <div className="mb-4 flex space-x-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by subcategory..."
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
              <TableHead>Category</TableHead>
              <TableHead>Subcategory Name</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell>{initialCategories.find(c => c.id === subcategory.categoryId)?.name || 'Unknown'}</TableCell>
                <TableCell>{subcategory.name}</TableCell>
                <TableCell>{subcategory.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(subcategory)}
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
            <SheetTitle>{selectedSubcategory ? 'Edit Subcategory' : 'Add New Subcategory'}</SheetTitle>
            <SheetDescription>
              {selectedSubcategory ? 'Update the subcategory name, category, and status' : 'Create a new subcategory'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Category</Label>
            <Select value={editSubcategoryCategoryId} onValueChange={setEditSubcategoryCategoryId}>
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {initialCategories.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className="mb-2">Subcategory Name</Label>
            <Input
              value={editSubcategoryName}
              onChange={(e) => setEditSubcategoryName(e.target.value)}
              placeholder="Enter subcategory name"
              className="mb-4"
            />
            <Label className="mb-2">Status</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={editSubcategoryStatus}
                onCheckedChange={setEditSubcategoryStatus}
                aria-label="Toggle subcategory status"
                className="data-[state=checked]:bg-indigo-400 data-[state=unchecked]:bg-gray-300"
              />
              <span>{editSubcategoryStatus ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <SheetFooter>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSubcategory}>Save Subcategory</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SubcategoryPage;