"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // Use usePathname instead of useRouter
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname(); // Get current path
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // Log the current path to verify it
  console.log("Current path:", pathname);

  // Set text color based on the current path
  const textColor = pathname === "/design" ? "text-black" : "text-gray-200";

  return (
    <header className="absolute top-2 inset-x-0 flex justify-between items-center px-4 lg:px-8 z-20 bg-transparent">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/Logo.jpg"
          alt="شعار"
          width={50}
          height={50}
          className="rounded-full w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24"
          priority
        />
      </div>
      {isSmallScreen ? (
        <button onClick={toggleMenu} className={`p-2 bg-black/20 rounded-lg ${textColor}`}>
          <FiMenu size={24} />
        </button>
      ) : (
        <nav className="flex space-x-8 text-lg font-semibold">
          <Link href="/" className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
            الرئيسية
          </Link>
          <Link href="/design" className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
            التصميم
          </Link>
          <button onClick={() => scrollToSection("#clothing-styles")} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
            الأنماط
          </button>
          <button onClick={() => scrollToSection("#footer")} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
            اتصل بنا
          </button>
        </nav>
      )}
      {isSmallScreen && isMenuOpen && (
        <div className="absolute top-12 left-4 bg-black/20 p-4 rounded-lg z-10">
          <nav className="flex flex-col space-y-4 text-lg font-semibold">
            <Link href="/" onClick={toggleMenu} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
              الرئيسية
            </Link>
            <Link href="/design" onClick={toggleMenu} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
              التصميم
            </Link>
            <button onClick={() => scrollToSection("#clothing-styles")} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
              الأنماط
            </button>
            <button onClick={() => scrollToSection("#footer")} className={`hover:bg-[#F1C232] transition-colors rounded-md py-2 px-4 ${textColor}`}>
              اتصل بنا
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
