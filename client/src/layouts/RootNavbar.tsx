import { useThemeContext } from "@/Contexts/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useLayoutEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useAuth } from "@/features/authentication/contexts/AuthProvider";

const RootNavbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-950">
      <div className="container my-4 flex justify-between">
        <div className="left-nav">
          <h3>WDS App</h3>
        </div>
        <div className="right-nav flex gap-4">
          <ThemeDropDownButton />
          <div className="hidden sm:flex">
            <NavItem to="/" label="Task Board" />
            <NavItem to="/" label="Job Listings" />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
                  >
                    <span>{user.email}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/jobs/my-listings">My Listings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavItem to="/login" label="Login" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex sm:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/">Task Board</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">Job Listings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {user ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger asChild>
                    <span className="mr-auto">{user.email}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem asChild>
                        <Link to="/jobs/my-listings">My Listings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => {
  return (
    <Button asChild variant="ghost">
      <Link to={to}>{label}</Link>
    </Button>
  );
};

const ThemeDropDownButton = () => {
  const { theme, setTheme } = useThemeContext();

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setSystemTheme = () => {
    const themeColor = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    setTheme(themeColor);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          {theme == "dark" ? (
            <Moon className="h-5 w-5 scale-0 dark:scale-100 transition-transform" />
          ) : (
            <Sun className="h-5 w-5 scale-100 dark:scale-0 transition-transform" />
          )}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystemTheme}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default RootNavbar;
