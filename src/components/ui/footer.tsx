import React from "react";

export function Footer() {
  return (
    <footer className="bg-teal-500 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Photography Events. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
