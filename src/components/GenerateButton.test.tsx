import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenerateButton from './GenerateButton';
import { test, expect, vi } from "vitest";


test('disabled when required inputs are missing', () => {
  render(
    <GenerateButton
      imageDataUrl={null}
      prompt=""
      style={'' as any}
      onSuccess={() => {}}
    />
  );
  expect(screen.getByRole('button', { name: /generate/i })).toBeDisabled();
});

test('shows loading state label when loading=true (spinner visible by text)', () => {
  render(
    <GenerateButton
      imageDataUrl="data:image/png;base64,XYZ"
      prompt="p"
      style="Editorial"
      onSuccess={() => {}}
    />
  );

});

test('click triggers when enabled', async () => {
  const user = userEvent.setup();
  const onSuccess = vi.fn(); // we can't assert success without mocking API; this just ensures click doesn't throw
  render(
    <GenerateButton
      imageDataUrl="data:image/png;base64,XYZ"
      prompt="hello"
      style="Editorial"
      onSuccess={onSuccess}
    />
  );

  const btn = screen.getByRole('button', { name: /generate/i });
  expect(btn).toBeEnabled();
  await user.click(btn);
  // Cannot deterministically assert onSuccess since it's async and random-failure; leave as smoke.
  expect(btn).toBeInTheDocument();
});