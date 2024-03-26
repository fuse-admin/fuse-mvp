import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archivo } from 'next/font/google';
import { DemoChatBoxProps } from "@/types";
import DemoDocFillerChat from "./DemoDocFillerChat";

const archivo = Archivo({ subsets: ["latin"] })



export default function DemoChatBox({ selectedTab, setSelectedTab}: DemoChatBoxProps) {
    const handleTabChange = (tabvalue: string) => {
        setSelectedTab(tabvalue);
    }
    return (
        <main className="w-full h-full justify-center items-center">
            <Tabs defaultValue={selectedTab} onValueChange={handleTabChange} className="w-4/5">
                <TabsList className="flex justify-between w-full h-12 rounded-xl">
                    <TabsTrigger className={`${archivo.className} text-lg`} value="document-filler">Document Filler</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-lg`} value="custom-reports">Custom Reporting</TabsTrigger>
                    <TabsTrigger className={`${archivo.className} text-lg`} value="query">Query</TabsTrigger>
                </TabsList>
                <TabsContent value="document-filler">
                    <DemoDocFillerChat />
                </TabsContent>
                <TabsContent value="custom-reports">
                    This is for custom reports.
                </TabsContent>
                <TabsContent value="query">
                    This is for querying responses.
                </TabsContent>
            </Tabs>
        </main>
    )
}