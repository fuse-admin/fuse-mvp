import Image from "next/image";

export default function ReportingChat() {
    return (
        <main className="w-full h-screen flex flex-col gap-10">
            <div className="text-center mt-36">
                <h1 className="text-3xl text-red-500 font-extrabold">Coming soon...</h1>
            </div>
            <div className="text-center">
                <Image 
                    src="/assets/images/coming-soon.svg"
                    alt="Coming soon"
                    loading="eager" 
                    width={500} 
                    height={500} 
                />
            </div>
        </main>
    )
}