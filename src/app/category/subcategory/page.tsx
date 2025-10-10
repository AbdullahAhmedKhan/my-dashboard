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

type Subcategory = {
  id: string;
  name: string;
  isActive: boolean;
};

const initialSubcategories: Subcategory[] = [
  { id: 'SUB001', name: 'Smartphones', isActive: true },
  { id: 'SUB002', name: 'Laptops', isActive: true },
  { id: 'SUB003', name: 'Men’s Clothing', isActive: false },
  { id: 'SUB004', name: 'Women’s Clothing', isActive: true },
  { id: 'SUB005', name: 'Accessories', isActive: true },
  { id: 'SUB006', name: 'Footwear', isActive: false },
  { id: 'SUB007', name: 'Home Appliances', isActive: true },
  { id: 'SUB008', name: 'Books', isActive: true },
];

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [editSubcategoryName, setEditSubcategoryName] = useState('');

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
    setIsSheetOpen(true);
  };

  const openEditSheet = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setEditSubcategoryName(subcategory.name);
    setIsSheetOpen(true);
  };

  const handleSaveSubcategory = () => {
    if (editSubcategoryName) {
      if (selectedSubcategory) {
        // Edit existing
        const updatedSubcategories = subcategories.map(sub =>
          sub.id === selectedSubcategory.id ? { ...sub, name: editSubcategoryName } : sub
        );
        setSubcategories(updatedSubcategories);
      } else {
        // Add new
        const newSubcategory: Subcategory = {
          id: `SUB${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editSubcategoryName,
          isActive: true,
        };
        setSubcategories([...subcategories, newSubcategory]);
      }
      setEditSubcategoryName('');
      setIsSheetOpen(false);
      setSelectedSubcategory(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedSubcategories = subcategories.map(sub =>
      sub.id === id ? { ...sub, isActive: !sub.isActive } : sub
    );
    setSubcategories(updatedSubcategories);
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
              <TableHead>Subcategory Name</TableHead>
              <TableHead className='w-[120px]'>Status</TableHead>
              <TableHead className='w-[120px]'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell>{subcategory.name}</TableCell>
                <TableCell>
                  <Switch
                    checked={subcategory.isActive}
                    onCheckedChange={() => handleToggleStatus(subcategory.id)}
                    aria-label={`Toggle ${subcategory.name} status`}
                    className="data-[state=checked]:bg-indigo-400 data-[state=unchecked]:bg-gray-300"
                  />
                  <span className="ml-2">{subcategory.isActive ? 'Active' : 'Inactive'}</span>
                </TableCell>
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
              {selectedSubcategory ? 'Update the subcategory name' : 'Create a new subcategory'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Subcategory Name</Label>
            <Input
              value={editSubcategoryName}
              onChange={(e) => setEditSubcategoryName(e.target.value)}
              placeholder="Enter subcategory name"
              className="mb-4"
            />
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