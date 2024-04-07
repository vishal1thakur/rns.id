import logo from "../../assets/logo.svg";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { Button } from "./button";

const MainHeader = () => {
    return (
        <header className="flex justify-between items-center px-32 h-20">
            <div>
                <a
                    className="App-link"
                    href="https://rns.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
            </div>

            <Button
                variant="secondary"
                className="text-xs text-gray-500 font-semibold"
                onClick={() =>
                    window.open(
                        "https://google.com",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
            >
                Made By: Vishal Thakur
                <OpenInNewIcon sx={{ fontSize: 12, ml: 0.5 }} />
            </Button>
        </header>
    );
};

export default MainHeader;
