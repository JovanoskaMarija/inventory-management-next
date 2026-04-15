export function buildUrl(
  baseUrl: string,
  params: Record<string, string | number>,
) {
  const search = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== "") {
          acc[key] = String(value);
        }
        return acc;
      },
      {} as Record<string, string>,
    ),
  );

  return `${baseUrl}?${search.toString()}`;
}
