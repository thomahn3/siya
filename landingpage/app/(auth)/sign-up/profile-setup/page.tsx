import React from 'react';
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import clsx from "clsx";
import { redirect } from "next/navigation";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from '@/components/ui/logo';
import { Label } from '@radix-ui/react-label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

const Page = async () => {

    const session = await auth();
    if (session) {
        var email = session.user?.email;
        var name = session.user?.name;
    } else {
        redirect("/sign-up");
    }

// Name
// Email
// Phone
// Suburb
// ABN
// Make money or Make posts
// Personal or Business

return (
    <>
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Logo />
                <Card className="h-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Profile Setup</CardTitle>
                        <CardDescription>
                            Please fill in your details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <form className="space-y-4">
                                <div className='grid gap-2'>
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                    defaultValue={name || ""}
                                    required
                                />
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    defaultValue={email || ""}
                                    readOnly={!!email}
                                    required
                                    autoComplete="email"
                                    className={clsx(email ? "text-gray-500" : "text-black")}
                                />
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="phone">Mobile Number</Label>
                                <Input
                                    name="phone"
                                    placeholder="Phone"
                                    type="text"
                                    required
                                    autoComplete="tel"
                                    pattern="\d{10}"
                                    title="Phone number must be a 10-digits"
                                />
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="postcode">PostCode</Label>
                                <Input 
                                    name="postcode"
                                    placeholder="Postcode"
                                    type="text"
                                    pattern="\d{4}"
                                    title="Postcode must be 4 digits"
                                    autoComplete="postal-code"
                                    required
                                />
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="suburb">ABN (If Applicable)</Label>
                                <Input
                                    name="abn"
                                    placeholder="ABN"
                                    type="text"
                                    pattern="\d{11}"
                                    title="ABN must be 11 digits"
                                    required
                                    autoComplete="abn"
                                />
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="moneyOrPosts">Why are you signing up?</Label>
                                <Select required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Entiy Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Offer services</SelectItem>
                                        <SelectItem value="business">Request services</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                <div className='grid gap-2'>
                                <Label htmlFor="personalOrBusiness">Personal or Business</Label>
                                <Select required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Entiy Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal</SelectItem>
                                        <SelectItem value="business">Business</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                <Button type="submit" className="w-full mt-2">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    </>
)
}

export default Page;