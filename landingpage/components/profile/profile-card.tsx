'use client';

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from "../ui/button";
import { Pencil, Save } from "lucide-react";
import { SignOut } from "../auth/sign-out";
import { updateUserProfileData } from "@/lib/data";
import { Session } from "next-auth";
import { updateProfileSchema } from "@/lib/schema";

interface ProfileCardProps {
    data: any;
    session: Session | null;  
}

export default function ProfileCard({ data, session }: ProfileCardProps) {
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode
    const [errorLog, setErrorLog] = useState<any>(null); // State to store errors
    const [lastUpdated, setLastUpdated] = useState<string>("Loading..."); // State for timestamp

    useEffect(() => {
        const fetchTimestamp = () => {
            const now = new Date();
            setLastUpdated(now.toLocaleString()); // Format timestamp as a readable string
        };
        fetchTimestamp();
    }, []); // Run only once when the component mounts

    async function verifyData(formData: FormData) {
        if (session) {
            const id = session?.user?.id;
            const email = formData.get("email");
            const name = formData.get("name");
            const phone = formData.get("phone");
            const postcode = formData.get("postcode");
            const abn = formData.get("abn");

            console.log({ id, email, name, phone, postcode, abn });
            const validatedData = updateProfileSchema.safeParse({ id, email, name, phone, postcode, abn });
            console.log("validatedData", validatedData);

            if (!validatedData.success) {
                console.log("Validation errors", validatedData.error.flatten().fieldErrors);
                setErrorLog({ errors: validatedData.error.flatten().fieldErrors, message: 'Please input the correct information' });
            } else {
                const result = await updateUserProfileData(validatedData.data);
                setErrorLog(null); // Clear errors on successful update
                setIsEditing(false); // Exit editing mode after successful update
            }
        }
    }

    return (
        <Card className="max-w-md mx-auto shadow-md">
            <CardHeader>
                <CardTitle className="text-[32px]">Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        verifyData(formData);
                    }}
                >
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input
                                name="name"
                                type="text"
                                defaultValue={data.name}
                                readOnly={!isEditing}
                                autoComplete="name"
                                className={isEditing ? "" : "text-gray-500"}
                            />
                            {errorLog?.errors?.name?.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input
                                name="email"
                                type="email"
                                defaultValue={data.email}
                                readOnly
                                autoComplete="email"
                                className="text-gray-500"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input
                                name="phone"
                                type="tel"
                                defaultValue={data.phone}
                                readOnly={!isEditing}
                                autoComplete="tel"
                                className={isEditing ? "" : "text-gray-500"}
                            />
                            {errorLog?.errors?.phone?.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <Label>Postcode</Label>
                            <Input
                                name="postcode"
                                type="text"
                                defaultValue={data.postcode}
                                readOnly={!isEditing}
                                autoComplete="postal-code"
                                className={isEditing ? "" : "text-gray-500"}
                            />
                            {errorLog?.errors?.postcode?.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <Label>ABN</Label>
                            <Input
                                name="abn"
                                type="text"
                                defaultValue={data.abn}
                                readOnly={!isEditing}
                                className={isEditing ? "" : "text-gray-500"}
                            />
                            {errorLog?.errors?.abn?.map((error: string) => (
                                <p className="text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))}
                        </div>
                        <div className="grid gap-2">
                            <p><strong>Use Type:</strong> {data.appUseType === "request" ? "Use services" : "Offer services"} & {data.entityType === "personal" ? "use personally" : "use for business"}</p>
                        </div>
                        {isEditing && (
                            <Button
                                variant="secondary"
                                className="cursor-pointer"
                                type="submit"
                            >
                                <Save className="w-6" /> Save
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex flex-row items-center justify-between w-full">
                    <span className="text-sm text-gray-500">
                        Last updated: {lastUpdated}
                    </span>
                    <div className="flex gap-2 ml-auto">
                        {!isEditing && (
                            <Button
                                variant="secondary"
                                className="cursor-pointer"
                                type="button"
                                onClick={() => setIsEditing(true)} // Enable editing mode
                            >
                                <Pencil className="w-6" />
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