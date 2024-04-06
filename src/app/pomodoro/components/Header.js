import Link from "next/link";
import { faGear, faUserClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function Header({ onSettingClick }) {
    return (
        <div className="flex justify-between items-center w-full">
            <Link href="/" className="text-xl flex items-center text-white no-underline">
                <FontAwesomeIcon icon={faUserClock} className="w-5 h-5 mr-2" />
                <span>Daily Focus</span>
            </Link>
            <FontAwesomeIcon
                onClick={onSettingClick}
                icon={faGear}
                className="w-6 h-6 text-white cursor-pointer"
            />
        </div>
    );
}
