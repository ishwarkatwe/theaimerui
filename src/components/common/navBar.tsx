import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";
import { Input } from "../ui/input";
import { BRAND } from "../utils/core";
import useStore from "../utils/states/notes";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { API_ADD_POST, API_USERDATA } from "../utils/constants/endpoints";

const useData = async () => {
  const response = await fetch(API_ADD_POST);
  const data = await response.json();
  return data;
};

const fetchUser = async () => {
  const res = await fetch(API_USERDATA, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  return await res.json();
};

export default function Navbar() {
  const user = useStore((state: any) => state.user);
  const setUser = useStore((state: any) => state.setUser);
  const search = useStore((state: any) => state.search);
  const setSearch = useStore((state: any) => state.setSearch);
  const setNotes = useStore((state: any) => state.setNotes);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const res = await useData();
      setNotes(res.data);

      const user = await fetchUser();
      if (user) {
        setUser(user);
      } else {
        navigate("/login", { replace: true });
      }
    };

    getData();

    return () => {};
  }, [search]);

  function redirect(path: string) {
    navigate(`/${path}`, { replace: true });
  }

  return (
    <nav className="w-full bg-white border-b shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          {BRAND}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
        </div>

        <div className="hidden md:flex w-[500px]">
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="hover:text-blue-600 flex items-center gap-2 capitalize">
            <User /> {user ? user.username : "Guest user"}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {user ? (
              <>
                <DropdownMenuLabel onClick={() => redirect("account")}>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuLabel onClick={() => redirect("add-post")}>
                  Add Post
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setUser(null);
                    redirect("login");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => redirect("login")}>
                Sign In
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <div className="flex flex-col gap-4 text-lg font-medium">
                <Link to="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link to="/notes" className="hover:text-blue-600">
                  Notes
                </Link>
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
