import { request } from "@/app/utils/request";
import { AttributeMetadata, TemplateAttribute } from "@/app/types/attribute";
import { SupplierAttributeQuery } from "../types/query-engine/attribute";

function sanitizeAttribute(raw: TemplateAttribute): AttributeMetadata {
  return { key: raw.key, name: raw.name };
}

export async function fetchAttributes(
  query: SupplierAttributeQuery = {}
): Promise<{ data: AttributeMetadata[]; total: number }> {
  const data = await request<{ data: TemplateAttribute[]; total: number }>(
    "/api/attributes",
    {
      method: "POST",
      body: JSON.stringify(query),
    }
  );

  return {
    data: data.data.map(sanitizeAttribute),
    total: data.total || 0,
  };
}
