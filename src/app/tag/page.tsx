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

type Tag = {
  id: string;
  name: string;
  isActive: boolean;
};

const initialTags: Tag[] = [
  { id: 'TAG001', name: 'New', isActive: true },
  { id: 'TAG002', name: 'Sale', isActive: true },
  { id: 'TAG003', name: 'Trending', isActive: false },
  { id: 'TAG004', name: 'Popular', isActive: true },
  { id: 'TAG005', name: 'Featured', isActive: true },
  { id: 'TAG006', name: 'Discount', isActive: false },
  { id: 'TAG007', name: 'Limited', isActive: true },
  { id: 'TAG008', name: 'Best Seller', isActive: true },
];

const TagPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [editTagName, setEditTagName] = useState('');
  const [editTagStatus, setEditTagStatus] = useState(true);

  useEffect(() => {
    setTags(initialTags);
    setFilteredTags(initialTags);
  }, []);

  useEffect(() => {
    let filtered = tags;
    if (searchTerm) {
      filtered = filtered.filter(tag =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tag =>
        statusFilter === 'active' ? tag.isActive : !tag.isActive
      );
    }
    setFilteredTags(filtered);
  }, [searchTerm, statusFilter, tags]);

  const openAddSheet = () => {
    setSelectedTag(null);
    setEditTagName('');
    setEditTagStatus(true);
    setIsSheetOpen(true);
  };

  const openEditSheet = (tag: Tag) => {
    setSelectedTag(tag);
    setEditTagName(tag.name);
    setEditTagStatus(tag.isActive);
    setIsSheetOpen(true);
  };

  const handleSaveTag = () => {
    if (editTagName) {
      if (selectedTag) {
        // Edit existing
        const updatedTags = tags.map(tag =>
          tag.id === selectedTag.id ? { ...tag, name: editTagName, isActive: editTagStatus } : tag
        );
        setTags(updatedTags);
      } else {
        // Add new
        const newTag: Tag = {
          id: `TAG${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          name: editTagName,
          isActive: editTagStatus,
        };
        setTags([...tags, newTag]);
      }
      setEditTagName('');
      setEditTagStatus(true);
      setIsSheetOpen(false);
      setSelectedTag(null);
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
            <BreadcrumbPage>Tag</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-3">
        <h2 className="text-2xl font-semibold">Manage Tag</h2>
        <Button onClick={openAddSheet}>
          <Plus className="mr-1" /> Add New Tag
        </Button>
      </div>
      <div className="mb-4 flex space-x-4">
        <div>
          <Label htmlFor="search">Search</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by tag..."
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
              <TableHead>Tag Name</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.isActive ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditSheet(tag)}
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
            <SheetTitle>{selectedTag ? 'Edit Tag' : 'Add New Tag'}</SheetTitle>
            <SheetDescription>
              {selectedTag ? 'Update the tag name and status' : 'Create a new tag'}
            </SheetDescription>
          </SheetHeader>
          <div className="p-4">
            <Label className="mb-2">Tag Name</Label>
            <Input
              value={editTagName}
              onChange={(e) => setEditTagName(e.target.value)}
              placeholder="Enter tag name"
              className="mb-4"
            />
            <Label className="mb-2">Status</Label>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                checked={editTagStatus}
                onCheckedChange={setEditTagStatus}
                aria-label="Toggle tag status"
                className="data-[state=checked]:bg-rose-400 data-[state=unchecked]:bg-gray-300"
              />
              <span>{editTagStatus ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <SheetFooter>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsSheetOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTag}>Save Tag</Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TagPage;