"use client";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import Link from "next/link";

type UserType = "volunteer" | "foundation" | "";

export default function SignupPage() {
    const { t } = useTranslation();
    const [userType, setUserType] = useState<UserType>("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!userType || !email || !password || !name) {
            import('@/shared/utils/toast').then(({ showError }) => {
                showError('Please fill in all required fields.');
            });
            return;
        }

        setLoading(true);
        
        // Signup API connection
        setTimeout(() => {
            setLoading(false);
            import('@/shared/utils/toast').then(({ showSuccess }) => {
                showSuccess('Account created successfully!');
            });
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-[#10142a] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-tertiary/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#23264a]"
            >
                <h2 className="text-3xl font-extrabold mb-8 text-center dark:text-white tracking-tight">
                    {t("auth.register")}
                </h2>

                <div className="space-y-4">
                    <Select
                        label={t("auth.userType") || "I am registering as a..."}
                        options={[
                            { value: "volunteer", label: t("auth.volunteer") || "Volunteer" },
                            { value: "foundation", label: t("auth.foundation") || "Foundation" }
                        ]}
                        value={userType}
                        onChange={e => setUserType(e.target.value as UserType)}
                        placeholder={t("auth.selectRole") || "Select your role"}
                    />

                    <Input
                        type="text"
                        name="name"
                        label={t("auth.fullName") || "Full Name *"}
                        placeholder={t("auth.enterFullName") || "Enter your full name"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <Input
                        type="email"
                        name="email"
                        label={t("auth.email")}
                        placeholder={t("auth.enterEmail") || "Enter your email"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Input
                        type="password"
                        name="password"
                        label={t("auth.password")}
                        placeholder={t("auth.createPassword") || "Create a password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-6 mb-4 text-lg font-semibold"
                    disabled={loading}
                >
                    {loading ? t("common.loading") : t("auth.register")}
                </Button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-700" />
                    <span className="mx-4 text-gray-400 font-medium">{t("common.or") || "or"}</span>
                    <div className="flex-grow border-t border-gray-700" />
                </div>

                <GoogleLoginButton />

                <p className="text-center text-base mt-6 text-gray-300">
                    {t("auth.alreadyHaveAccount") || "Already have an account?"}{" "}
                    <Link href="/login" className="underline text-secondary font-semibold hover:text-blue-400 transition-colors">
                        {t("auth.login") || "Sign In"}
                    </Link>
                </p>
            </form>
        </div>
    );
}
