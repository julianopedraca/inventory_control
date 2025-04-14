import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm, usePage } from '@inertiajs/react';
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

export default function AddProduct() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        price: '',
        description: '',
        quantity: '',
        sku: '',
        category: '',
    });

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        post('/api/v1/products', {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // const success = usePage().props.flash?.success;
                // if (success) {
                //     alert(success); // Replace with a toast notification for production
                // }
            },
            onError: (errors) => {
                console.error('Create failed:', errors);
                if (errors.error === 'Forbidden') {
                    alert('Você não tem permissão para adicionar produtos.');
                }
            },
        });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Produtos', href: '/produtos' },
                { title: 'Adicionar Produto', href: '/produtos/adicionar' },
            ]}
        >
            <Head title="Adicionar Produto" />
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
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor="price">Preço</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Descrição</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="category">Categoria</Label>
                                <Input
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.category && (
                                    <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantidade</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => setData('quantity', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.quantity && (
                                    <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="sku">SKU</Label>
                                <Input
                                    id="sku"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}