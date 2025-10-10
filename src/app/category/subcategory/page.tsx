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

type Subcategory = {
  id: string;
  name: string;
};

const initialSubcategories: Subcategory[] = [
  { id: 'SUB001', name: 'Smartphones' },
  { id: 'SUB002', name: 'Laptops' },
  { id: 'SUB003', name: 'Men’s Clothing' },
  { id: 'SUB004', name: 'Women’s Clothing' },
  { id: 'SUB005', name: 'Accessories' },
  { id: 'SUB006', name: 'Footwear' },
  { id: 'SUB007', name: 'Home Appliances' },
  { id: 'SUB008', name: 'Books' },
];

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      filtered = subcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredSubcategories(filtered);
  }, [searchTerm, subcategories]);

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
        };
        setSubcategories([...subcategories, newSubcategory]);
      }
      setEditSubcategoryName('');
      setIsSheetOpen(false);
      setSelectedSubcategory(null);
    }
  };

  const handleDeleteSubcategory = (id: string) => {
    setSubcategories(subcategories.filter(subcategory => subcategory.id !== id));
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
      <div className='mb-4 flex space-x-2'>
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
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              <TableHead>Subcategory Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.map((subcategory) => (
              <TableRow key={subcategory.id}>
                <TableCell>{subcategory.name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(subcategory)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSubcategory(subcategory.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
          <div className="py-4">
            <Label>Subcategory Name</Label>
            <Input
              value={editSubcategoryName}
              onChange={(e) => setEditSubcategoryName(e.target.value)}
              placeholder="Enter subcategory name"
              className="mb-4"
            />
          </div>
          <SheetFooter>
            <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSubcategory}>Save Subcategory</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SubcategoryPage;