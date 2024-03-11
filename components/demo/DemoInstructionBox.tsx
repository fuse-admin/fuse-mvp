"use client";
import { useEffect, useState } from "react";
import {
Carousel,
CarouselContent,
CarouselItem,
CarouselNext,
CarouselPrevious,
} from "@/components/ui/carousel"

import {
Card,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import DemoDocFillerCard from "./DemoDocFillerCard";
import { DemoInstructionBoxProps } from "@/types";
import { type CarouselApi } from "@/components/ui/carousel";
import DemoQueryCard from "./DemoQueryCard";
import DemoReportingCard from "./DemoReportingCard";





export default function InstructionBox({ selectedTab }: DemoInstructionBoxProps){
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;

        // Update the carousel's active item based on the selectedTab
        switch (selectedTab) {
            case "document-filler":
                api.scrollTo(0);
                break;
            case "query":
                api.scrollTo(1);
                break;
            case "reporting":
                api.scrollTo(2);
                break;
            default:
                break;
        }
    }, [api, selectedTab]);

    return (
        <main className="w-4/5 h-screen">
            <Carousel setApi={setApi} className="h-screen">
                <CarouselContent className="h-screen">
                    {/* Document Filler */}
                    <CarouselItem className="w-screen h-screen">
                        <div className="flex items-center justify-center h-full">
                            <Card className="w-screen h-full">
                                <CardContent className="h-full">
                                    <DemoDocFillerCard/>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    {/* Query */}
                    <CarouselItem className="w-screen h-screen">
                        <div className="flex items-center justify-center h-full">
                            <Card className="w-screen h-full">
                                <CardContent className="flex items-center justify-center h-full">
                                    <DemoQueryCard />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>

                    {/* Reporting */}
                    <CarouselItem className="w-screen h-screen">
                        <div className="flex items-center justify-center h-full">
                            <Card className="w-screen h-full">
                                <CardContent className="flex items-center justify-center h-full">
                                    <DemoReportingCard />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    )
}

