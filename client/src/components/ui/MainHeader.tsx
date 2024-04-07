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
            <div>
                <Button
                    variant="secondary"
                    className="text-xs text-gray-500 font-semibold mr-3"
                    onClick={() =>
                        window.open(
                            "https://github.com/vishal1thakur/rns.id",
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                >
                    Code
                    <OpenInNewIcon sx={{ fontSize: 12, ml: 0.5 }} />
                </Button>
                <Button
                    variant="secondary"
                    className="text-xs text-gray-500 font-semibold"
                    onClick={() =>
                        window.open(
                            "https://drive.google.com/file/d/1vkGPuikSYpEQhFpmibr1Q-meqMKwLjzU/view",
                            "_blank",
                            "noopener,noreferrer"
                        )
                    }
                >
                    Resume
                    <OpenInNewIcon sx={{ fontSize: 12, ml: 0.5 }} />
                </Button>
            </div>
        </header>
    );
};

export default MainHeader;
