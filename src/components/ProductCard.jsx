import React from 'react';
import QuantityStepper from './QuantityStepper';

// Frame 1735: horizontal card, image left square, content right
export function ProductCardF1735({ product, quantity, activeVariantId, onQuantityChange, onVariantChange }) {
  const isSelected = quantity > 0;
  return (
<div className={`relative flex rounded-lg border bg-white transition-all duration-150 overflow-hidden h-full      ${isSelected
        ? 'border-[#4B4FD9] ring-1 ring-[#4B4FD9]'
        : 'border-[#E2E2EC] hover:border-[#C8C8D8] hover:shadow-sm'
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 left-2 z-10 bg-[#4B4FD9] text-white text-[9px] font-bold px-[7px] py-[3px] rounded-full tracking-wide leading-none">
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className="w-[100px] flex-shrink-0 bg-white flex items-center justify-center p-2"
>
        <img src={product.image} alt={product.name}
          className="w-[72px] h-[72px] object-contain" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-3 pt-3 pb-2.5 gap-1 min-w-0">
        <p className="text-[14px] font-normal text-[#1F1F1F] leading-tight">{product.name}</p>
        <p className="text-[12px] text-[#1F1F1FBF] leading-snug">
          {product.description}{' '}
          {product.learnMore && (
            <a href={product.learnMore}
              className="text-[#4B4FD9] underline underline-offset-[2px] hover:no-underline">
              Learn More
            </a>
          )}
        </p>

        {/* Variant chips */}
        {product.variants?.length > 0 && (
          <div className="flex flex-wrap gap-[4px] mt-0.5">
            {product.variants.map(variant => (
              <button key={variant.id}
              onClick={() => onVariantChange(product.id, variant.id)}
              className={`flex items-center gap-[4px] px-[4px] py-[3px] pr-[7px] rounded-[2px] text-[10px] font-medium border transition-colors
                ${activeVariantId === variant.id
                  ? 'border-green-100 bg-green-50'
                    : 'border-grey-50 bg-white hover:border-green-100'
                }`}
            >
              <img
                src={variant.image}
                alt={variant.label}
                className="w-[22px] h-[22px] object-contain rounded flex-shrink-0 bg-white"
              />
              {variant.label}
            </button>
            ))}
          </div>
        )}

        {/* Footer: stepper + price */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <QuantityStepper value={quantity} onChange={onQuantityChange}
            max={product.maxQuantity ?? 99} size="card" />
          <div className="flex flex-col items-end leading-tight">
            {product.comparePrice != null && product.comparePrice > 0 && (
              <span className="text-[16px] font-normal text-[#D8392B] line-through">
                ${product.comparePrice.toFixed(2)}{product.priceSuffix ?? ''}
              </span>
            )}
            {product.priceLabel
              ? <span className="text-[16px] font-normal text-[#4B4FD9]">{product.priceLabel}</span>
              : <span className="text-[16px] font-normal text-[#575757]">
                  ${product.price.toFixed(2)}{product.priceSuffix ?? ''}
                </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// Frame 1736: vertical card, image top, content below — full showcase style
export function ProductCardF1736({ product, quantity, activeVariantId, onQuantityChange, onVariantChange }) {
  const isSelected = quantity > 0;
  return (
<div className={`relative flex flex-col rounded-xl border bg-white transition-all duration-150 overflow-hidden h-full
      ${isSelected
        ? 'border-[#4B4FD9] ring-1 ring-[#4B4FD9]'
        : 'border-[#E2E2EC] hover:border-[#C8C8D8] hover:shadow-md'
      }`}
    >
      {product.badge && (
        <span className="absolute top-2.5 left-2.5 z-10 bg-[#4B4FD9] text-white text-[9px] font-bold px-[7px] py-[3px] rounded-full tracking-wide">
          {product.badge}
        </span>
      )}

      {/* Large image */}
      <div className="w-full aspect-square bg-white flex items-center justify-center p-4">
        <img src={product.image} alt={product.name}
          className="w-full h-full object-contain" />
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="text-[13px] font-bold text-[#1A1A2E] leading-tight">{product.name}</p>
        <p className="text-[11px] text-[#6B6B80] leading-snug">
          {product.description}{' '}
          {product.learnMore && (
            <a href={product.learnMore} className="text-[#4B4FD9] underline underline-offset-[2px]">Learn More</a>
          )}
        </p>

        {product.variants?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {product.variants.map(variant => (
              <button key={variant.id}
              onClick={() => onVariantChange(product.id, variant.id)}
              className={`flex items-center gap-[4px] px-[4px] py-[3px] pr-[7px] rounded-md text-[10.5px] font-medium border transition-colors
                ${activeVariantId === variant.id
                  ? 'border-green-100 bg-green-50'
                    : 'border-grey-50 bg-white hover:border-green-100'
                }`}
            >
              <img
                src={variant.image}
                alt={variant.label}
                className="w-[22px] h-[22px] object-contain rounded flex-shrink-0 bg-white"
              />
              {variant.label}
            </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2">
          <QuantityStepper value={quantity} onChange={onQuantityChange}
            max={product.maxQuantity ?? 99} size="card" />
          <div className="flex flex-col items-end leading-tight">
            {product.comparePrice != null && product.comparePrice > 0 && (
              <span className="text-[10.5px] font-medium text-[#E05A1A] line-through">
                ${product.comparePrice.toFixed(2)}{product.priceSuffix ?? ''}
              </span>
            )}
            {product.priceLabel
              ? <span className="text-[13px] font-bold text-[#4B4FD9]">{product.priceLabel}</span>
              : <span className="text-[13px] font-bold text-[#1A1A2E]">
                  ${product.price.toFixed(2)}{product.priceSuffix ?? ''}
                </span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export = F1735 for backwards compat
export default ProductCardF1735;
