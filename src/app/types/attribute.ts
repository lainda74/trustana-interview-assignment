/**
 * Fixed types
 * If you need to modify these, please state your reasons in the SUBMISSION.md file.
 */

import { AttributeFieldType, AttributeGroup } from "../enums/attribute";

export interface AttributeOption {
  // common
  required?: boolean;
  order?: number;

  // text, long text, rich text
  maxLength?: number;
  minLength?: number;
  regex?: string;

  // number, measure
  maximum?: number; // only for number
  minimum?: number; // only for number
  integer?: boolean;
  unitList?: string[]; // only for unit list

  // Multi-select, dropdown
  selection?: string[];

  // price
  currency?: string;

  // disable state
  disabled?: boolean;
}

export interface SupplierAttribute {
  id: string;
  createdAt: number;
  updatedAt: number;
  type: AttributeFieldType;
  name: string;
  key: string;
  option?: AttributeOption;
  description?: string;
  group?: AttributeGroup;
  placeHolder?: string;
}

export interface AttributeMetadata {
  key: string;
  name: string;
}

export interface TemplateAttributeOption {
  useRtfTemplate: boolean;
  rtfTemplate: string;
  requireAllSections: boolean;
  referencedKeys: string[];
}

export interface TemplateAttribute {
  id: string;
  key: string;
  name: string;
  group: string;
  type: string;
  option: TemplateAttributeOption;
  class: string;
  tags: string[];
  updatedAt: number;
  createdAt: number;
  enableAIEnrichment: boolean;
}
