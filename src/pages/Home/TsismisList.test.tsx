import {screen, waitFor } from '@testing-library/react';
import { render } from '@/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import TsismisList from './TsismisList';
import { GET_TSISMIS_MUTATION } from '@/mutation/tsismis';

const mock = new MockAdapter(axios);

const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQ2NGZjZDAxNDk0YzJlMDUyMmJhNyIsInVzZXJuYW1lIjoiY29uZ3R2IiwiaWF0IjoxNzE3NDEzNzM1LCJleHAiOjE3MTc0MTczMzV9.leM0RmpBmdXAXLyzYxA_Vgi9IoMtro9KSGo535SzBW4';

mock.onPost(`${process.env.VITE_APP_API}/graphql`, {
    query: GET_TSISMIS_MUTATION,
    variables: { cursor: '', limit: '10' },
  }).reply(config => {
    if (config?.headers?.Authorization === authHeader) {
      return [200, {
        data: {
          tsismis: [
            { id: 1, content: 'First Tsismis' },
            // Add other tsismis items if needed
          ]
        }
      }];
    } else {
      return [401]; // Unauthorized if the auth header is missing or incorrect
    }
  });

test('displays tsismis', async () => {
  render(<TsismisList />);

  const tsismis = await waitFor(() => screen.getByText('First Tsismis'));
  expect(tsismis).toBeInTheDocument();
});