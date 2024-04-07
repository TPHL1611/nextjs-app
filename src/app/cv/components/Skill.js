"use client";
import { skills } from "@/data/skills";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect } from "react";

export function Skill() {
    useEffect(() => {
        AOS.init({
            duration: 750,
            offset: 75,
        });
        AOS.refresh();
    }, []);
    return (
        <div className="flex flex-wrap mt-5 gap-y-8 skill-list">
            {skills.map((skill) => (
                <Link
                    href={skill.url}
                    key={skill.id}
                    data-aos={"fade-up"}
                    className="w-1/2 md:w-1/3 px-4 flex items-center justify-center">
                    <p className="w-12 h-12 md:w-16 md:h-16 duration-300">{skill.icon}</p>
                </Link>
            ))}
        </div>
    );
}
