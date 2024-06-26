import {useRouter} from "next/navigation";
import React, {useEffect, useState, useTransition} from "react";
import axios from "axios";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/img/pngwinggoogleLogo.png";
import '@/app/pagesStyle.css'
import {LoginSchema} from "@/types/authSchemas";
import {FormError} from "@/components/auth/FormError";
import {FormSuccess} from "@/components/auth/FormSuccess";
import {signIn} from "next-auth/react"
import {ensureLeadingSlash} from "next/dist/shared/lib/page-path/ensure-leading-slash";
import {DEFAULT_USER_LOGIN_REDIRECT} from "@/routes";
import {useSearchParams} from "next/navigation";
import {OrderProvider, useOrderContext} from "@/orderContext/store";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {useCurrentRole} from "@/hooks/useCurrentRole";
import {currentUser} from "@/lib/auth";

export const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
        ? "Этот адрес электронной почты уже занят, если он ваш, попробуйте другой способ авторизации" : "";


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isAdmin = useCurrentRole()

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {

        setError("");
        setSuccess("");


        startTransition(async () => {
            await axios.post("/api/users/login", values)
                .then(async (data) => {
                    console.log(data)
                    if (data.data.error) {
                        // if (data.data.error === "Что-то пошло не так :(") {
                        //     window.location.reload();
                        // } else {
                            console.log(data.data.error)
                            setError(data.data.error);
                        // }
                    } else if (data.data.success) {
                        form.reset();
                        setSuccess(data.data.success);
                    } else {
                        // console.log(isAdmin)
                        // if (isAdmin === false) {
                        //     router.push("/profile")
                        // } else if (isAdmin === true) {
                        //     router.push("/adminProfile")
                        // }
                        window.location.reload();
                    }
                })
                .catch((e) => {
                    console.log(e)
                    // window.location.reload();
                });
        });
    };

    const googleAuth = () => {
        signIn("google", {
            callbackUrl: DEFAULT_USER_LOGIN_REDIRECT
        })
    }

    useEffect(() => {
        console.log(`error : ${error}`)
        console.log(`success : ${success}`)

    }, [error, success])


    return (
        <OrderProvider>
            <div className='signUpBlock'>
                <h2>{"Авторизация"}</h2>
                <p className='signUpBlockText'>
                    Ещё нет аккаунта? <Link className='loginLink' href="/signup">Зарегистрируйтесь</Link>
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel style={{fontWeight: '600'}}>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@example.com"
                                                    type="email"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel style={{fontWeight: '600'}}>Пароль</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                            <Button
                                                size="sm"
                                                variant="link"
                                                asChild
                                                className="px-0 font-normal"
                                            >
                                                <Link href="/resetPassword">
                                                    Забыли пароль?
                                                </Link>
                                            </Button>

                                        </FormItem>
                                    )}
                                />
                            </>

                        </div>
                        <div style={{margin: '5px 0 10px 0'}}>
                            <FormError message={error || urlError}/>
                            <FormSuccess message={success}/>
                        </div>
                        <Button
                            style={{marginTop: '6px'}}
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Войти
                        </Button>
                    </form>
                </Form>
                <div className='googleLogin' onClick={() => googleAuth()}>
                    <p>Войти с помощью <Image className='Google-logo' src={googleLogo}
                                              alt={'Google'}></Image>
                    </p>
                </div>
            </div>
        </OrderProvider>
    )
}

