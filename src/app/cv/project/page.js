import { HistoryCommand } from "../components/HistoryCommand";
import { SuggestCommand } from "../components/SuggestCommand";

export default function ProjectPage() {
    return (
        <div>
            <SuggestCommand />
            <HistoryCommand />
        </div>
    );
}
