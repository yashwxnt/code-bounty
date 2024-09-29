'use client';

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import AuthHeader from "./auth-header";
import BackButton from "./back-button";
import ForgotPassword from "./forgotpasswordbutton";

interface CardWrapperProps {
    label: string;
    title: string;
    backButtonHref?: string;
    backButtonLabel?: string;
    forgotPasswordHref?: string;
    forgotPasswordLabel?: string;
    children: React.ReactNode;
}

const CardWrapper = ({
    label,
    title,
    backButtonHref,
    backButtonLabel,
    forgotPasswordHref,
    forgotPasswordLabel,
    children,
}: CardWrapperProps) => {
    return (
        <Card className="xl:w-3/5 md:w-1/2 shadow-md bg-slate-200/20 backdrop-blur-sm border-none">
            <CardHeader>
                <AuthHeader label={label} title={title} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {backButtonHref && backButtonLabel && (
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                )}
                {forgotPasswordHref && forgotPasswordLabel && (
                    <ForgotPassword label={forgotPasswordLabel} href={forgotPasswordHref} />
                )}
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;