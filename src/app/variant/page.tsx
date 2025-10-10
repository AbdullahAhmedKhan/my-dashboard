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

type Variant = {
  id: string;
  name: string;
  isActive: boolean;
};

const initialVariants: Variant[] = [
  { id: 'VAR001', name: 'Red', isActive: true },
  { id: 'VAR002', name: 'Blue', isActive: true },
  { id: 'VAR003', name: 'Small', isActive: false },
  { id: 'VAR004', name: 'Medium', isActive: true },
  { id: 'VAR005', name: 'Large', isActive: true },
  { id: 'VAR006', name: 'Black', isActive: false },
  { id: 'VAR007', name: 'White', isActive: true },
  { id: 'VAR008', name: 'Extra Large', isActive: true },
];

const VariantPage = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [filteredVariants, setFilteredVariants] = useState<Variant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [editVariantName, setEditVariantName] = useState('');

  useEffect(() => {
    setVariants(initialVariants);
    setFilteredVariants(initialVariants);
  }, []);

  useEffect(() => {
    let filtered = variants;
    if (searchTerm) {
      filtered = filtered.filter(variant =>
        variant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(variant =>
        statusFilter === 'active' ? variant.isActive : !variant.isActive
      );
    }
    setFilteredVariants(filtered);
  }, [searchTerm, statusFilter, variants]);

  const openAddSheet = () => {
    setSelectedVariant(null);
    setEditVariantName('');
    setIsSheetOpen(true);
  };

  const openEditSheet = (variant: Variant) => {
    setSelectedVariant(variant);
    setEditVariantName(variant.name);
    setIsSheetOpen(true);
  };

  const handleSaveVariant = () => {
    if (editVariantName) {
      if (selectedVariant) {
        // Edit existing
        const updatedVariants = variants.map(var_ =>
          var_.id === selectedVariant.id ? { ...var_, name: editVariantName } : var_
        );
        setVariants(updatedVariants);
      } else {
        // Add new
        const newVariant: Variant = {
          id: `VAR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editVariantName,
          isActive: true,
        };
        setVariants([...variants, newVariant]);
      }
      setEditVariantName('');
      setIsSheetOpen(false);
      setSelectedVariant(null);
    }
  };

  const handleToggleStatus = (id: string) => {
    const updatedVariants = variants.map(var_ =>
      var_.id === id ? { ...var_, isActive: !var_.isActive } : var_
    );
    setVariants(updatedVariants);
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
            <BreadcrumbPage>Variant</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-semibold">Manage Variant</h2>
        <Button onClick={openAddSheet}>
          <Plus className="mr-1" /> Add New Variant
        </Button>
      </div>
      <div className="mb-4 flex space-x-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by variant..."
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
              <TableHead>Variant Name</TableHead>
              <TableHead className="w-[120px] text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVariants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>{variant.name}</TableCell>
                <TableCell className="w-[120px] text-center">
                  <Switch
                    checked={variant.isActive}
                    onCheckedChange={() => handleToggleStatus(variant.id)}
                    aria-label={`Toggle ${variant.name} status`}
                    className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                  />
                  <span className="ml-2">{variant.isActive ? 'Active' : 'Inactive'}</span>
                </TableCell>
                <TableCell className="w-[80px] text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(variant)}
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
            <SheetTitle>{selectedVariant ? 'Edit Variant' : 'Add New Variant'}</SheetTitle>
            <SheetDescription>
              {selectedVariant ? 'Update the variant name' : 'Create a new variant'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Variant Name</Label>
            <Input
              value={editVariantName}
              onChange={(e) => setEditVariantName(e.target.value)}
              placeholder="Enter variant name"
              className="mb-4"
            />
          </div>
          <SheetFooter>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveVariant}>Save Variant</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VariantPage;