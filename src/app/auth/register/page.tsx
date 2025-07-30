"use client";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLoginButton } from "@/features/auth/components/GoogleLoginButton";
import Link from "next/link";
import { showError, showSuccess } from "@/shared/utils/toast";

export default function RegisterPage() {
    const { t } = useTranslation();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return; // Prevent multiple submissions
        
        if (!fullName || !email || !password) {
            showError('Full name, email and password are required.');
            return;
        }
        setLoading(true);
        // register api connection
        setTimeout(() => {
            setLoading(false);
            showSuccess('Registration successful!');
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background to-[#10142a] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-tertiary/90 p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#23264a]"
            >
                <h2 className="text-3xl font-extrabold mb-2 text-center dark:text-white tracking-tight">
                    Create Account
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Join VolunChain today
                </p>
                <div className="space-y-4">
                  <Input
                      type="text"
                      name="fullName"
                      label={t("auth.fullName") || "Full Name"}
                      placeholder={t("auth.fullName") || "Full Name"}
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                  />
                  <Input
                      type="email"
                      name="email"
                      label={t("auth.email") || "Email address"}
                      placeholder={t("auth.email") || "Email address"}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                      type="password"
                      name="password"
                      label={t("auth.password") || "Password"}
                      placeholder={t("auth.password") || "Password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-6 mb-4 text-lg font-semibold"
                >
                    {loading ? t("common.loading") || "Loading..." : t("auth.register") || "Sign Up"}
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
                  {t("auth.alreadyHaveAccount") || "Already have an account?"} {" "}
                  <Link href="/auth/login" className="underline text-secondary font-semibold hover:text-blue-400 transition-colors">
                    {t("auth.login") || "Sign In"}
                  </Link>
                </p>
            </form>
        </div>
    );
}