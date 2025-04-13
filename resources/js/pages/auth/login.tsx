import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import AuthLayout from '@/layouts/auth-layout';
import styled from 'styled-components';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  display: block;
  color: #555;
`;

const Input = styled.input`
  padding: 10px 14px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #1e2939;
  text:
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

const LogoImage = styled.img`
  max-height: 320px;
  width: auto;
  object-fit: cover; 
`;


export default function Login({ status, canResetPassword }: LoginProps) {
    // const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    //     email: '',
    //     password: '',
    //     remember: false,
    // });

    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();
    //     post(route('login'), {
    //         onFinish: () => reset('password'),
    //     });
    // };

    return (
        <>
            <AuthLayout title="Acesse sua conta!" description="Digite seu email e senha para acessar">
                <Card>
                    <LogoImage src={"images/stockontrol.png"} alt="Stockcontrol" className="mb-8" />
                    <form>
                        <div className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <Input className="text-gray-800" type="email" id="email" placeholder="email@exemplo.com" />
                        </div>
                        <div className="mb-5">
                            <Label htmlFor="password">Senha</Label>
                            <Input type="password" id="password" placeholder="••••••••" />
                            <div className="text-muted-foreground text-left text-sm">
                                <TextLink href={route('password.request')} tabIndex={5}>
                                    Esqueceu a senha?
                                </TextLink>
                            </div>

                        </div>
                        <Button type="submit" className="mt-2 w-full" tabIndex={5} >
                            Acessar
                        </Button>
                        <div className="flex gap-1">
                            <div className="text-muted-foreground text-center text-sm">
                                Ainda não tem cadastro?{' '}
                                <TextLink href={route('register')} tabIndex={6}>
                                    Cadastrar!
                                </TextLink>
                            </div>
                        </div>
                    </form>
                </Card >
            </AuthLayout>
        </>
    );
}
