import { HistoryCommand } from "../components/HistoryCommand";
import { SuggestCommand } from "../components/SuggestCommand";

export default function SkillPage() {
    return (
        <>
            <SuggestCommand />
            <HistoryCommand />
        </>
    );
}
