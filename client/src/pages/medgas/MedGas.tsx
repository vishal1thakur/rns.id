import { PricingTable } from "./components/Table";
import Header from "./components/Header";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";

const MedGas = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [selectedSort, setSelectedSort] = useState("desc");
    const { toast } = useToast();

    const {
        data: gasData,
        isLoading: gasLoading,
        refetch: refetchAllGas,
    } = useQuery({
        queryKey: ["gasData", currentPage, selectedSort],
        queryFn: () =>
            fetch(
                `http://localhost:3000/medgas/getAll?page=${currentPage}&pageSize=7&sortOrder=${selectedSort}`
            ).then((res) => res.json()),
    });

    useEffect(() => {
        if (gasData) {
            setTotalPages(Math.ceil(gasData.totalCount / 7));
            toast({
                title: `Medium Gas Price: ${gasData.data[0].nAVAXPrice} (${gasData.data[0].usdPrice})`,
                description: moment(gasData.data[0].createdAt).format(
                    "dddd, MMMM DD, YYYY at hh:mm A"
                ),
            });
        }
    }, [gasData]);

    return (
        <div>
            <Header
                gasData={gasData}
                refetchAllGas={refetchAllGas}
                gasLoading={gasLoading}
            />
            <PricingTable
                gasData={gasData}
                gasLoading={gasLoading}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                setSelectedSort={setSelectedSort}
            />
        </div>
    );
};

export default MedGas;
