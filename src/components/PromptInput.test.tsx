import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PromptInput from './PromptInput';
import { test, expect, vi } from "vitest";
import { useState } from 'react';

// Test harness to simulate a real parent component
function PromptHarness({ onSpy }: { onSpy?: (v: string) => void }) {
  const [val, setVal] = useState('');
  return (
    <PromptInput
      value={val}
      onChange={(v) => {
        setVal(v);
        onSpy?.(v);
      }}
    />
  );
}

test('updates value as user types full text', async () => {
  const user = userEvent.setup();
  const spy = vi.fn();
  render(<PromptHarness onSpy={spy} />);

  const textarea = screen.getByLabelText(/prompt/i);
  await user.type(textarea, 'hello world');

  // The actual textarea value should reflect the full text
  expect(textarea).toHaveValue('hello world');

  // And the last onChange call should carry the full string too
  expect(spy).toHaveBeenCalled();
  expect(spy.mock.calls.at(-1)?.[0]).toBe('hello world');
});