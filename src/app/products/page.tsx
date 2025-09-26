import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronsRight, Pencil, Plus } from "lucide-react"
import Image from "next/image"
import Necklace02 from '../../assets/images/products/Necklace02.webp'
import Necklace05 from '../../assets/images/products/Necklace05.webp'
import Necklace09 from '../../assets/images/products/Necklace09.webp'
import Necklace11 from '../../assets/images/products/Necklace11.webp'
import Rings04 from '../../assets/images/products/Rings04.webp'
import Rings05 from '../../assets/images/products/Rings05.webp'
import { Progress } from "@/components/ui/progress"

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
                    <TabsContent value="archive">No archive data found.</TabsContent>
                </Tabs>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-5">
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace02} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Celestial Love Chain</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-029</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$420.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$550.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>43 Stock - High</p>
                                <p>Variants (3)</p>
                            </div>
                            <Progress value={86}
                                fill={"bg-emerald-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace05} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Alphabet Chic Pendant</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>13 Stock - High</p>
                                <p>Variants (6)</p>
                            </div>
                            <Progress value={26}
                                fill={"bg-rose-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace09} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Celestial Love Chain</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-029</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$420.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$550.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>43 Stock - High</p>
                                <p>Variants (3)</p>
                            </div>
                            <Progress value={86}
                                fill={"bg-emerald-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace11} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Alphabet Chic Pendant</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>13 Stock - High</p>
                                <p>Variants (6)</p>
                            </div>
                            <Progress value={26}
                                fill={"bg-rose-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Rings04} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Dainty Moonlight Ring</p>
                                <span className="text-xs text-muted-foreground">SKU-Rings-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">Rings</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>13 Stock - High</p>
                                <p>Variants (6)</p>
                            </div>
                            <Progress value={26}
                                fill={"bg-rose-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Rings05} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Whimsical Paw Delight</p>
                                <span className="text-xs text-muted-foreground">SKU-Rings-029</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">Rings</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$420.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$550.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>43 Stock - High</p>
                                <p>Variants (3)</p>
                            </div>
                            <Progress value={86}
                                fill={"bg-emerald-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none bg-accent">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace05} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Alphabet Chic Pendant</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2">
                            <span className="bg-rose-50 text-rose-700 rounded-full px-2 text-sm border">Out of Stock</span>
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace02} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Celestial Love Chain</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-029</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$420.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$550.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>43 Stock - High</p>
                                <p>Variants (3)</p>
                            </div>
                            <Progress value={86}
                                fill={"bg-emerald-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace05} alt="product" width={50} className="rounded-md object-cover border" />
                            <div className="flex flex-col gap-1">
                                <p>Alphabet Chic Pendant</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>13 Stock - High</p>
                                <p>Variants (6)</p>
                            </div>
                            <Progress value={26}
                                fill={"bg-rose-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="flex items-start gap-2">
                            <Image src={Necklace05} alt="product" width={50} className="rounded-md border object-cover" />
                            <div className="flex flex-col gap-1">
                                <p>Alphabet Chic Pendant</p>
                                <span className="text-xs text-muted-foreground">SKU-Necklaces-030</span>
                            </div>
                        </CardTitle>
                        <CardDescription></CardDescription>
                        <CardAction><div className="flex items-center justify-center p-2 border rounded-md"><Pencil size={16} /></div></CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-1 text-sm flex-wrap text-muted-foreground">
                            <span className="border rounded-full px-2">necklaces</span>
                            <span className="border rounded-full px-2">beauty</span>
                            <span className="border rounded-full px-2">woman</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex flex-col">
                                <p className="text-muted-foreground">Buy</p>
                                <p className="text-base font-semibold">$600.00</p>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <p className="text-muted-foreground">Sell</p>
                                    <p className="text-base font-semibold">$750.00</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center gap-5">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <p>13 Stock - High</p>
                                <p>Variants (6)</p>
                            </div>
                            <Progress value={26}
                                fill={"bg-rose-400"}
                                />
                        </div>
                        <div className="p-2 rounded-md border ">
                            <ChevronsRight size={14}/>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}

export default page