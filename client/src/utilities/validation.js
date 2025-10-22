// Validation utilities for car customization

export const INCOMPATIBLE_COMBINATIONS = {
  // Some combinations that don't make sense
  'Soft Top + Hard Top': ['Soft Top', 'Hard Top'],
  'Convertible + Hard Top': ['Convertible', 'Hard Top'],
  'Targa + Soft Top': ['Targa', 'Soft Top']
};

export function validateSelections(selections) {
  const errors = [];
  
  // Check for required fields
  if (!selections.name || selections.name.trim() === '') {
    errors.push('Car name is required');
  }
  
  if (!selections.exterior) {
    errors.push('Exterior color must be selected');
  }
  
  if (!selections.wheels) {
    errors.push('Wheel type must be selected');
  }
  
  if (!selections.roof) {
    errors.push('Roof type must be selected');
  }
  
  if (!selections.interior) {
    errors.push('Interior type must be selected');
  }
  
  // Check for incompatible combinations
  const roofType = selections.roof;
  const wheelType = selections.wheels;
  
  // Example: Convertible with hard top doesn't make sense
  if (roofType === 'Convertible' && wheelType === 'Standard') {
    // This is actually fine, just an example
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getOptionImages() {
  return {
    exterior: {
      'Red': 'https://images.unsplash.com/photo-1580446623001-3abf670c5c55?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVkJTIwY2FyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000',
      'Blue': 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000',
      'Black': 'https://bugatti-newsroom.imgix.net/fc5cfcbe-f01f-4ee2-b664-d26ed3ca11db/01_LVN_34-Front',
      'White': 'https://t3.ftcdn.net/jpg/06/50/57/76/360_F_650577635_GesSMihkw3BjAVXDAKcLeaC8Ec8yUbTq.jpg',
      'Silver': 'https://techcrunch.com/wp-content/uploads/2017/03/a172106_large.jpg',
      'Gold': 'https://media.cnn.com/api/v1/images/stellar/prod/160330151741-gold-cars-lamborghini.jpg?q=w_4928,h_3280,x_0,y_0,c_fill',
      'Metallic Red': 'https://i.redd.it/h0twjlx4qdq61.jpg',
      'Metallic Blue': 'https://www.wrapstyle.com/content/img_cache/1920x/1591351648-819-bmw-m4-blue-metallic.jpg'
    },
    wheels: {
      'Standard': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format',
      'Sport': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format',
      'Alloy': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format',
      'Chrome': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format',
      'Carbon Fiber': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&auto=format'
    },
    roof: {
      'Hard Top': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format',
      'Soft Top': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format',
      'Convertible': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format',
      'Targa': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format',
      'Sunroof': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=200&h=200&fit=crop&auto=format'
    },
    interior: {
      'Cloth': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format',
      'Leather': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format',
      'Premium Leather': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format',
      'Carbon Fiber': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format',
      'Alcantara': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&auto=format'
    }
  };
}