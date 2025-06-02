import Catalog from '@/components/Catalog/Catalog';
import WrapperLayout from '@/components/Layout/WrapperLayout';
import type { ReactElement } from 'react';

export default function CatalogPage(): ReactElement {
  return (
    <>
      <WrapperLayout>
        <Catalog />
      </WrapperLayout>
    </>
  );
}
