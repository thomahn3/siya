'use client';

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Session } from "next-auth";
import { z } from "zod";
import { userDataSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label'
import { Button } from "../ui/button";
import { Pencil, Save } from "lucide-react";
import { SignOut } from "../auth/sign-out";

interface ProfileCardProps {
    session: Session;
    data: z.infer<typeof userDataSchema>;
}

export default function ProfileCard({ session, data }: ProfileCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: data.name,
        phone: data.phone,
        postcode: data.postcode,
        abn: data.abn || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        // Call a function to update the database with formData
        console.log("Saving data:", formData);
        setIsEditing(false);
    };

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
                            name="name"
                            type="text"
                            value={formData.name}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                            required
                            autoComplete="name"
                            className={isEditing ? "" : "text-gray-500"}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input
                            name="email"
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
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                            required
                            autoComplete="tel"
                            className={isEditing ? "" : "text-gray-500"}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Postcode</Label>
                        <Input
                            name="postcode"
                            type="text"
                            value={formData.postcode}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                            required
                            autoComplete="postal-code"
                            className={isEditing ? "" : "text-gray-500"}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>ABN</Label>
                        <Input
                            name="abn"
                            type="text"
                            value={formData.abn}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                            required
                            className={isEditing ? "" : "text-gray-500"}
                        />
                    </div>
                    <p><strong>App Use Type:</strong> {(data.appUseType).replace(/(\w)(\w*)/g,
                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</p>
                    <p><strong>Entity Type:</strong> {(data.entityType).replace(/(\w)(\w*)/g,
                        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();})}</p>
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
                    <div className="flex gap-2 ml-auto">
                        {isEditing ? (
                            <Button variant="secondary" className="cursor-pointer" onClick={handleSave}>
                                <Save className="w-6"/> Save
                            </Button>
                        ) : (
                            <Button variant="secondary" className="cursor-pointer" onClick={() => setIsEditing(true)}>
                                <Pencil className="w-6"/>
                                Edit
                            </Button>
                        )}
                        <SignOut />
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}