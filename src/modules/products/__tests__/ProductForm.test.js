import React from 'react';
import ProductForm from '../ProductForm';
import { fireEvent, render, screen, act } from '@testing-library/react';

describe('Product form', () => {
  it('renders without crashing', () => {
    render(<ProductForm currentProduct={{
      code: "",
      name: "",
      description: "",
      brandId: "",
      price: "",
      stock: "",
      weight: ""
    }} />);
  });


  it('call onCancel when cancel submit', () => {
    const mockSubmit = jest.fn();
    const mockCancel = jest.fn();

    render(
      <ProductForm onSubmit={mockSubmit} onCancel={mockCancel} currentProduct={{
        code: "",
        name: "",
        description: "",
        brandId: "",
        price: "",
        stock: "",
        weight: ""
      }} />,
    );

    fireEvent.click(screen.getByText('Cancelar'))

    expect(mockCancel.mock.calls.length).toBe(1);
  });

});
