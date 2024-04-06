import { TiHtml5 } from "react-icons/ti";
import { IoLogoCss3 } from "react-icons/io5";
import { RiJavascriptFill } from "react-icons/ri";
import { GrReactjs } from "react-icons/gr";
import { TbBrandNextjs } from "react-icons/tb";
import { SiTailwindcss } from "react-icons/si";
import { FaWordpress, FaPhp } from "react-icons/fa";

const skillSize = "w-full h-full duration-300 hover:fill-amber-300";

export const skills = [
    {
        id: 1,
        icon: <TiHtml5 className={skillSize} style={{ "--color": "#e4542d" }} />,
        title: "HTML",
        url: "https://www.w3schools.com/html/html_intro.asp",
    },
    {
        id: 2,
        icon: <IoLogoCss3 className={skillSize} style={{ "--color": "#1d81c0" }} />,
        title: "CSS",
        url: "https://www.w3schools.com/css/default.asp",
    },
    {
        id: 3,
        icon: <RiJavascriptFill className={skillSize} style={{ "--color": "#f7e025" }} />,
        title: "Javascript",
        url: "https://www.w3schools.com/js/default.asp",
    },
    {
        id: 4,
        icon: <GrReactjs className={skillSize} style={{ "--color": "#58c3df" }} />,
        title: "ReactJS",
        url: "https://react.dev/",
    },
    {
        id: 5,
        icon: <TbBrandNextjs className={skillSize} />,
        title: "NextJS",
        url: "https://nextjs.org/docs",
    },
    {
        id: 6,
        icon: <SiTailwindcss className={skillSize} style={{ "--color": "#1fb9bd" }} />,
        title: "TailwindCSS",
        url: "https://tailwindcss.com/docs/installation",
    },
    {
        id: 7,
        icon: <FaWordpress className={skillSize} style={{ "--color": "#28799e" }} />,
        title: "Wordpress",
        url: "https://wordpress.org/documentation/",
    },
    {
        id: 8,
        icon: <FaPhp className={skillSize} style={{ "--color": "#7b7fb5" }} />,
        title: "PHP",
        url: "https://www.php.net/docs.php",
    },
];
