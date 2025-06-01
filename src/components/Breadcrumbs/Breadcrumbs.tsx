import type { JSX } from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps): JSX.Element => {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex flex-wrap items-center space-x-1 text-sm text-gray-600'>
        {items.map((item, index) => (
          <li key={index} className='flex items-center'>
            {index > 0 && <span className='mx-1 text-gray-400'>/</span>}
            {item.path ? (
              <Link to={item.path} className='hover:underline text-blue-600'>
                {item.label}
              </Link>
            ) : (
              <span className='font-medium text-gray-800'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
