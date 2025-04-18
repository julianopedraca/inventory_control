import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import styled from 'styled-components';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import axios from 'axios';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const LogoImage = styled.img`
    max-height: 300px;
    width: auto;
    max-width: 100%;
    display: block;
    object-fit: contain;
`;

export default function Login() {
    const [initialized, setInitialized] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (initialized && token) {
            router.get(route('produtos'));
        }
        setInitialized(true)
    }, [initialized]);

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: async () => {
                try {
                    const response = await axios.post('/api/v1/login', {
                        email: data.email,
                        password: data.password,
                    });
                    const { token } = response.data;
                    localStorage.setItem('jwt_token', token);
                    reset('password');
                } catch (error) {
                    console.error('Failed to get JWT token:', error);
                }
            },
            onError: () => {
                reset('password');
            },
        });
    };
    return (
        <AuthLayout title="Acesse sua conta!" description="Digite seu email e senha para acessar">
            <Card>
                <LogoImage src="/images/stockontrol.png" alt="Stockcontrol" className="mb-8" />
                <form onSubmit={submit}>
                    <div className="mb-5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="text-gray-800"
                            type="email"
                            id="email"
                            placeholder="email@exemplo.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoFocus
                        />
                        {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                    </div>
                    <div className="mb-5">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="senha"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                    </div>
                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        Acessar
                    </Button>
                    <div className="flex gap-1 justify-center mt-4">
                        <div className="text-muted-foreground text-center text-sm">
                            Ainda não tem cadastro?{' '}
                            <TextLink href={route('register')} tabIndex={6}>
                                Cadastrar!
                            </TextLink>
                        </div>
                    </div>
                </form>
            </Card>
        </AuthLayout>
    );
}