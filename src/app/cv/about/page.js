import { HistoryCommand } from "../components/HistoryCommand";
import { PrefixCommand } from "../components/PrefixCommand";
import { About } from "../components/About";
import { SuggestCommand } from "../components/SuggestCommand";

export default function AboutPage() {
    return (
        <>
            <SuggestCommand />
            <HistoryCommand />
        </>
    );
}
