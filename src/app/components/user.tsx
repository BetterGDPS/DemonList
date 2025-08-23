import { useEffect } from "react";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function User() {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("cl-internal-13hl4in")) {
                window.open("https://id.qual.su", "_blank");
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    return (
        <>
            <UserButton />
            <SignedOut>
                <SignInButton>
                    <a className="text-white hover:cursor-pointer hover:text-gray-300" href="/auth/sign-in">Login</a>
                </SignInButton>
            </SignedOut>
        </>
    );
}