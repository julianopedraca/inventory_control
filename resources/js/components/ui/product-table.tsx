import { useState } from 'react';
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

const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 0.375rem;
`;

const FilterInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    width: 100%;
    max-width: 200px;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 1px #3b82f6;
    }
`;

const FilterLabel = styled.label`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #374151;
`;

interface ProductTableProps {
    products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const filteredProducts = products.filter((product) => {
        const normalize = (str: string) =>
            str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesCategory = normalize(product.category).includes(normalize(categoryFilter));
        const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;

        return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    return (
        <div>
            <FilterContainer>
                <FilterLabel>
                    Nome
                    <FilterInput
                        type="text"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        placeholder="Filtrar por nome"
                    />
                </FilterLabel>
                <FilterLabel>
                    Categoria
                    <FilterInput
                        type="text"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        placeholder="Filtrar por categoria"
                    />
                </FilterLabel>
                <FilterLabel>
                    Preço Mínimo
                    <FilterInput
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Preço mínimo"
                    />
                </FilterLabel>
                <FilterLabel>
                    Preço Máximo
                    <FilterInput
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Preço máximo"
                    />
                </FilterLabel>
            </FilterContainer>

            {filteredProducts.length > 0 ? (
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
                        {filteredProducts.map((product) => (
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
        </div>
    );
}