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

type VariantType = {
  id: string;
  name: string;
};

type Variant = {
  id: string;
  name: string;
  isActive: boolean;
  typeId: string;
  hexCode?: string;
};

const variantTypes: VariantType[] = [
  { id: 'color', name: 'Color' },
  { id: 'size', name: 'Size' },
  { id: 'weight', name: 'Weight' },
  // Add more types as needed
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

const VariantPage = () => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [filteredVariants, setFilteredVariants] = useState<Variant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [editVariantName, setEditVariantName] = useState('');
  const [editVariantStatus, setEditVariantStatus] = useState(true);
  const [editVariantTypeId, setEditVariantTypeId] = useState('');
  const [editHexCode, setEditHexCode] = useState('');

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
    if (typeFilter !== 'all') {
      filtered = filtered.filter(variant => variant.typeId === typeFilter);
    }
    setFilteredVariants(filtered);
  }, [searchTerm, statusFilter, typeFilter, variants]);

  const openAddSheet = () => {
    setSelectedVariant(null);
    setEditVariantName('');
    setEditVariantStatus(true);
    setEditVariantTypeId(variantTypes[0]?.id || '');
    setEditHexCode('');
    setIsSheetOpen(true);
  };

  const openEditSheet = (variant: Variant) => {
    setSelectedVariant(variant);
    setEditVariantName(variant.name);
    setEditVariantStatus(variant.isActive);
    setEditVariantTypeId(variant.typeId);
    setEditHexCode(variant.hexCode || '');
    setIsSheetOpen(true);
  };

  const handleSaveVariant = () => {
    if (editVariantName && editVariantTypeId) {
      const isColorType = getTypeName(editVariantTypeId) === 'Color';
      if (isColorType && !editHexCode) {
        // Optional: Add validation alert if hex is required for color
        return;
      }
      if (selectedVariant) {
        // Edit existing
        const updatedVariants = variants.map(var_ =>
          var_.id === selectedVariant.id 
            ? { ...var_, name: editVariantName, isActive: editVariantStatus, typeId: editVariantTypeId, hexCode: isColorType ? editHexCode : undefined } 
            : var_
        );
        setVariants(updatedVariants);
      } else {
        // Add new
        const newVariant: Variant = {
          id: `VAR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editVariantName,
          isActive: editVariantStatus,
          typeId: editVariantTypeId,
          hexCode: isColorType ? editHexCode : undefined,
        };
        setVariants([...variants, newVariant]);
      }
      setEditVariantName('');
      setEditVariantStatus(true);
      setEditVariantTypeId('');
      setEditHexCode('');
      setIsSheetOpen(false);
      setSelectedVariant(null);
    }
  };

  const getTypeName = (typeId: string) => {
    const type = variantTypes.find(t => t.id === typeId);
    return type ? type.name : 'Unknown';
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
        <div>
          <Label htmlFor="type-filter">Type</Label>
          <Select onValueChange={(value) => setTypeFilter(value)} defaultValue="all">
            <SelectTrigger id="type-filter" className="w-[180px] mt-1">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {variantTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Variant Type</TableHead>
              <TableHead>Variant Name</TableHead>
              <TableHead>Hex Code</TableHead>
              <TableHead className="w-[120px] text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVariants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>{getTypeName(variant.typeId)}</TableCell>
                <TableCell>{variant.name}</TableCell>
                <TableCell>
                  {variant.hexCode ? (
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 mr-2 rounded"
                        style={{ backgroundColor: variant.hexCode }}
                      />
                      {variant.hexCode}
                    </div>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell className="w-[120px] text-center">{variant.isActive ? 'Active' : 'Inactive'}</TableCell>
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
              {selectedVariant ? 'Update the variant details' : 'Create a new variant'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Variant Type</Label>
            <Select
              onValueChange={setEditVariantTypeId}
              value={editVariantTypeId}
            >
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {variantTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label className="mb-2">Variant Name</Label>
            <Input
              value={editVariantName}
              onChange={(e) => setEditVariantName(e.target.value)}
              placeholder="Enter variant name"
              className="mb-4"
            />
            {getTypeName(editVariantTypeId) === 'Color' && (
              <>
                <Label className="mb-2">Hex Code</Label>
                <Input
                  value={editHexCode}
                  onChange={(e) => setEditHexCode(e.target.value)}
                  placeholder="#RRGGBB"
                  className="mb-4"
                />
              </>
            )}
            <Label className="mb-2">Status</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={editVariantStatus}
                onCheckedChange={setEditVariantStatus}
                aria-label="Toggle variant status"
                className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
              />
              <span>{editVariantStatus ? 'Active' : 'Inactive'}</span>
            </div>
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