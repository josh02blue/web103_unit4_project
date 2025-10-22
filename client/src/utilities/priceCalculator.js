// Price calculation utilities for car customization

export const BASE_PRICE = 25000;

export const OPTION_PRICES = {
  exterior: {
    'Red': 0,
    'Blue': 0,
    'Black': 0,
    'White': 0,
    'Silver': 500,
    'Gold': 1000,
    'Metallic Red': 1500,
    'Metallic Blue': 1500
  },
  wheels: {
    'Standard': 0,
    'Sport': 800,
    'Alloy': 1200,
    'Chrome': 2000,
    'Carbon Fiber': 3000
  },
  roof: {
    'Hard Top': 0,
    'Soft Top': 2000,
    'Convertible': 5000,
    'Targa': 3000,
    'Sunroof': 1500
  },
  interior: {
    'Cloth': 0,
    'Leather': 2000,
    'Premium Leather': 4000,
    'Carbon Fiber': 3000,
    'Alcantara': 2500
  }
};

export function calculateTotalPrice(selections) {
  let total = BASE_PRICE;
  
  if (selections.exterior && OPTION_PRICES.exterior[selections.exterior]) {
    total += OPTION_PRICES.exterior[selections.exterior];
  }
  
  if (selections.wheels && OPTION_PRICES.wheels[selections.wheels]) {
    total += OPTION_PRICES.wheels[selections.wheels];
  }
  
  if (selections.roof && OPTION_PRICES.roof[selections.roof]) {
    total += OPTION_PRICES.roof[selections.roof];
  }
  
  if (selections.interior && OPTION_PRICES.interior[selections.interior]) {
    total += OPTION_PRICES.interior[selections.interior];
  }
  
  return total;
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}
