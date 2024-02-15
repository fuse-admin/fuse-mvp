import { Archivo } from "next/font/google";
import Image from "next/image";

const archivo = Archivo({ subsets: ["latin"] });

const DocumentDataSuccess = () => {
    return (
    <div className='flex flex-col gap-5 min-h-screen'>
        <h3 className={`${archivo.className} text-2xl text-green-500 font-bold text-center`}>Document Successfully Trained</h3>
        <div className="flex justify-center items-center"> {/* Centering wrapper for the image */}
            <Image src='/assets/images/party.svg' alt='Success' width={500} height={500} />
        </div>
        <p className="text-center text-lg mb-10">Your document training is complete! You can close the popup now</p>
    </div>
    )
}

export default DocumentDataSuccess;
