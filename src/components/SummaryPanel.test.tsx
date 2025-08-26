import { render, screen } from '@testing-library/react';
import SummaryPanel from './SummaryPanel';
import { test, expect } from "vitest";


test('renders live summary with image', () => {
  render(<SummaryPanel imageDataUrl="data:image/png;base64,XYZ" prompt="p" style="Editorial" />);
  expect(screen.getByRole('img')).toBeInTheDocument(); // alt may vary; role check is robust
  expect(screen.getByText(/Prompt:/i)).toBeInTheDocument();
  expect(screen.getByText(/Editorial/)).toBeInTheDocument();
});

test('renders empty states when no data', () => {
  render(<SummaryPanel imageDataUrl={null} prompt="" style="" />);
  expect(screen.getByText(/no image/i)).toBeInTheDocument();
  expect(screen.getByText(/none/i)).toBeInTheDocument();
  expect(screen.getByText(/not selected/i)).toBeInTheDocument();
});