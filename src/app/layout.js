import "./globals.css";

export const metadata = {
    title: "Kho ứng dụng",
    description: "By Trần Phan Hải Long",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
