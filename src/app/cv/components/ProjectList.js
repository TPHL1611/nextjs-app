import {
    HighlightProjects,
    deprecatedProjects,
    privateProjects,
    themeProjects,
} from "@/data/projects";
import Link from "next/link";
import { PiShare } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

const iconStyle = "w-3 h-3";
const listStyle = "list-decimal mt-4";
const linkStyle =
    "flex gap-x-2 items-center tracking-wide w-fit duration-300 hover:text-amber-300 text-sm md:text-[15px]";
const olStyle = "pl-[5px] md:pl-5 ml-5";
const titleStyle = "mt-5 text-xl text-amber-300";

export function ProjectList() {
    return (
        <div className="w-full mt-3">
            <h4 className={titleStyle}>Dự án khách hàng</h4>
            <ol className={olStyle}>
                {HighlightProjects.map((HighlightProject) => (
                    <li key={HighlightProject.title} className={listStyle}>
                        <Link target="_blank" href={HighlightProject.url} className={linkStyle}>
                            {HighlightProject.title}
                            <PiShare className={iconStyle} />
                        </Link>
                    </li>
                ))}
            </ol>
            <h4 className={titleStyle}>Dự án giao diện mẫu</h4>
            <ol className={twMerge(olStyle, "mt-5")}>
                {themeProjects.map((themeProject) => (
                    <li key={themeProject.title} className={listStyle}>
                        <Link target="_blank" href={themeProject.url} className={linkStyle}>
                            {themeProject.title}
                            <PiShare className={iconStyle} />
                        </Link>
                    </li>
                ))}
            </ol>
            <h4 className={titleStyle}>Dự án đã ngừng hoạt động</h4>
            <ol className={twMerge(olStyle, "mt-5")}>
                {deprecatedProjects.map((deprecatedProject) => (
                    <li key={deprecatedProject.title} className={listStyle}>
                        <Link target="_blank" href={deprecatedProject.url} className={linkStyle}>
                            {deprecatedProject.title}
                            <IoClose className={twMerge(iconStyle, "text-red-500")} />
                        </Link>
                    </li>
                ))}
            </ol>
            <h4 className={titleStyle}>Dự án chưa được công khai</h4>
            <ol className={twMerge(olStyle, "mt-5")}>
                {privateProjects.map((privateProject) => (
                    <li key={privateProject.title} className={listStyle}>
                        <div className={linkStyle}>
                            {privateProject.title}
                            <RiGitRepositoryPrivateFill
                                className={twMerge(iconStyle, "text-amber-200")}
                            />
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}
