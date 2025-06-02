import axios from 'axios';
import type { Product, Category, ProductFilters } from '@/types/product';

const API_URL = import.meta.env.VITE_CT_API_URL as string;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY as string;

const PRODUCTS_PER_PAGE = 10;
const FUZZY_LEVEL = 2;

export async function getProductByKey(productKey: string, token: string): Promise<Product | undefined> {
  try {
    const response = await axios.get<Product>(`${API_URL}${PROJECT_KEY}/product-projections/key=${productKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}

export async function getCategoryById(categoryId: string, token: string): Promise<Category | undefined> {
  try {
    const response = await axios.get<Category>(`${API_URL}${PROJECT_KEY}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return undefined;
  }
}

interface FilteredProductsQuery {
  token: string;
  filters: ProductFilters;
}

export interface FilteredProductsResponse {
  results: Product[];
}

export async function getFilteredProducts({
  token,
  filters,
}: FilteredProductsQuery): Promise<FilteredProductsResponse> {
  const {
    category,
    subcategory,
    mood = [],
    size = [],
    material = [],
    popularity = [],
    newArrival = [],
    priceRange,
    page = 1,
    search,
    sortBy,
    sortDirection,
    markMatchingVariants = false,
    fuzzyLevel = FUZZY_LEVEL,
  } = filters;

  const filter: string[] = [];

  if (subcategory) {
    filter.push(`categories.id:subtree("${subcategory}")`);
  }
  if (category) {
    filter.push(`categories.id:subtree("${category}")`);
  }

  if (mood.length > 0) {
    filter.push(`variants.attributes.Mood.key:"${mood.join('","')}"`);
  }
  if (size.length > 0) {
    filter.push(`variants.attributes.Size.key:"${size.join('","')}"`);
  }
  if (material.length > 0) {
    filter.push(`variants.attributes.material:"${material.join('","')}"`);
  }
  if (popularity.length > 0) {
    filter.push(`variants.attributes.popularity:"${popularity.join('","')}"`);
  }
  if (newArrival.length > 0) {
    filter.push(`variants.attributes.new-arrival.key:"${newArrival.join('","')}"`);
  }

  if (priceRange) {
    filter.push(`variants.price.centAmount:range(${priceRange[0]} to ${priceRange[1]})`);
  }

  const bodyParameters = new URLSearchParams();

  if (markMatchingVariants) {
    bodyParameters.append('markMatchingVariants', 'true');
  }

  if (search) {
    bodyParameters.append('text.en-US', search);
    bodyParameters.append('fuzzy', 'true');
    if (typeof fuzzyLevel === 'number') {
      bodyParameters.append('fuzzyLevel', String(fuzzyLevel));
    }
  }

  const facets = [
    'variants.price.centAmount:range(0 to 9999999) as prices',
    'variants.attributes.Size.key as sizes',
    'variants.attributes.Mood.key as moods',
    'variants.attributes.material as materials',
    'variants.attributes.popularity as popularity',
    'variants.attributes.new-arrival.key as newArrivals',
  ];
  for (const f of facets) bodyParameters.append('facet', f);

  for (const f of filter) bodyParameters.append('filter', f);

  if (sortBy) {
    bodyParameters.append('sort', `${sortBy} ${sortDirection ?? 'asc'}`);
  }

  bodyParameters.append('limit', PRODUCTS_PER_PAGE.toString());
  bodyParameters.append('offset', ((page - 1) * PRODUCTS_PER_PAGE).toString());

  console.log('POST body:', bodyParameters.toString());

  try {
    const response = await axios.post(`${API_URL}${PROJECT_KEY}/product-projections/search`, bodyParameters.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data as FilteredProductsResponse;
  } catch (error) {
    console.error('Error querying products:', error);
    throw error;
  }
}
