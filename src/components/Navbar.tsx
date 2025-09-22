"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { LogOut, Moon, Search, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { SidebarTrigger } from './ui/sidebar'

export const Navbar = () => {
    const {theme, setTheme} = useTheme();
    return (
        <nav className="p-4 flex items-center justify-between sticky top-0 bg-background z-10">
            {/* LEFT  */}
            <div className='flex gap-3 items-center'>
                <SidebarTrigger/> 
                <div className='flex justify-between items-center'>
                    <input type='text' placeholder='Search here' className='border rounded-full py-2 px-3 lg:min-w-[600px]'/>
                    <div className='p-2 rounded-full bg-accent-foreground ml-[-40]'><Search size='18' className='text-primary-foreground'/></div>
                </div>
            </div>
            {/* RIGHT  */}
            <div className="flex items-center gap-4">
                <Link href="/">Dashboard</Link>
                {/* Theme Menu  */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* User Menu  */}
                <DropdownMenu>
                    <DropdownMenuTrigger>                <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className="w-8 h-8 rounded-full" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar></DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem variant='destructive'>
                            <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </nav>
    )
}
