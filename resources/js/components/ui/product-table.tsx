import { useState } from 'react';
import styled from 'styled-components';
import { Pencil, Plus, Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import { useForm } from '@inertiajs/react';

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 100px;
    max-width: 320px;

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

const ActionButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    color: #6b7280;
    
    &:hover {
        color: #1f2937;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 500px;
    position: relative;
`;

const ModalInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
`;

const ModalButton = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
`;

const SaveButton = styled(ModalButton)`
    background: #3b82f6;
    color: white;
`;

const CancelButton = styled(ModalButton)`
    background: #e5e7eb;
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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'add' | 'edit' | 'delete'>('add');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { data, setData, post, put, delete: deleteRequest, reset, errors } = useForm<Partial<Product>>({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        category: '',
        sku: '',
    });

    const filteredProducts = products.filter((product) => {
        const normalize = (str: string) =>
            str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesCategory = normalize(product.category).includes(normalize(categoryFilter));
        const matchesMinPrice = minPrice ? product.price >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? product.price <= parseFloat(maxPrice) : true;

        return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    const handleOpenModal = (type: 'add' | 'edit' | 'delete', product?: Product) => {
        setModalType(type);
        setSelectedProduct(product || null);

        if (type === 'edit' && product) {
            // Populate form with product data for editing
            setData({
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                category: product.category,
                sku: product.sku,
            });
        } else if (type === 'add') {
            // Reset form for adding a new product
            reset();
        }

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
        reset(); // Clear form data
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt_token');
        const headers = {
            Authorization: token ? `Bearer ${token}` : '',
        };

        if (modalType === 'add') {
            post('/api/v1/products', {
                headers,
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    handleCloseModal();
                    toast.success('Produto adicionado com sucesso!');
                },
                onError: (errors: any) => {
                    toast.error(errors.message || 'Algo deu errado.');
                },
            });
        } else if (modalType === 'edit' && selectedProduct) {
            put(`/api/v1/products/${selectedProduct.id}`, {
                headers,
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    handleCloseModal();
                    toast.success('Produto alterado com sucesso!');
                },
                onError: (errors: any) => {
                    toast.error(errors.message || 'Algo deu errado.');
                },
            });
        } else if (modalType === 'delete' && selectedProduct) {
            deleteRequest(`/api/v1/products/${selectedProduct.id}`, {
                headers,
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    handleCloseModal();
                    toast.success('Produto excluído com sucesso!');
                },
                onError: (errors: any) => {
                    toast.error(errors.message || 'Algo deu errado.');
                },
            });
        }
    };

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
                            <TableHead>Descrição</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Quantidade</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>
                                <ActionButton onClick={() => handleOpenModal('add')}>
                                    <Plus size={20} />
                                </ActionButton>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell >{product.description}</TableCell>
                                <TableCell>R${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>
                                    <ActionButton onClick={() => handleOpenModal('edit', product)}>
                                        <Pencil size={20} />
                                    </ActionButton>
                                    <ActionButton onClick={() => handleOpenModal('delete', product)}>
                                        <Trash size={20} />
                                    </ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <NoProductsMessage>
                    Nenhum produto encontrado.{' '}
                    <ActionButton onClick={() => handleOpenModal('add')}>
                        <Plus size={20} /> Adicionar novo
                    </ActionButton>
                </NoProductsMessage>
            )}

            {modalOpen && (
                <ModalOverlay>
                    <ModalContent>
                        {modalType === 'delete' ? (
                            <>
                                <h2>Excluir Produto</h2>
                                <p>Tem certeza que deseja excluir {selectedProduct?.name}?</p>
                                <SaveButton onClick={handleSubmit}>Confirmar</SaveButton>
                                <CancelButton onClick={handleCloseModal}>Cancelar</CancelButton>
                            </>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <h2>{modalType === 'add' ? 'Adicionar Produto' : 'Editar Produto'}</h2>
                                <ModalInput
                                    name="name"
                                    value={data.name || ''}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Nome do produto"
                                />
                                {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                                <ModalInput
                                    name="category"
                                    value={data.category || ''}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Categoria"
                                />
                                {errors.category && <span style={{ color: 'red' }}>{errors.category}</span>}
                                <ModalInput
                                    name="price"
                                    type="number"
                                    value={data.price || ''}
                                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                                    placeholder="Preço"
                                />
                                {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
                                <ModalInput
                                    name="quantity"
                                    type="number"
                                    value={data.quantity || ''}
                                    onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                    placeholder="Quantidade"
                                />
                                {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity}</span>}
                                <ModalInput
                                    name="sku"
                                    value={data.sku || ''}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    placeholder="SKU"
                                />
                                {errors.sku && <span style={{ color: 'red' }}>{errors.sku}</span>}
                                <ModalInput
                                    name="description"
                                    value={data.description || ''}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Descrição"
                                />
                                {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                                <SaveButton type="submit">Salvar</SaveButton>
                                <CancelButton type="button" onClick={handleCloseModal}>Cancelar</CancelButton>
                            </form>
                        )}
                    </ModalContent>
                </ModalOverlay>
            )}
        </div>
    );
}