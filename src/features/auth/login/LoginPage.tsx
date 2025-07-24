"use client";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import Link from "next/link";

export default function LoginPage() {
    const { t } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            import('@/shared/utils/toast').then(({ showError }) => {
                showError('Email and password are required.');
            });
            return;
        }
        setLoading(true);
        // login api connection
        setTimeout(() => {
            setLoading(false);
            import('@/shared/utils/toast').then(({ showSuccess }) => {
                showSuccess('Login successful!');
            });
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-[#10142a] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-tertiary/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#23264a]"
            >
                <h2 className="text-3xl font-extrabold mb-2 text-center dark:text-white tracking-tight">
                    Welcome Back
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Login to your VolunChain account
                </p>
                <div className="space-y-4">
                  <Input
                      type="email"
                      name="email"
                      label={t("auth.email")}
                      placeholder={t("auth.email")}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                      type="password"
                      name="password"
                      label={t("auth.password")}
                      placeholder={t("auth.password")}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                  <div className="flex items-center justify-between">
                    <Input
                        type="checkbox"
                        name="rememberMe"
                        label={t("auth.rememberMe")}
                        checked={rememberMe}
                        onChange={e => setRememberMe(e.target.checked)}
                        className="mb-0"
                    />
                    <Link href="/forgot-password" className="text-sm text-secondary hover:underline">
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-6 mb-4 text-lg font-semibold"
                    disabled={loading}
                >
                    {loading ? t("common.loading") : t("auth.login")}
                </Button>
                <div className="flex items-center my-6">
                  <div className="flex-grow border-t border-gray-700" />
                  <span className="mx-4 text-gray-400 font-medium">{t("common.or") || "or"}</span>
                  <div className="flex-grow border-t border-gray-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <GoogleLoginButton />
                </div>
                <p className="text-center text-base mt-8 text-gray-300">
                  {t("auth.dontHaveAccount") || "Don't have an account?"} {" "}
                  <Link href="/signup" className="underline text-secondary font-semibold hover:text-blue-400 transition-colors">
                    {t("auth.register") || "Sign Up"}
                  </Link>
                </p>
            </form>
        </div>
    );
} 