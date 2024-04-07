import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";

const Header = ({ gasData, refetchAllGas }: any) => {
    const { toast } = useToast();
    const [nextFetchIn, setNextFetchIn] = useState("");
    const [fetchCurrent, setFetchCurrent] = useState(false);
    const { data: currentGasData } = useQuery({
        queryKey: ["currentGasData"],
        queryFn: () =>
            fetch(`http://localhost:3000/medgas/fetchCurrent`).then((res) =>
                res.json()
            ),
        enabled: fetchCurrent,
    });
    useEffect(() => {
        const updateTimer = () => {
            const createdAt = new Date(gasData?.lastCronEntry?.createdAt);
            const now: any = new Date();

            const nextFetch: any = new Date(createdAt.getTime() + 3 * 60000); // 30 minutes in milliseconds
            const diff = nextFetch - now;

            if (diff > 0) {
                // Convert diff from milliseconds to minutes and seconds
                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);

                setNextFetchIn(
                    `Next Fetch in ${minutes}:${
                        seconds < 10 ? "0" : ""
                    }${seconds} mins`
                );
            } else {
                // Handle case where the next fetch time has passed
                setNextFetchIn("Fetching Current Price...");
                refetchAllGas();
            }
        };

        // Update the timer every second
        const timerId = setInterval(updateTimer, 1000);

        // Cleanup on component unmount
        return () => clearInterval(timerId);
    }, [gasData]);

    useEffect(() => {
        if (currentGasData) {
            refetchAllGas();
            toast({
                title: `Medium Gas Price: ${currentGasData.nAVAXPrice} (${currentGasData.usdPrice})`,
                description: moment(currentGasData.createdAt).format(
                    "dddd, MMMM DD, YYYY at hh:mm A"
                ),
            });
            setFetchCurrent(false);
        }
    }, [currentGasData]);
    return (
        <header className="h-20 w-full bg-[#0355BF] px-32 flex items-center justify-between">
            <div className="flex items-center space-x-8">
                <h2 className="text-md text-white font-semibold">
                    Medium Gas Prices
                </h2>
                <Separator className="h-8 w-[0.5px]" orientation="vertical" />
                <h2 className="text-md text-white font-semibold">
                    {nextFetchIn}
                </h2>
            </div>
            <div className="flex space-x-8">
                {fetchCurrent ? (
                    <h2 className="text-md text-white font-semibold">
                        Fetching Current Price...
                    </h2>
                ) : (
                    <Button
                        className="bg-white hover:bg-white text-[#0355BF] font-semibold"
                        onClick={() => {
                            setFetchCurrent(true);
                        }}
                    >
                        Fetch Current Price
                    </Button>
                )}
            </div>
        </header>
    );
};

export default Header;
