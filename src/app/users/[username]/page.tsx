import CardList from "@/components/CardList";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import EditUser from "@/components/EditUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLineChart from "@/components/AppLineChart";

const SingleUserPage = () => {
    return (
        <div className="">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Mustafizur Rahman</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Container  */}
            <div className="mt-4 flex flex-col xl:flex-row gap-8">
                {/* LEFT  */}
                <div className="w-full xl:w-1/3 space-y-6">
                    {/* User badges container  */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">
                            User Badges
                        </h1>
                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck size={36} className="p-2 rounded-full bg-blue-500/30 border-1 border-blue-500/50" />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified User</h1>
                                    <p className="text-sm text-muted-foreground">This user has been verified by an admin.</p>

                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Shield size={36} className="p-2 rounded-full bg-teal-500/30 border-1 border-teal-500/50" />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified User</h1>
                                    <p className="text-sm text-muted-foreground">This user has been verified by an admin.</p>

                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Candy size={36} className="p-2 rounded-full bg-yellow-500/30 border-1 border-yellow-500/50" />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified User</h1>
                                    <p className="text-sm text-muted-foreground">This user has been verified by an admin.</p>

                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Citrus size={36} className="p-2 rounded-full bg-orange-500/30 border-1 border-orange-500/50" />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified User</h1>
                                    <p className="text-sm text-muted-foreground">This user has been verified by an admin.</p>

                                </HoverCardContent>
                            </HoverCard>

                        </div>
                    </div>
                    {/* Information container  */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold">
                                User Information
                            </h1>
                            <Sheet>
                                <SheetTrigger asChild><Button>Edit User</Button></SheetTrigger>
                                <EditUser/>
                                
                            </Sheet>
                        </div>
                        <div className="space-y-4 mt-4">
                            <div className="flex flex-col gap-2 mb-8">
                                <p className="text-sm text-muted-foreground">Profile Complete</p>
                                <Progress value={66} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Username:</span>
                                <span>Mustafizur Rahman</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Email:</span>
                                <span>
                                    mustafizur.rahman@example.com
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Phone:</span>
                                <span>+880 1234 567890</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Address:</span>
                                <span>123 Main St, Dhaka, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>Role:</span>
                                <Badge>Admin</Badge>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">Joined on <span>January 1, 2020</span></p>
                    </div>
                    {/* Cart list container*/}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <CardList title="Recent Transactions" />
                    </div>
                </div>
                {/* RIGHT  */}
                <div className="w-full xl/w-2/3 space-y-6">
                    {/* User card container  */}
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="size-12">
                                <AvatarImage src="https://github.com/shadcn.png"/>
                                <AvatarFallback>MR</AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-semibold">Mustafizur Rahman</h1>
                        </div>
                        <p className="text-sm text-muted-foreground">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse minus voluptate, accusantium impedit dolor maxime illo debitis fugiat itaque ipsum?</p>
                    </div>
                    {/* chart container  */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">User Activity</h1>
                        <AppLineChart/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUserPage;
