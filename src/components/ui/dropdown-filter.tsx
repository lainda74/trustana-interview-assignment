"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DropdownFilterProps } from "@/app/types/ui/dropdown.type";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useDebounce } from "@/app/hooks/useDebounce";

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  type = null,
  label = "Filter",
  value,
  total,
  onChange,
  onLoadMore,
  onSearchChange,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 300);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const filteredOptions = useMemo(
    () =>
      options?.filter((opt) =>
        opt.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ),
    [options, debouncedSearchTerm]
  );

  const selectedLabel = useMemo(() => 
    options?.find((opt) => opt.value === value)?.label || "All"
  , [options, value]);

  const handleScroll = useCallback(async () => {
    const listElement = listRef.current;
    if (
      listElement &&
      onLoadMore &&
      !isLoadingMore &&
      total &&
      options.length < total &&
      listElement.scrollTop + listElement.clientHeight >=
        listElement.scrollHeight - 10
    ) {
      setIsLoadingMore(true);
      await onLoadMore();
      setIsLoadingMore(false);
    }
  }, [onLoadMore, isLoadingMore, total, options]);

  return (
    <div className="flex items-center justify-between">
      {/* <span className="text-sm font-medium text-gray-700">{label}</span> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="relative">
          <Button
            variant="outline"
            className="w-full justify-between"
          >
            <span>{label} {selectedLabel}</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)]"
          onFocusCapture={() => {
            // Prevent focus from shifting to the first DropdownMenuItem
            if (document.activeElement !== inputRef.current) {
              inputRef.current?.focus();
            }
          }}
        >
          <Input
            ref={inputRef}
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mb-2"
          />
          <div
            ref={listRef}
            className="max-h-48 overflow-y-auto"
            onScroll={handleScroll}
          >
            <div className="text-xs text-muted-foreground px-2 py-1">
              {type}
            </div>

            {filteredOptions?.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => onChange(opt)}
                className="cursor-pointer hover:bg-accent"
              >
                {opt.label}
              </DropdownMenuItem>
            ))}

            {isLoadingMore && (
              <div className="text-sm text-muted-foreground px-2 py-1">
                Loading more...
              </div>
            )}

            {filteredOptions?.length === 0 && !isLoadingMore && (
              <div className="text-sm text-muted-foreground px-2 py-1">
                No options found
              </div>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default React.memo(DropdownFilter);
