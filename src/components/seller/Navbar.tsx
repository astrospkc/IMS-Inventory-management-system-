import { useEffect, useState } from "react";
import useUserStore from "../../store/useUserStore.js"

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
                    <li className="cursor-pointer hover:text-gray-300 transition">
                        Products List
                    </li>
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
