type SpecLike = {
  id?: number;
  name?: string;
};

export type ProductSpecs = string | SpecLike | SpecLike[] | null | undefined;

export function formatProductSpecs(specs: ProductSpecs): string {
  if (!specs) return "";

  if (typeof specs === "string") {
    return specs;
  }

  if (Array.isArray(specs)) {
    return specs
      .map((spec) => (typeof spec?.name === "string" ? spec.name : ""))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof specs?.name === "string") {
    return specs.name;
  }

  return "";
}
