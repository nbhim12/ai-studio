import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StyleDropdown, { type StyleOption } from './StyleSelect';
import { test, expect, vi } from "vitest";


test('selects a style option', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  render(<StyleDropdown value={'Editorial' as StyleOption} onChange={onChange} />);

  const select = screen.getByLabelText(/style/i) as HTMLSelectElement;
  await user.selectOptions(select, 'Vintage');

  expect(onChange).toHaveBeenCalledWith('Vintage' as StyleOption);
});