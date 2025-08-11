"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import DropdownFilter from "@/components/ui/dropdown-filter";
import { AttributeMetadata } from "@/app/types/attribute";
import { fetchAttributes } from "@/app/services/attributeService";
import { Option } from "@/app/types/ui/dropdown.type";

const PAGE_SIZE = 25;

interface AttributeFilterProps {
  onAttributeChange: (option: Option) => void;
}

export default function AttributeFilter({ onAttributeChange }: AttributeFilterProps) {
  const searchParams = useSearchParams();
  
  const [attributes, setAttributes] = useState<AttributeMetadata[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedAttributeValue = searchParams.get("attribute") || "";

  const loadMoreAttributes = useCallback(async () => {
    if (total !== null && attributes.length >= total) return;

    try {
      const res = await fetchAttributes({
        filter: searchTerm ? { name: { $regex: searchTerm } } : undefined,
        pagination: { offset: attributes.length, limit: PAGE_SIZE },
      });
      setAttributes((prev) => [...prev, ...res.data]);
      if (res.total) {
        setTotal(res.total);
      }
    } catch (err) {
      console.error("Failed to load more attributes", err);
    }
  }, [attributes.length, total, searchTerm]);

  // Fetch initial list and when searchTerm changes
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await fetchAttributes({
          filter: searchTerm ? { name: { $regex: searchTerm } } : undefined,
          pagination: { offset: 0, limit: PAGE_SIZE },
        });
        setAttributes(res.data);
        setTotal(res.total);
      } catch (err) {
        console.error("Failed to load attributes", err);
      }
    };

    fetchInitial();
  }, [searchTerm]);

  const options = useMemo(
    () =>
      attributes.map((attr) => ({
        label: attr.name,
        value: attr.key,
      })),
    [attributes]
  );

  return (
    <DropdownFilter
      label="Filter :"
      type="Attributes"
      options={options}
      value={selectedAttributeValue}
      total={total ?? undefined}
      onChange={onAttributeChange}
      onLoadMore={loadMoreAttributes}
      onSearchChange={setSearchTerm}
    />
  );
}
