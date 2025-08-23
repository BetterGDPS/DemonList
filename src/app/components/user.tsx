import { useEffect, useRef } from "react";
import { SignedOut, SignInButton, UserButton, useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function User() {
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();
    const router = useRouter();
    const hasSent = useRef(false);

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

    // Эффект для отправки данных на сервер после регистрации/авторизации
    useEffect(() => {
        if (isLoaded && user && !hasSent.current) {
            sendUserDataToServer();
            hasSent.current = true;
        }
        if (!user) {
            hasSent.current = false; // сбрасываем при логауте
        }
    }, [isLoaded, user]);

    const sendUserDataToServer = async () => {
        try {
            const token = await getToken();
            const userData = {
                id: user?.id,
                username: user?.username,
                email: user?.primaryEmailAddress?.emailAddress
            };

            const response = await fetch('http://localhost:8001/account/add', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                console.log('Данные пользователя успешно отправлены на сервер');
            } else {
                console.error('Ошибка при отправке данных:', await response.text());
            }
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest("button, a")) return;
        if (!user?.username) return null;
        router.push(`/profile/${user.username}`);
    };

    return (
        <>
            <SignedOut>
                <SignInButton>
                    <span className="text-white hover:cursor-pointer hover:text-gray-300">Login</span>
                </SignInButton>
            </SignedOut>

            {user && (
                <div
                    className="flex items-center gap-1 text-white px-3 py-2 rounded-lg cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={handleClick}
                >
                    <UserButton />
                    <p className="ml-2">{user.username}</p>
                </div>
            )}
        </>
    );
}