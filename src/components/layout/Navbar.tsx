import Link from "next/link";
import DrawerPost from "../post/DrawerPost";
import DrawerCategory from "@/components/category/DrawerCategory";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-5">
      <Link href="/">Home</Link>
      <DrawerPost/>
      <DrawerCategory/>
    </nav>
  );
}

export default Navbar;