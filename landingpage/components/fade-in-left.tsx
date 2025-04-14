'use client';

import { motion } from "motion/react";

export default function FadeInLeft({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            className="flex flex-row items-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >∂
            {children}
        </motion.div>
    );
}