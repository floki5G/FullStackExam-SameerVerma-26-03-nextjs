import { ACCOUNT_ACCESS_TOKEN } from "@/constant";
import Cookies from "js-cookie";
const getAccessToken = async () => {
    if (typeof window !== "undefined") {
        console.log("Client-side");

        return Cookies.get(ACCOUNT_ACCESS_TOKEN) || null; // Client-side
    } else {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { cookies } = require("next/headers");

        const requestHeaders = await cookies(); // Server
        return requestHeaders.get(ACCOUNT_ACCESS_TOKEN)?.value || null;
    }
};

export default getAccessToken;