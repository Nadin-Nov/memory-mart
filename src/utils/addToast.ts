import { toaster } from '@/components/ui/toaster';

type ToastType = 'success' | 'error';

export function addToast(type: ToastType, title: string, description: string): string {
  return toaster.create({
    type,
    title,
    description,
  });
}
