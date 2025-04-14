import styled from 'styled-components';

export interface Product {
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

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 0.875rem;
    color: #374151;

    @media (max-width: 640px) {
        font-size: 0.75rem;
    }
`;

const TableHeader = styled.thead`
    background: #f9fafb;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    border-bottom: 1px solid #e5e7eb;

    &:last-child {
        border-bottom: none;
    }
`;

const TableHead = styled.th`
    padding: 0.75rem;
    text-align: left;
    font-weight: 500;
    color: #1f2937;
    background: #f3f4f6;

    @media (max-width: 640px) {
        padding: 0.5rem;
    }
`;

const TableCell = styled.td`
    padding: 0.75rem;
    color: #374151;

    @media (max-width: 640px) {
        padding: 0.5rem;
    }
`;

const NoProductsMessage = styled.p`
    text-align: center;
    color: #6b7280;
    font-size: 1rem;
    padding: 2rem;
`;

interface ProductTableProps {
    products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
    return (
        <>
            {products.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Categoria</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>SKU</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <NoProductsMessage>No products found.</NoProductsMessage>
            )}
        </>
    );
}