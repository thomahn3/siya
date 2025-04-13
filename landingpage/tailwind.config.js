
export const plugins = [require("tailwindcss-animate")];
export const theme = {
    extend: {
        keyframes: {
            "bg-position": {
                "0%": { backgroundPosition: "0% 50%" },
                "100%": { backgroundPosition: "100% 50%" },
            },
            "pop-blob": {
                "0%": { transform: "scale(1)" },
                "33%": { transform: "scale(1.2)" },
                "66%": { transform: "scale(0.8)" },
                "100%": { transform: "scale(1)" },
            },
            colors: {
                filter: {
                    "blur-20": "blur(20px)",
                    "blur-25": "blur(25px)",
                },
            },
            animation: {
                "pop-blob": "pop-blob 5s infinite",
            }
        },
    },
};
  