import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { Card } from '@/components/ui/card';
import axios from 'axios';

type RegisterForm = {
    name: string;
    email: string;
    role_id: number;
    password: string;
    password_confirmation: string;
};
type Option = {
    id: number;
    name: string;
};

export default function Register() {
    const [initialized, setInitialized] = useState(false)
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (initialized && token) {
            router.get(route('produtos'));
        }
        setInitialized(true)
    }, [initialized]);

    const [options] = useState<Option[]>([
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Editor' },
        { id: 3, name: 'Usuário' },
    ]);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        role_id: 0,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(route('register'), {
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
    }

    return (
        <AuthLayout title="Crie sua conta" description="Digite seus dados para criar uma conta">
            <Head title="Cadastrar" />
            <Card>
                <form className="flex flex-col gap-6" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nome</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nome completo"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Endereço de e-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@exemplo.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role_id">Tipo de Acesso</Label>
                            <Select
                                value={data.role_id ? String(data.role_id) : ''}
                                onValueChange={(value) => setData('role_id', Number(value))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um tipo de acesso" />
                                </SelectTrigger>
                                <SelectContent
                                    id="role_id"
                                    position="popper"
                                    side="bottom"
                                    align="start"
                                    className="z-50 w-full min-w-[var(--radix-select-trigger-width)] bg-white border border-gray-200 rounded-md shadow-lg"
                                >
                                    {options.map((option) => (
                                        <SelectItem key={option.id} value={String(option.id)}>
                                            {option.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role_id} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Senha"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmar senha</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirme sua senha"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Criar conta
                        </Button>
                    </div>

                    <div className="text-muted-foreground text-center text-sm">
                        Já tem uma conta?{' '}
                        <TextLink href={route('login')} tabIndex={6}>
                            Faça login
                        </TextLink>
                    </div>
                </form>
            </Card>
        </AuthLayout>
    );
}
