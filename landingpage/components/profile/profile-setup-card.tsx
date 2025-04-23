'use client'

import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
  } from "@/components/ui/card";
import { createProfileSetupData } from "@/lib/data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useActionState } from "react";

interface ProfileSetupCardProps {
    email: string;
    name: string;
}

export default function ProfileSetupCard({ email, name }: ProfileSetupCardProps) {
    const initialState = { errors: {}, message: null };
    const [formState, dispatch] = useActionState(createProfileSetupData, initialState);

    return (
        <Card className="h-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Profile Setup</CardTitle>
                <CardDescription>
                    Please fill in your details
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <form 
                        className="space-y-4"
                        action={dispatch}>
                        <div className='grid gap-2'>
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                name="name"
                                placeholder="Name"
                                type="text"
                                defaultValue={name || ""}
                            />
                            {formState?.errors?.name &&
                        formState.errors.name.map((error: string) => (
                            <p className="  text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                name="email"
                                type="email"
                                defaultValue={email}
                                readOnly
                                autoComplete="email"
                                className="text-gray-500"
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="phone">Mobile Number</Label>
                            <Input
                                name="phone"
                                placeholder="Phone"
                                type="text"
                                autoComplete="tel"
                            />
                            {formState?.errors?.phone &&
                        formState.errors.phone.map((error: string) => (
                            <p className="  text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="postcode">Postcode</Label>
                            <Input 
                                name="postcode"
                                placeholder="Postcode"
                                type="text"
                                autoComplete="postal-code"
                            />
                            {formState?.errors?.postcode &&
                        formState.errors.postcode.map((error: string) => (
                            <p className="  text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="abn">ABN (If Applicable)</Label>
                            <Input
                                name="abn"
                                placeholder="ABN"
                                type="text"
                                autoComplete="abn"
                            />
                            {formState?.errors?.abn &&
                        formState.errors.abn.map((error: string) => (
                            <p className="text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="appUseType">Why are you signing up?</Label>
                            <Select name="appUseType">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Entity Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="offer">Offer services</SelectItem>
                                    <SelectItem value="request">Request services</SelectItem>
                                </SelectContent>
                            </Select>
                            {formState?.errors?.appUseType &&
                        formState.errors.appUseType.map((error: string) => (
                            <p className="  text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor="entityType">Using this personally or for business?</Label>
                            <Select name="entityType">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Entity Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="personal">Personal</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                            </Select>
                            {formState?.errors?.entityType &&
                        formState.errors.entityType.map((error: string) => (
                            <p className="  text-sm text-red-500" key={error}>
                            {error}
                            </p>
                        ))}
                        </div>
                        <Button type="submit" className="w-full   cursor-pointer">
                            Submit
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}