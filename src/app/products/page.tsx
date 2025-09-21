import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search } from "lucide-react"

const page = () => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Products</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex justify-between items-center">
                <h2 className="my-3 text-2xl font-semibold">Products</h2>
                <Button><Plus />Add Product</Button>
            </div>
            <div>
                <Tabs defaultValue="active" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="archive">Archive</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active">
                        <div className="flex gap-3 items-center">
                            <div className='flex justify-between items-center'>
                                <input type='text' placeholder='Search here' className='border rounded-sm py-1 px-3 lg:min-w-[300px]' />
                            </div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                                    <SelectItem value="Juwellery">Juwellery</SelectItem>
                                    <SelectItem value="Beauty">Beauty</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="In-Active">In-Active</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </TabsContent>
                    <TabsContent value="archive">Change your password here.</TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default page