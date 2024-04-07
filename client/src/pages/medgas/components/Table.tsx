import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import moment from "moment";

import { EType } from "../enums/type.enum";
import { CircularLoader } from "@/components/ui/CircularProgress";

export type GasEntry = {
    createdAt: Date;
    nAVAXPrice: string;
    usdPrice: string;
    type: EType;
};

export const columns: ColumnDef<GasEntry>[] = [
    {
        accessorKey: "createdAt",
        header: "Timestamp",
        cell: ({ row }) => (
            <div>
                {moment(row.getValue("createdAt")).format("hh:mm A DD/MM/YYYY")}
            </div>
        ),
    },
    {
        accessorKey: "nAVAXPrice",
        header: "nAVAX Price",
        cell: ({ row }) => <div>{row.getValue("nAVAXPrice")}</div>,
    },
    {
        accessorKey: "usdPrice",
        header: "USD Price",
        cell: ({ row }) => <div>{row.getValue("usdPrice")}</div>,
    },
];

export function PricingTable({
    gasData,
    gasLoading,
    currentPage,
    setCurrentPage,
    totalPages,
    setSelectedSort,
}: any) {
    const data: GasEntry[] = gasData?.data || [];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleSelectionChange = (newValue: string) => {
        setSelectedSort(newValue);
    };

    function handlePageChange(newPage: number) {
        setCurrentPage(newPage);
        // Here, you might also call your API to fetch data for the newPage
    }

    function generatePageNumbers(currentPage: any, totalPages: any) {
        let pageNumbers = [];
        const pagesToShow = 3; // Number of pages to show before and after the current page
        let startPage = Math.max(2, currentPage - pagesToShow);
        let endPage = Math.min(totalPages - 1, currentPage + pagesToShow);

        // Always include the first page
        pageNumbers.push(1);

        // Calculate whether we need ellipses after the first page
        const needsLeftEllipsis = startPage > 2;
        if (needsLeftEllipsis) {
            pageNumbers.push("...");
        }

        // Generate the dynamic range of page numbers
        for (let page = startPage; page <= endPage; page++) {
            pageNumbers.push(page);
        }

        // Calculate whether we need ellipses before the last page
        const needsRightEllipsis = totalPages - endPage > 1;
        if (needsRightEllipsis) {
            pageNumbers.push("...");
        }

        // Always include the last page if it's not the first page
        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    }

    const pageNumbers: any = generatePageNumbers(currentPage, totalPages);

    return (
        <div className="w-full flex justify-center">
            <div className="lg:w-[60%] w-[90%] px-12 mt-6">
                <div className="w-full flex items-center py-4 justify-end">
                    <Select
                        onValueChange={handleSelectionChange}
                        defaultValue="desc"
                    >
                        <SelectTrigger className="w-[270px] focus:outline-white">
                            <SelectValue placeholder="Select a value..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="desc">
                                Date Created: Newest First
                            </SelectItem>
                            <SelectItem value="asc">
                                Date Created: Oldest First
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {gasLoading ? (
                    <div className="w-full h-96 flex flex-col items-center justify-center">
                        <CircularLoader.spinner className="h-4 w-4 animate-spin" />
                        <h2 className="text-md  font-semibold mt-3">
                            Loading...
                        </h2>
                    </div>
                ) : (
                    <>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => {
                                                        return (
                                                            <TableHead
                                                                key={header.id}
                                                            >
                                                                {header.isPlaceholder
                                                                    ? null
                                                                    : flexRender(
                                                                          header
                                                                              .column
                                                                              .columnDef
                                                                              .header,
                                                                          header.getContext()
                                                                      )}
                                                            </TableHead>
                                                        );
                                                    }
                                                )}
                                            </TableRow>
                                        ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={
                                                    row.getIsSelected() &&
                                                    "selected"
                                                }
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <Pagination className="flex justify-end mt-5">
                            <PaginationContent>
                                <PaginationPrevious
                                    onClick={() =>
                                        currentPage > 1 &&
                                        handlePageChange(currentPage - 1)
                                    }
                                    aria-disabled={currentPage <= 1}
                                    tabIndex={currentPage <= 1 ? -1 : undefined}
                                    className={
                                        currentPage <= 1
                                            ? "pointer-events-none opacity-50 select-none"
                                            : "cursor-pointer select-none"
                                    }
                                />

                                {pageNumbers.map((pageNumber: any) =>
                                    pageNumber === "..." ? (
                                        <span key={pageNumber}>...</span>
                                    ) : (
                                        <PaginationItem
                                            key={pageNumber}
                                            onClick={() =>
                                                handlePageChange(pageNumber)
                                            }
                                        >
                                            <PaginationLink
                                                href="#"
                                                isActive={
                                                    currentPage === pageNumber
                                                }
                                            >
                                                {pageNumber}
                                            </PaginationLink>
                                        </PaginationItem>
                                    )
                                )}

                                <PaginationNext
                                    onClick={() =>
                                        currentPage < totalPages &&
                                        handlePageChange(currentPage + 1)
                                    }
                                    aria-disabled={currentPage >= totalPages}
                                    tabIndex={
                                        currentPage >= totalPages
                                            ? -1
                                            : undefined
                                    }
                                    className={
                                        currentPage >= totalPages
                                            ? "pointer-events-none opacity-50 select-none"
                                            : "cursor-pointer select-none"
                                    }
                                />
                            </PaginationContent>
                        </Pagination>
                    </>
                )}
            </div>
        </div>
    );
}
