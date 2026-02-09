"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Dropdown Menu Context Provider
interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  );
};

// Dropdown Trigger
interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const DropdownTrigger = ({ 
  children, 
  className, 
  onMouseEnter, 
  onMouseLeave, 
  onClick 
}: DropdownTriggerProps) => {
  return (
    <div
      className={cn("cursor-pointer", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Dropdown Content
interface DropdownContentProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const DropdownContent = ({ 
  children, 
  align = 'start', 
  className,
  onMouseEnter,
  onMouseLeave 
}: DropdownContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute top-full mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-lg z-50",
        alignClasses[align],
        className
      )}
      onMouseEnter={() => {
        setIsOpen(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        onMouseLeave?.();
      }}
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="py-2">
        {children}
      </div>
    </div>
  );
};

// Dropdown Item
interface DropdownItemProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const DropdownItem = ({ children, href, onClick, className }: DropdownItemProps) => {
  const baseClasses = "block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors";

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseClasses, className)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, "text-left w-full", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};