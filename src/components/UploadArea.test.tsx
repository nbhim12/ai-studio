import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect, vi } from "vitest";
import UploadArea from './UploadArea';

function makeFile({ type = 'image/png', size = 1024 } = {}) {
  const blob = new Blob(['x'.repeat(size)], { type });
  return new File([blob], type.includes('jpeg') ? 'photo.jpg' : 'photo.png', { type });
}

// Stub FileReader to immediately yield a data URL
class FRStub {
  result: string | ArrayBuffer | null = null;
  onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;
  onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null = null;

  readAsDataURL(_file: File) {
    // simulate async read
    setTimeout(() => {
      this.result = 'data:image/png;base64,XYZ'; // populate reader.result
      this.onload?.call(this as any, { target: this } as any); // call with `this` as target
    }, 0);
  }
}
Object.defineProperty(window, 'FileReader', { value: FRStub });

describe('UploadArea', () => {
  test('accepts PNG/JPG and calls onImageChange with a data URL', async () => {
    const onImageChange = vi.fn();
    render(<UploadArea onImageChange={onImageChange} />);

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const file = makeFile({ type: 'image/png', size: 2048 });

    await fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => expect(onImageChange).toHaveBeenCalledTimes(1));
    expect(onImageChange.mock.calls[0][0]).toMatch(/^data:image\/png;base64/);
    // no error should be visible
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('shows inline error for files over 10MB', async () => {
    const onImageChange = vi.fn();
    render(<UploadArea onImageChange={onImageChange} />);

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const big = makeFile({ type: 'image/png', size: 10 * 1024 * 1024 + 1 });

    await fireEvent.change(input, { target: { files: [big] } });

    const alertEl = await screen.findByRole('alert');
    expect(alertEl).toHaveTextContent(/file size must be ≤ 10mb/i);
    expect(onImageChange).not.toHaveBeenCalled();
  });

  test('shows inline error for non-image types', async () => {
    const onImageChange = vi.fn();
    render(<UploadArea onImageChange={onImageChange} />);

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const bad = makeFile({ type: 'application/pdf', size: 1024 });

    await fireEvent.change(input, { target: { files: [bad] } });

    const alertEl = await screen.findByRole('alert');
    expect(alertEl).toHaveTextContent(/Only PNG and JPG images are allowed/i);
    expect(onImageChange).not.toHaveBeenCalled();
  });

  test('clears previous error when a valid file is selected next', async () => {
    const onImageChange = vi.fn();
    render(<UploadArea onImageChange={onImageChange} />);

    const input = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    // first: invalid
    const bad = makeFile({ type: 'application/pdf', size: 1024 });
    await fireEvent.change(input, { target: { files: [bad] } });
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    // then: valid
    const ok = makeFile({ type: 'image/jpeg', size: 2048 });
    await fireEvent.change(input, { target: { files: [ok] } });

    await waitFor(() => expect(onImageChange).toHaveBeenCalledTimes(1));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});