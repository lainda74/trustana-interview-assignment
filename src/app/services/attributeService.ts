import { AttributeMetadata, TemplateAttribute } from "@/app/types/attribute";
import { SupplierAttributeQuery } from "../types/query-engine/attribute";

function sanitizeAttribute(raw: TemplateAttribute): AttributeMetadata {
  return {
    key: raw.key,
    name: raw.name
  };
}

export async function fetchAttributes(query: SupplierAttributeQuery = {}): Promise<{ data: AttributeMetadata[]; total: number }> {
  const response = await fetch(`/api/attributes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch attributes");
  }

  const data = await response.json();
  const sanitizedData = (data.data as TemplateAttribute[]).map(sanitizeAttribute);

  return { data: sanitizedData, total: data.total || 0 };
}

