import React from 'react';
import Products from '../Products';
import { render, waitFor, screen } from '@testing-library/react';
import { requests } from '../../../utils/requestHandler';
import { PRODUCTS } from '../testUtils';

jest.mock('../../../utils/requestHandler')

afterEach(() => {
  jest.resetAllMocks()
})

describe('Products', () => {
  it('it should renders without crashing', async () => {
    requests.get.mockResolvedValueOnce(PRODUCTS)
    render(<Products />);
    await waitFor(() => {
      expect(requests.get).toHaveBeenCalledTimes(1);
      expect(requests.get).toHaveBeenCalledWith('/products');
    });
  });

  it('it should show error message if request fails', async () => {
    requests.get.mockRejectedValueOnce("Hubo un error en la consulta")
    render(<Products />)
    await waitFor(() => {
      expect(requests.get).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Hubo un error en la consulta")).toBeInTheDocument()
    });
  });


});
