// orders/page.tsx
"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { columns, Order } from './columns'
import { DataTable } from './data-table'
// import { DataTable } from './data-table'
// import { columns, Order } from './columns'

const getData = async (): Promise<Order[]> => {
  // Simulate API call - in real app, fetch from API
  return [
    { id: 'ORD001', customerName: 'John Doe', email: 'johndoe@gmail.com', date: new Date('2025-09-15'), status: 'pending', total: 150.0 },
    { id: 'ORD002', customerName: 'Jane Smith', email: 'janesmith@gmail.com', date: new Date('2025-09-20'), status: 'shipped', total: 250.5 },
    { id: 'ORD003', customerName: 'Alice Johnson', email: 'alicejohnson@gmail.com', date: new Date('2025-10-01'), status: 'delivered', total: 99.99 },
    { id: 'ORD004', customerName: 'Robert Brown', email: 'robertbrown@gmail.com', date: new Date('2025-09-12'), status: 'cancelled', total: 45.75 },
    { id: 'ORD005', customerName: 'Michael Lee', email: 'michaellee@gmail.com', date: new Date('2025-08-28'), status: 'pending', total: 330.25 },
    { id: 'ORD006', customerName: 'Emily Davis', email: 'emilydavis@gmail.com', date: new Date('2025-09-10'), status: 'delivered', total: 420.0 },
    { id: 'ORD007', customerName: 'David Wilson', email: 'davidwilson@gmail.com', date: new Date('2025-09-30'), status: 'shipped', total: 275.45 },
    { id: 'ORD008', customerName: 'Sophia Taylor', email: 'sophiataylor@gmail.com', date: new Date('2025-09-19'), status: 'delivered', total: 180.0 },
    { id: 'ORD009', customerName: 'Daniel White', email: 'danielwhite@gmail.com', date: new Date('2025-08-25'), status: 'pending', total: 520.6 },
    { id: 'ORD010', customerName: 'Olivia Harris', email: 'oliviaharris@gmail.com', date: new Date('2025-09-05'), status: 'cancelled', total: 75.99 },
    { id: 'ORD011', customerName: 'Matthew Clark', email: 'matthewclark@gmail.com', date: new Date('2025-10-03'), status: 'pending', total: 240.75 },
    { id: 'ORD012', customerName: 'Ava Lewis', email: 'avalewis@gmail.com', date: new Date('2025-09-18'), status: 'shipped', total: 310.0 },
    { id: 'ORD013', customerName: 'Ethan Walker', email: 'ethanwalker@gmail.com', date: new Date('2025-09-14'), status: 'delivered', total: 150.25 },
    { id: 'ORD014', customerName: 'Isabella Hall', email: 'isabellahall@gmail.com', date: new Date('2025-09-22'), status: 'shipped', total: 210.5 },
    { id: 'ORD015', customerName: 'James Allen', email: 'jamesallen@gmail.com', date: new Date('2025-08-30'), status: 'delivered', total: 130.0 },
    { id: 'ORD016', customerName: 'Mia Young', email: 'miayoung@gmail.com', date: new Date('2025-09-25'), status: 'pending', total: 360.9 },
    { id: 'ORD017', customerName: 'William Scott', email: 'williamscott@gmail.com', date: new Date('2025-09-11'), status: 'shipped', total: 440.0 },
    { id: 'ORD018', customerName: 'Charlotte King', email: 'charlotteking@gmail.com', date: new Date('2025-09-28'), status: 'delivered', total: 290.75 },
    { id: 'ORD019', customerName: 'Benjamin Green', email: 'benjamingreen@gmail.com', date: new Date('2025-09-07'), status: 'pending', total: 500.0 },
    { id: 'ORD020', customerName: 'Amelia Adams', email: 'ameliaadams@gmail.com', date: new Date('2025-10-02'), status: 'cancelled', total: 70.5 },
    { id: 'ORD021', customerName: 'Lucas Baker', email: 'lucasbaker@gmail.com', date: new Date('2025-09-23'), status: 'delivered', total: 230.0 },
    { id: 'ORD022', customerName: 'Harper Nelson', email: 'harpernelson@gmail.com', date: new Date('2025-09-17'), status: 'shipped', total: 315.8 },
  ]
}


const OrdersPage = () => {
    const [data, setData] = useState<Order[]>([]);
    const [filteredData, setFilteredData] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
    const [dateTo, setDateTo] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const orders = await getData();
            setData(orders);
            setFilteredData(orders);
        };
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = data;

        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter) {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        if (dateFrom) {
            filtered = filtered.filter(order => order.date >= dateFrom);
        }

        if (dateTo) {
            filtered = filtered.filter(order => order.date <= dateTo);
        }

        setFilteredData(filtered);
    }, [searchTerm, statusFilter, dateFrom, dateTo, data]);

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Orders</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="mt-3 mb-8">
                <h1 className="font-semibold text-2xl">Order Management</h1>
                <p className="text-sm text-muted-foreground">Manage and track all customer orders.</p>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="search">Search</Label>
                    <div className="relative mt-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search by ID, name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
                <div>
                    <Label>Status</Label>
                    <Select value={statusFilter || ''} onValueChange={setStatusFilter}>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Date From</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal mt-1",
                                    !dateFrom && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateFrom ? format(dateFrom, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={dateFrom}
                                onSelect={setDateFrom}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <Label>Date To</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal mt-1",
                                    !dateTo && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateTo ? format(dateTo, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={dateTo}
                                onSelect={setDateTo}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <DataTable columns={columns} data={filteredData} />
        </div>
    )
}

export default OrdersPage