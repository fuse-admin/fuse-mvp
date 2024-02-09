import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archivo } from 'next/font/google';
import ReportingChat from "./ReportingChat";
import { AiChatBoxProps } from "@/types";
import DocumentFillerChat from "./DocumentFillerChat";

const archivo = Archivo({ subsets: ["latin"] })



export default function AiChatBox({ selectedTab, setSelectedTab}: AiChatBoxProps) {
    const handleTabChange = (tabvalue: string) => {
        setSelectedTab(tabvalue);
    }
    return (
        <main className="w-full h-full justify-center items-center">
            <Tabs defaultValue={selectedTab} onValueChange={handleTabChange} className="w-[600px]">
                <TabsList className="flex justify-between w-full h-12 rounded-xl">
                    <TabsTrigger className={`${archivo.className} text-lg`} value="document-filler">Document Filler</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-lg`} value="query">Query</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-lg`} value="reporting">Reporting</TabsTrigger>
                </TabsList>
                <TabsContent value="document-filler">
                    <DocumentFillerChat />
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