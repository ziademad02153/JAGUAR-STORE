import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const products = [
  {
    id: 1,
    name: 'Jaguar Black Hoodie',
    arabicName: 'هودي جاكوار أسود',
    price: '650 EGP',
    image: 'https://i.imgur.com/1TJW6vg.jpg',
    category: 'Hoodies',
    arabicCategory: 'هوديز'
  },
  {
    id: 2,
    name: 'Jaguar White T-Shirt',
    arabicName: 'تيشيرت جاكوار أبيض',
    price: '350 EGP',
    image: 'https://i.imgur.com/qDuHTUN.jpg',
    category: 'T-Shirts',
    arabicCategory: 'تيشيرتات'
  },
  {
    id: 3,
    name: 'Jaguar Sport Set',
    arabicName: 'طقم رياضي جاكوار',
    price: '850 EGP',
    image: 'https://i.imgur.com/vm5Lqch.jpg',
    category: 'Sportswear',
    arabicCategory: 'ملابس رياضية'
  },
  {
    id: 4,
    name: 'Jaguar Premium Hoodie',
    arabicName: 'هودي جاكوار بريميوم',
    price: '750 EGP',
    image: 'https://i.imgur.com/hHKCtY2.jpg',
    category: 'Hoodies',
    arabicCategory: 'هوديز'
  },
  {
    id: 5,
    name: 'Jaguar Classic Hoodie',
    arabicName: 'هودي جاكوار كلاسيك',
    price: '600 EGP',
    image: 'https://i.imgur.com/cEfN5Bk.jpg',
    category: 'Hoodies',
    arabicCategory: 'هوديز'
  },
  {
    id: 6,
    name: 'Jaguar Premium T-Shirt',
    arabicName: 'تيشيرت جاكوار بريميوم',
    price: '400 EGP',
    image: 'https://i.imgur.com/DpM4rww.jpg',
    category: 'T-Shirts',
    arabicCategory: 'تيشيرتات'
  },
  {
    id: 7,
    name: 'Jaguar Sport Pants',
    arabicName: 'بنطلون رياضي جاكوار',
    price: '450 EGP',
    image: 'https://i.imgur.com/9MHF0Tl.jpg',
    category: 'Sportswear',
    arabicCategory: 'ملابس رياضية'
  },
  {
    id: 8,
    name: 'Jaguar Casual Set',
    arabicName: 'طقم كاجوال جاكوار',
    price: '900 EGP',
    image: 'https://i.imgur.com/dCmoTAa.jpg',
    category: 'Sportswear',
    arabicCategory: 'ملابس رياضية'
  }
];

const categories = ['All', 'Hoodies', 'T-Shirts', 'Sportswear'];
const arabicCategories = ['الكل', 'هوديز', 'تيشيرتات', 'ملابس رياضية'];

export default function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === 'ar';
  const displayCategories = isArabic ? arabicCategories : categories;

  const filteredProducts = selectedCategory === 'All' || selectedCategory === 'الكل'
    ? products
    : products.filter(product => 
        isArabic ? product.arabicCategory === selectedCategory : product.category === selectedCategory
      );

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: isArabic ? product.arabicName : product.name,
      price: product.price,
      image: product.image
    });
    toast.success(t('products.addedToCart'));
  };

  return (
    <div id="products" className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t('products.title')}
          </h2>
          
          {/* Categories */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {displayCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative aspect-w-4 aspect-h-5 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={isArabic ? product.arabicName : product.name}
                  className="w-full h-full object-center object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                {hoveredProduct === product.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-all duration-300"
                    >
                      <ShoppingCart className="h-6 w-6" />
                    </button>
                    <button className="p-3 bg-white rounded-full text-black hover:bg-gray-100 transition-all duration-300">
                      <Heart className="h-6 w-6" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {isArabic ? product.arabicName : product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {isArabic ? product.arabicCategory : product.category}
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}