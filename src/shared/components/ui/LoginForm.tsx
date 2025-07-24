"use client";

import { cn } from "@/shared/utils/utils";
import Card from "@/shared/components/ui/Card";
import CardContent from "@/shared/components/ui/CardContent";
import Button from "@/shared/components/ui/Button";
import { Wallet, Fingerprint } from "lucide-react";
import { useWallet } from "@/shared/hooks/useWallet"; // This is a placeholder for the wallet connection logic

export function LoginForm({
    className,
    ...props
  }: React.ComponentProps<"div">) {
    const { handleConnect } = useWallet();

    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Volunchain account
                  </p>
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full shadow-md" 
                    aria-label="Login with Wallet" 
                    onClick={handleConnect}>
                    <Wallet className="mr-2 h-6 w-6" />
                    <span>Login with Wallet</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="w-full shadow-md" 
                    aria-label="Login with Passkey">
                    <Fingerprint className="mr-2 h-6 w-6" />
                    <span>Login with Passkey</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
            <div className="bg-muted relative hidden md:flex md:items-center md:justify-center">
              <img
                src="/logo_vc.svg"
                alt="Volunchain Logo"
                className="h-24 w-auto object-contain"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    )
  }