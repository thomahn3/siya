import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Session } from "next-auth";
import { z } from "zod";
import { userDataSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label'

interface ProfileCardProps {
    session: Session;
    data: z.infer<typeof userDataSchema>;
}

export default function ProfileCard({ session, data }: ProfileCardProps) {
    return (
        <Card className="max-w-md mx-auto shadow-md">
            <CardHeader>
                <CardTitle className="text-[32px]">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label className="">Name</Label>
                        <Input
                            name="Name"
                            type="name"
                            defaultValue={data.name}
                            readOnly
                            required
                            autoComplete="name"
                            className="text-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            name="Email"
                            type="email"
                            defaultValue={data.email}
                            readOnly
                            required
                            autoComplete="email"
                            className="text-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Phone</Label>
                        <Input
                            name="Phone"
                            type="tel"
                            defaultValue={data.phone}
                            readOnly
                            required
                            autoComplete="tel"
                            className="text-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Postcode</Label>
                        <Input
                            name="Postcode"
                            type="text"
                            defaultValue={data.postcode}
                            readOnly
                            required
                            autoComplete="postal-code"
                            className="text-gray-500"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>ABN</Label>
                        <Input
                            name="ABN"
                            type="text"
                            defaultValue={data.abn || ""}
                            readOnly
                            required
                            className="text-gray-500"
                        />
                    </div>
                    <p><strong>App Use Type:</strong> {(data.appUseType).replace(/(\w)(\w*)/g,
                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</p>
                    <p><strong>Entity Type:</strong> {(data.entityType).replace(/(\w)(\w*)/g,
                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</p>
                </div>
            </CardContent>
            <CardFooter>
                <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
            </CardFooter>
        </Card>
    );
}