import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularContent = [
    {
        id: 1,
        title: "JavaScript Tutorial",
        badge: "Coding",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    },
    {
        id: 2,
        title: "React Guide",
        badge: "Coding",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    },
    {
        id: 3,
        title: "UI Design Basics",
        badge: "Design",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    },
    {
        id: 4,
        title: "Advanced CSS",
        badge: "Design",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    },
    {
        id: 5,
        title: "Node.js Crash Course",
        badge: "Coding",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    },
    {
        id: 6,
        title: "Python for Beginners",
        badge: "Coding",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 4300
    }   
]

const latestTransactions = [
    {
        id: 1,
        title: "Subscription Renewal",
        badge: "John Doe",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 1400
    },
    {
        id: 2,
        title: "New Purchase",
        badge: "Jane Smith",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 1200
    },
    {
        id: 3,
        title: "Refund Processed",
        badge: "Alice Johnson",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 1000
    },
    {
        id: 4,
        title: "Subscription Renewal",
        badge: "John Doe",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 1400
    },
    {
        id: 5,
        title: "Payment Received",
        badge: "John Doe",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
        count: 1400
    }
]

const CardList = ({title}: {title: string}) => {
    const list = title === "Popular Content" ? popularContent : latestTransactions;
  return (
    <div className="">
        <h1 className="text-lg font-medium mb-6">{title}</h1>
        <div className="flex flex-col gap-2">
            {list.map((item) => (
                <Card key={item.id} className="flex-row items-center justify-between gap-4 p-3">
                <div className="w-12 h-12 rounded-sm relative overflow-hidden ">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <CardContent className="flex-1 p-0">
                    <CardTitle className="text-sm font-medium">
                        {item.title}
                    </CardTitle>
                    <Badge variant="default">{item.badge}</Badge>
                </CardContent>
                <CardFooter className="p-0 font-bold text-lg">
                    {item.count/1000}k
                </CardFooter>
                    </Card>
            ))}
        </div>
    </div>
  )
}

export default CardList