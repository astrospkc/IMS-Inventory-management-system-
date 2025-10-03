import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore.js"
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Navbar = () => {
    const { isAuthenticate, setIsAuthenticate } = useUserStore();
    const [isScrolledUp, setIsScrolledUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // If user scrolls up
            if (currentScrollY > lastScrollY && currentScrollY > 0) {
                setIsScrolledUp(true);
            } else {
                setIsScrolledUp(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`fixed top-0   left-0 w-full z-50 transition-all duration-300 ${isScrolledUp
                ? "backdrop-blur-md bg-black/40 shadow-md"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-end items-center p-4 ">
                <ul className="flex space-x-6 text-lg font-medium">
                    <Link to="/products">

                        <li onClick={DialogDemo} className="cursor-pointer hover:text-gray-300 transition">
                            Products List
                        </li>
                    </Link>

                    {isAuthenticate ? (
                        <li
                            className="cursor-pointer hover:text-gray-300 transition"
                            onClick={() => setIsAuthenticate(false)}
                        >
                            Logout
                        </li>
                    ) : (
                        <li
                            className="cursor-pointer hover:text-gray-300 transition"
                            onClick={() => setIsAuthenticate(true)}
                        >
                            Login
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;



function DialogDemo() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

