'use client';

import { motion } from "motion/react";
import React from "react";

interface FadeInLeftProps {
    delay: number;
    children: React.ReactNode;
}

export default function FadeInLeft({ delay, children }: FadeInLeftProps) {
    return (
        <motion.div
            className="flex flex-row items-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: delay }}
        >
            {children}
        </motion.div>
    );
}