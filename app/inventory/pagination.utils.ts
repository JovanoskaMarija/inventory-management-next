export function getPaginationItems(
  currentPage: number,
  totalPages: number,
  delta = 2,
): (number | "...")[] {
  if (totalPages === 1) return [1];

  const range: number[] = [];
  const result: (number | "...")[] = [1];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) result.push("...");

  result.push(...range);

  if (currentPage + delta < totalPages - 1) result.push("...");

  result.push(totalPages);

  return result;
}
