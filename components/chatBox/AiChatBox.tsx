import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archivo } from 'next/font/google';
import ReportingChat from "./ReportingChat";

const archivo = Archivo({ subsets: ["latin"] })

export default function AiChatBox() {
    return (
        <main className="w-full h-screen">
            <Tabs defaultValue="document-filler" className="w-[600px]">
                <TabsList className="flex justify-between w-full h-12 rounded-xl">
                    <TabsTrigger className={`${archivo.className} text-xl`} value="document-filler">Document Filler</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-xl`} value="query">Query</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-xl`} value="reporting">Reporting</TabsTrigger>
                </TabsList>
                <TabsContent value="document-filler">
                    This is for filling out documents.
                </TabsContent>
                <TabsContent value="query">
                    This is for querying responses.
                </TabsContent>
                <TabsContent value="reporting">
                    <ReportingChat />
                </TabsContent>
            </Tabs>
        </main>
    )
}