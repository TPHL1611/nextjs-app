import { homeData } from "@/data/homData";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="h-screen bg-[#202020] flex items-center justify-center font-jet-regular">
            <div className="flex flex-wrap max-w-[500px] gap-x-4 gap-y-6">
                <h1 className="text-center w-full">Chào mừng bạn đến với kho lưu trữ ứng dụng,</h1>
                <h2 className="text-center w-full -mt-4">Phát triển bởi Trần Phan Hải Long</h2>
                {homeData.map((data) => (
                    <Link
                        href={`/${data.url}`}
                        key={data.id}
                        className="rounded-xl border border-white-800 px-3 text-sm py-5 text-center w-full md:w-[48%] shadow-md shadow-[#ffffff1c] hover:shadow-lg hover:shadow-[#ffffff3d] duration-500 hover:-translate-y-1">
                        <p className="flex flex-col justify-center gap-y-1">
                            <span>{data.title}</span>
                            {data.isDevelop && <span className="text-xs">(Đang phát triển)</span>}
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
