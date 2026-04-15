import { getPaginationItems } from "@/app/inventory/pagination.utils";
import { buildUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}
export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const paginationItems = useMemo(
    () => getPaginationItems(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const createPageHref = (page: number) => {
    const safePage = Math.min(Math.max(page, 1), totalPages);

    return buildUrl(baseUrl, {
      ...searchParams,
      page: safePage,
    });
  };

  return (
    <nav className={paginationNav}>
      <Link
        href={currentPage <= 1 ? "#" : createPageHref(currentPage - 1)}
        prefetch={false}
        className={`${paginationBase} ${
          currentPage <= 1 ? paginationDisabled : paginationInactive
        }`}
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        <ChevronLeft />
        Previous
      </Link>
      {paginationItems.map((page, index) => {
        if (page == "...") {
          return (
            <span
              key={index}
              className="px-3 py-2 text-sm font-medium text-gray-500"
            >
              ...
            </span>
          );
        }
        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <Link
            key={index}
            href={createPageHref(pageNumber)}
            prefetch={false}
            aria-current={isActive ? "page" : undefined}
            className={`${paginationBase} ${
              isActive ? paginationActive : paginationInactive
            }`}
          >
            {page}
          </Link>
        );
      })}
      <Link
        href={currentPage >= totalPages ? "#" : createPageHref(currentPage + 1)}
        prefetch={false}
        className={`${paginationBase} ${
          currentPage >= totalPages ? paginationDisabled : paginationInactive
        }`}
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        <ChevronRight />
        Next
      </Link>
    </nav>
  );
}

const paginationBase =
  "px-3 py-2 text-sm font-medium rounded-lg border flex items-center gap-1";

const paginationActive = "bg-purple-600 text-white border-purple-600";

const paginationInactive =
  "text-gray-700 hover:bg-gray-100 bg-white border-gray-300";

const paginationDisabled =
  "text-gray-400 cursor-not-allowed bg-gray-100 border-gray-200";

const paginationNav = "flex items-center justify-center gap-1 p-2";
