import { Button } from "@/components/ui/button"
import Link from "next/link"


interface ForgotPasswordButton {
    label: string
    href: string
    }

const ForgotPasswordButton = ({label, href}: ForgotPasswordButton) => {
  return (
    <Button variant="link" className="font-normal w-full" size='sm' asChild>
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}

export default ForgotPasswordButton