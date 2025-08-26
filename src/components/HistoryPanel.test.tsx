import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPanel from './HistoryPanel';
import type { GenerationResult } from '../types';
import { test, expect, vi } from "vitest";


const sample: GenerationResult = {
  id: '1',
  imageUrl: 'data:image/png;base64,xyz',
  prompt: 'A shoe',
  style: 'Editorial',
  createdAt: Date.now()
};

test('shows empty state when no history', () => {
  render(<HistoryPanel history={[]} onSelect={() => {}} />);
  expect(screen.getByText(/no history/i)).toBeInTheDocument();
});

test('renders item and calls onSelect when clicked', async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(<HistoryPanel history={[sample]} onSelect={onSelect} />);

  // Find by prompt text inside the button/card
  const item = screen.getByText(/a shoe/i);
  await user.click(item);

  expect(onSelect).toHaveBeenCalledWith(sample);
});