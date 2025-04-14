import ProductTable from '@/components/ui/product-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import styled from 'styled-components';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Produtos', href: '/produtos' },
];

interface Product {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: string;
    sku: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    products: Product[];
    [key: string]: any;
}

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

export default function ListProduct() {
    const { products } = usePage<PageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produtos" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Produtos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProductTable products={products} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}