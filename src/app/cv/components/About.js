export function About() {
    return (
        <>
            <div className="text-sm mt-6 flex flex-col gap-y-4">
                <div className="avatar h-[280px] w-[280px] md:h-[300px] md:w-[300px] mb-4">
                    <img
                        src="../avatar.jpg"
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <p>
                    <b>Họ tên</b>: Trần Phan Hải Long
                </p>
                <p>
                    <b>Ngày sinh</b>: 16/11/2000
                </p>
                <p>
                    <b>Quá trình làm việc</b>:
                </p>
                <ul className="ml-3 pl-[5px] md:pl-4">
                    <li className="list-disc mt-2">
                        <p className="flex flex-col md:flex-row gap-y-2.5 md:gay-y-0 md:gap-x-2">
                            <span>2018 - 2021:</span>
                            <span>Tốt nghiệp Đại học Tài chính - Marketing</span>
                        </p>
                        <p className="mt-2">(Ngành hệ thống thông tin kế toán)</p>
                    </li>
                    <li className="list-disc mt-3">
                        <p className="flex gap-x-2 flex-col md:flex-row">
                            <span>2021 - nay:</span>
                            <span>Công ty PutaDesign</span>
                        </p>
                        <p className="mt-2">Vị trí: Lập trình viên Wordpress</p>
                    </li>
                </ul>
            </div>
        </>
    );
}
