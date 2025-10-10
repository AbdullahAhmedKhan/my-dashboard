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

type Supplier = {
  id: string;
  name: string;
  phone: string;
  brand: string;
  address: string;
  isActive: boolean;
};

const initialSuppliers: Supplier[] = [
  { id: 'SUP001', name: 'TechTrend Innovations', phone: '+1234567890', brand: 'TechTrend', address: '123 Tech St, Innovation City, TX', isActive: true },
  { id: 'SUP002', name: 'Fashion Forward Ltd', phone: '+1987654321', brand: 'FashionF', address: '456 Style Ave, Fashion Town, NY', isActive: true },
  { id: 'SUP003', name: 'Home Essentials Co', phone: '+1123456789', brand: 'HomeEss', address: '789 Comfort Rd, Homeville, CA', isActive: false },
  { id: 'SUP004', name: 'BookWorld Suppliers', phone: '+1345678901', brand: 'BookWorld', address: '101 Read Ln, Booktown, FL', isActive: true },
  { id: 'SUP005', name: 'Sports Gear Inc', phone: '+1567890123', brand: 'Sporty', address: '321 Active Blvd, Sportscity, CO', isActive: true },
  { id: 'SUP006', name: 'Beauty Basics', phone: '+1789012345', brand: 'Beautify', address: '654 Glow St, Beautytown, WA', isActive: false },
  { id: 'SUP007', name: 'Toy Haven', phone: '+1901234567', brand: 'ToyHaven', address: '987 Play Dr, Toyville, IL', isActive: true },
  { id: 'SUP008', name: 'Auto Parts Pro', phone: '+1678901234', brand: 'AutoPro', address: '147 Engine Rd, Autocity, MI', isActive: true },
];

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [editSupplierName, setEditSupplierName] = useState('');
  const [editSupplierPhone, setEditSupplierPhone] = useState('');
  const [editSupplierBrand, setEditSupplierBrand] = useState('');
  const [editSupplierAddress, setEditSupplierAddress] = useState('');
  const [editSupplierStatus, setEditSupplierStatus] = useState(true);

  useEffect(() => {
    setSuppliers(initialSuppliers);
    setFilteredSuppliers(initialSuppliers);
  }, []);

  useEffect(() => {
    let filtered = suppliers;
    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.phone.includes(searchTerm) ||
        supplier.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(supplier =>
        statusFilter === 'active' ? supplier.isActive : !supplier.isActive
      );
    }
    setFilteredSuppliers(filtered);
  }, [searchTerm, statusFilter, suppliers]);

  const openAddSheet = () => {
    setSelectedSupplier(null);
    setEditSupplierName('');
    setEditSupplierPhone('');
    setEditSupplierBrand('');
    setEditSupplierAddress('');
    setEditSupplierStatus(true);
    setIsSheetOpen(true);
  };

  const openEditSheet = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setEditSupplierName(supplier.name);
    setEditSupplierPhone(supplier.phone);
    setEditSupplierBrand(supplier.brand);
    setEditSupplierAddress(supplier.address);
    setEditSupplierStatus(supplier.isActive);
    setIsSheetOpen(true);
  };

  const handleSaveSupplier = () => {
    if (editSupplierName && editSupplierPhone && editSupplierBrand && editSupplierAddress) {
      if (selectedSupplier) {
        // Edit existing
        const updatedSuppliers = suppliers.map(sup =>
          sup.id === selectedSupplier.id
            ? { ...sup, name: editSupplierName, phone: editSupplierPhone, brand: editSupplierBrand, address: editSupplierAddress, isActive: editSupplierStatus }
            : sup
        );
        setSuppliers(updatedSuppliers);
      } else {
        // Add new
        const newSupplier: Supplier = {
          id: `SUP${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editSupplierName,
          phone: editSupplierPhone,
          brand: editSupplierBrand,
          address: editSupplierAddress,
          isActive: editSupplierStatus,
        };
        setSuppliers([...suppliers, newSupplier]);
      }
      setEditSupplierName('');
      setEditSupplierPhone('');
      setEditSupplierBrand('');
      setEditSupplierAddress('');
      setEditSupplierStatus(true);
      setIsSheetOpen(false);
      setSelectedSupplier(null);
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
            <BreadcrumbPage>Supplier</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-semibold">Manage Supplier</h2>
        <Button onClick={openAddSheet}>
          <Plus className="mr-1" /> Add New Supplier
        </Button>
      </div>
      <div className="mb-4 flex space-x-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, brand, phone, or address..."
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
              <TableHead>Supplier Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="w-[120px] text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.brand}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell className="w-[120px] text-center">{supplier.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell className="w-[80px] text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(supplier)}
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
            <SheetTitle>{selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}</SheetTitle>
            <SheetDescription>
              {selectedSupplier ? 'Update the supplier details' : 'Create a new supplier'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Supplier Name</Label>
            <Input
              value={editSupplierName}
              onChange={(e) => setEditSupplierName(e.target.value)}
              placeholder="Enter supplier name"
              className="mb-4 w-full"
            />
            <Label className="mb-2">Supplier Phone</Label>
            <Input
              value={editSupplierPhone}
              onChange={(e) => setEditSupplierPhone(e.target.value)}
              placeholder="Enter phone number"
              className="mb-4 w-full"
            />
            <Label className="mb-2">Supplier Brand</Label>
            <Input
              value={editSupplierBrand}
              onChange={(e) => setEditSupplierBrand(e.target.value)}
              placeholder="Enter brand name"
              className="mb-4 w-full"
            />
            <Label className="mb-2">Supplier Address</Label>
            <Input
              value={editSupplierAddress}
              onChange={(e) => setEditSupplierAddress(e.target.value)}
              placeholder="Enter address"
              className="mb-4 w-full"
            />
            <Label className="mb-2">Status</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={editSupplierStatus}
                onCheckedChange={setEditSupplierStatus}
                aria-label="Toggle supplier status"
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-300"
              />
              <span>{editSupplierStatus ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <SheetFooter>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSupplier}>Save Supplier</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SupplierPage;