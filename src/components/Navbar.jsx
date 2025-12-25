import { useEffect, useState } from "react";
import {
    Flower,
    Menu,
    Search,
    ShoppingBasket,
    UserRound,
    X,
} from "lucide-react";
import { Link } from "react-router";
import useAuthStore from "../store/useAuthStore";
// import useAuthStore from "../store/useAuthStore";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // mengambil state usernya
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Catalog",
            path: "/catalog",
        },
        {
            name: "Orders",
            path: "/",
        },
        {
            name: "Contacts",
            path: "/",
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsVisible(scrollPosition > 100); // Navbar berubah saat scroll > 100px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="flex justify-center">
            <nav
                className={`fixed w-full top-0 transition-all duration-300 ease-in-out z-50 ${isVisible ? "bg-white shadow-lg rounded-2xl top-5" : "bg-transparent"
                    }`}
                style={{
                    width: isVisible ? "80%" : "100%",
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/*       Logo        */}
                        <div className="flex-shrink-0">
                            {/* <span className="text-xl font-bold text-gray-800">Logo</span> */}
                            <h1 className="flex items-center text-2xl font-bold text-[#B1B1B]">
                                TerraPlant
                            </h1>
                        </div>

                        {/*     Dektop Nav      */}
                        <div className="hidden md:flex space-x-4">
                            {navLinks.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className="text-[#1B1B1B] hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/*          Dekstop Right           */}
                        {!user ? (
                            <div
                                className="hidden md:flex gap-5 items-center"
                                style={{ color: isVisible ? "#1B1B1B" : "white" }}
                            >
                                <Link
                                    to="/register"
                                    className="py-2 px-5 rounded-xl font-semibold hover:bg-[#034032] hover:text-white transition-all duration-300 "
                                >
                                    Sign Up
                                </Link>

                                <Link
                                    to="/login"
                                    style={{
                                        backgroundColor: isVisible ? "#034032" : "transparent",
                                        color: isVisible ? "white" : "",
                                    }}
                                    className="py-2 px-5 rounded-xl font-semibold border"
                                >
                                    Log In
                                </Link>
                            </div>
                        ) : (
                            <div
                                className="hidden md:flex gap-5 items-center"
                                style={{ color: isVisible ? "#1B1B1B" : "white" }}
                            >
                                <Search />
                                <Link to="/cart">
                                    <ShoppingBasket />
                                </Link>

                                <div className="flex gap-2 items-center" onClick={logout}>
                                    <div className="border rounded-full p-1">
                                        <UserRound size={18} />
                                    </div>
                                    <p className="font-semibold">Hi, {user.nama}</p>
                                </div>
                            </div>
                        )}

                        {/*     Mobile menu nav before click   */}
                        <div
                            className="md:hidden flex gap-4"
                            style={{ color: isVisible ? "#1B1B1B" : "white" }}
                        >
                            <Search />
                            <ShoppingBasket />
                            <button onClick={() => setIsMenuOpen(true)}>
                                <Menu />
                            </button>
                        </div>

                        {/*    after burger menu click   */}
                        <div
                            className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                                }`}
                        >
                            <button
                                className="absolute top-4 right-4"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <X size={35} />
                            </button>

                            {navLinks.map((item, index) => (
                                <Link key={index} to={item.path} className="">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;