'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MenuButtonProps } from '@/app/types/ui/menuButton';

const MenuButton: React.FC<MenuButtonProps> = ({ title, columns, onColumnsChange }) => {
  const handleVisibilityChange = (key: string) => {
    const newColumns = columns.map(col =>
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(newColumns);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="mb-4">
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-72 overflow-auto">
        {columns.map(col => (
          <DropdownMenuCheckboxItem
            key={col.key}
            checked={col.visible}
            onCheckedChange={() => handleVisibilityChange(col.key)}
          >
            {col.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuButton;
