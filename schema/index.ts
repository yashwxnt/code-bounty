import * as z from 'zod';

// Password validation regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// List of common passwords to avoid
const commonPasswords = ['123456', 'password', '12345678', 'qwerty', 'abc123'];

// List of reserved usernames
const reservedUsernames = ['admin', 'user', 'test'];

// Whitelist of allowed email domains
const allowedDomains = ['gmail.com', 'test.com'];

// Function to check for keyboard patterns
const isKeyboardPattern = (password: string | string[]) => {
    const keyboardPatterns = [
        '123456', 'abcdef', 'qwerty', 'asdfgh', 'zxcvbn'
    ];
    return keyboardPatterns.some(pattern => password.includes(pattern));
};

// Register Schema
export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Please enter your username"
    }).max(30, {
        message: "Username must be at most 30 characters long"
    }).regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores"
    }).refine(value => !reservedUsernames.includes(value), {
        message: "This username is reserved, please choose a different one"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }).refine(value => {
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
    }, {
        message: "Email domain is not allowed, please use an allowed domain"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(128, {
        message: "Password must be at most 128 characters long"
    }).refine(value => passwordRegex.test(value), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }).refine(value => !commonPasswords.includes(value), {
        message: "Password is too common, please choose a different one"
    }).refine(value => !isKeyboardPattern(value), {
        message: "Password is too simple, please avoid keyboard patterns"
    }),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }),
    otp: z.string().length(6, {
        message: "OTP must be 6 characters long"
    }).regex(/^\d+$/, {
        message: "OTP must contain only numbers"
    }).refine(value => parseInt(value, 10) >= 100000 && parseInt(value, 10) <= 999999, {
        message: "OTP must be between 100000 and 999999"
    })
});

// Request OTP Schema
export const RequestOtpSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }).refine(value => {
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
    }, {
        message: "Email domain is not allowed, please use an allowed domain"
    })
});

// Verify OTP Schema
export const VerifyOtpSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }).refine(value => {
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
    }, {
        message: "Email domain is not allowed, please use an allowed domain"
    }),
    otp: z.string().length(6, {
        message: "OTP must be 6 characters long"
    }).regex(/^\d+$/, {
        message: "OTP must contain only numbers"
    }).refine(value => parseInt(value, 10) >= 100000 && parseInt(value, 10) <= 999999, {
        message: "OTP must be between 100000 and 999999"
    })
});

// Forgot Password Schema
export const ForgotPasswordSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    otp: z.string().length(6, {
      message: "OTP must be 6 characters long",
    }).regex(/^\d+$/, {
      message: "OTP must contain only numbers",
    }).refine(value => parseInt(value, 10) >= 100000 && parseInt(value, 10) <= 999999, {
      message: "OTP must be between 100000 and 999999",
    }),
    NewPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }).max(128, {
      message: "Password must be at most 128 characters long",
    }).refine(value => passwordRegex.test(value), {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }).refine(value => !commonPasswords.includes(value), {
      message: "Password is too common, please choose a different one",
    }).refine(value => !isKeyboardPattern(value), {
      message: "Password is too simple, please avoid keyboard patterns",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }).refine((value: any, ctx: { parent: { NewPassword: any; }; }) => {
      if (value !== ctx.parent.NewPassword) {
        return false;
      }
      return true;
    }, {
      message: "Passwords do not match",
    }),
  });
  
// Register Schema Without OTP
export const RegisterSchemaWithoutOtp = z.object({
    username: z.string().min(1, {
      message: "Please enter your username"
    }).max(30, {
      message: "Username must be at most 30 characters long"
    }).regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores"
    }).refine(value => !reservedUsernames.includes(value), {
      message: "This username is reserved, please choose a different one"
    }),
    email: z.string().email({
      message: "Please enter a valid email address"
    }).refine(value => {
      const domain = value.split('@')[1];
      return allowedDomains.includes(domain);
    }, {
      message: "Email domain is not allowed, please use an allowed domain"
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long"
    }).max(128, {
      message: "Password must be at most 128 characters long"
    }).refine(value => passwordRegex.test(value), {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }).refine(value => !commonPasswords.includes(value), {
      message: "Password is too common, please choose a different one"
    }).refine(value => !isKeyboardPattern(value), {
      message: "Password is too simple, please avoid keyboard patterns"
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long"
    })
  });
  
// Login Schema
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }).refine(value => {
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
    }, {
        message: "Email domain is not allowed, please use an allowed domain"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    }).max(128, {
        message: "Password must be at most 128 characters long"
    }).refine(value => passwordRegex.test(value), {
        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }).refine(value => !commonPasswords.includes(value), {
        message: "Password is too common, please choose a different one"
    }).refine(value => !isKeyboardPattern(value), {
        message: "Password is too simple, please avoid keyboard patterns"
    })
});

