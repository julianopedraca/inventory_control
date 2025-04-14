import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import styled from 'styled-components';

const Card = styled.div`
    background: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 1rem;
`;

const CardHeader = styled.div`
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
`;

const CardContent = styled.div`
    padding: 1rem;
`;

export default function EditProduct() {
    const { data, setData, put, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        quantity: '',
        sku: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Produtos', href: '/produtos' }, { title: 'Adicioanar Produto', href: '/produtos/adicionar' }]}>
            <Head title="Editar Produto" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Adicionar Produto</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="price">Preço</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description">Quantidade</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="description">SKU</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing}>
                                Salvar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
