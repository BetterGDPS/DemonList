import { useEffect, useRef } from "react";
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { userApi } from "./api/user";

export function User() {
    const { user, isLoaded } = useUser();
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

    useEffect(() => {
        if (isLoaded && user && !hasSent.current) {
            sendUserDataToServer();
            hasSent.current = true;
        }
        if (!user) {
            hasSent.current = false;
        }
    }, [isLoaded, user]);

    const sendUserDataToServer = async () => {
        try {
            const userData = {
                id: user?.id,
                username: user?.username || undefined,
                email: user?.primaryEmailAddress?.emailAddress
            };

            // Отправляем данные пользователя
            const addResponse = await userApi.addUser(userData);
            if (addResponse.status === 200) {
                console.log('Данные пользователя успешно отправлены на сервер');
            } else {
                console.error('Ошибка при отправке данных на /account/add:', addResponse.statusText);
            }

            // Обновляем username если нужно
            if (user?.id && user?.username) {
                const updateResponse = await userApi.updateUsername(user.id, user.username);
                if (updateResponse.status === 200) {
                    console.log('Username успешно обновлен на сервере');
                } else {
                    console.error('Ошибка при обновлении username:', updateResponse.statusText);
                }
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
                    <span className="text-white hover:cursor-pointer hover:text-gray-300 mx-3 mb-2">Login</span>
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