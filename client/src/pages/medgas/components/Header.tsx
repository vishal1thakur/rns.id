import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";
import { CircularLoader } from "@/components/ui/CircularProgress";

const Header = ({ gasData, refetchAllGas, gasLoading }: any) => {
    const { toast } = useToast();
    const [nextFetchIn, setNextFetchIn] = useState("");
    const [fetchCurrent, setFetchCurrent] = useState(false);
    const { data: currentGasData } = useQuery({
        queryKey: ["currentGasData"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_DEV_URL}/medgas/fetchCurrent`).then(
                (res) => res.json()
            ),
        enabled: fetchCurrent && import.meta.env.ENVIRONMENT === "DEV",
    });

    useEffect(() => {
        const updateTimer = () => {
            const createdAt = new Date(gasData?.lastCronEntry?.createdAt);
            const now: any = new Date();

            const nextFetch: any = new Date(createdAt.getTime() + 30 * 60000); // 30 minutes in milliseconds
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
                // Adding case for when the server is started with the client, in this case the first cron job will take 30 mins, so it will show Waiting For Server...
                setNextFetchIn(
                    diff < 0 && diff > -1000
                        ? "Fetching Current Price..."
                        : "Waiting For Server..."
                );
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
                {gasLoading ? (
                    <CircularLoader.spinner className="h-4 w-4 animate-spin text-white" />
                ) : (
                    <h2 className="text-md text-white font-semibold">
                        {nextFetchIn}
                    </h2>
                )}
            </div>
            {import.meta.env.VITE_ENVIRONMENT === "DEV" && (
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
            )}
        </header>
    );
};

export default Header;
