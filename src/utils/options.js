export const sizeOptions=[
  { key: 'xxs', value: 'xxs', text: 'Extra Extra Small' },
  { key: 'xs', value: 'xs', text: 'Extra small' },
  { key: 's', value: 's', text: 'Small' },
  { key: 'm', value: 'm', text: 'Medium' },
  { key: 'l', value: 'l', text: 'Large' },
  { key: 'xl', value: 'xl', text: 'Extra Large' },
  { key: 'xxl', value: 'xxl', text: 'Extra Extra Large' },
  { key: 'xxxl', value: 'xxxl', text: 'Extra Extra Extra Large' },
];

export const sizeOptionsFr=[
  { key: 'xxs', value: 'xxs', text: 'Tres tres petit' },
  { key: 'xs', value: 'xs', text: 'Tres petit' },
  { key: 's', value: 's', text: 'Petit' },
  { key: 'm', value: 'm', text: 'Moyenne' },
  { key: 'l', value: 'l', text: 'Large' },
  { key: 'xl', value: 'xl', text: 'Extra Large' },
  { key: 'xxl', value: 'xxl', text: 'Extra Extra Large' },
  { key: 'xxxl', value: 'xxxl', text: 'Extra Extra Extra Large' },
];

export const categoryOptions=[
  { key: 'food', value: 'food', text: 'Food' },
  { key: 'elec', value: 'elec', text: 'Electronics' },
  { key: 'dress', value: 'dress', text: 'Dresses' },
  { key: 'shoe', value: 'shoe', text: 'Shoes' },
  { key: 'doc', value: 'doc', text: 'Documents' },
  { key: 'uts', value: 'uts', text: 'Kitchen utensils' },
  { key: 'app', value: 'app', text: 'Electrical appliances' },
  { key: 'skin', value: 'skin', text: 'Skin care' },
  { key: 'jel', value: 'jel', text: 'Jewelry' },
  { key: 'misc', value: 'misc', text: 'Miscellaneous' },
];

export const categoryOptionsFr=[
  { key: 'food', value: 'food', text: 'Denrees alimentaires' },
  { key: 'elec', value: 'elec', text: 'Electronique' },
  { key: 'dress', value: 'dress', text: 'Vetements' },
  { key: 'shoe', value: 'shoe', text: 'Chaussures' },
  { key: 'doc', value: 'doc', text: 'Documents' },
  { key: 'uts', value: 'uts', text: 'Utensils de cuisine' },
  { key: 'app', value: 'app', text: 'Equipements electriques' },
  { key: 'skin', value: 'skin', text: 'Soins de la peau' },
  { key: 'jel', value: 'jel', text: 'Bijoux' },
  { key: 'misc', value: 'misc', text: 'Autres' },
];

export const weightOptions=[
  { key: '500g', value: '500g', text: '0.1 - 500g' },
  { key: '1kg', value: '1kg', text: '500g - 1kg' },
  { key: '5kg', value: '5kg', text: '1.1kg - 5kg' },
  { key: '10kg', value: '10kg', text: '5.1kg - 10kg' },
  { key: '20kg', value: '20kg', text: '10.1kg - 20kg' },
  { key: '30kg', value: '30kg', text: '20.1kg - 30kg' },
  { key: '40kg', value: '40kg', text: '30.1kg - 40kg' },
  { key: 'huge', value: 'huge', text: '40.1kg +' },
];

export const weightOptionsFr=weightOptions;

export const valueOptions=[
  { key: 'low', value: 'low', text: 'Low value' },
  { key: 'mid', value: 'mid', text: 'Medium value' },
  { key: 'high', value: 'high', text: 'High value' },
  { key: 'lux', value: 'lux', text: 'Luxury item' },
  { key: 'exc', value: 'exc', text: 'Exclusive' },
];

export const valueOptionsFr=[
  { key: 'low', value: 'low', text: 'Valeur basse' },
  { key: 'mid', value: 'mid', text: 'Valeur moyenne' },
  { key: 'high', value: 'high', text: 'Grande valeur' },
  { key: 'lux', value: 'lux', text: 'Luxueux' },
  { key: 'exc', value: 'exc', text: 'Exclusif' },
];

export const optionToText = (option_value, arr) => {
  // For value, weight, size and category of product only
  let txt = "";
  for(let i = 0; i < arr.length; i++) {
    if(arr[i]['value'] === option_value) {
      txt = arr[i]['text'];
    }
  }
  return txt;
}

export const sizeMultiOptions=[
  { key: 'xxs', value: 'xxs', label: 'Extra Extra Small' },
  { key: 'xs', value: 'xs', label: 'Extra small' },
  { key: 's', value: 's', label: 'Small' },
  { key: 'm', value: 'm', label: 'Medium' },
  { key: 'l', value: 'l', label: 'Large' },
  { key: 'xl', value: 'xl', label: 'Extra Large' },
  { key: 'xxl', value: 'xxl', label: 'Extra Extra Large' },
  { key: 'xxxl', value: 'xxxl', label: 'Extra Extra Extra Large' },
];

export const categoryMultiOptions=[
  { key: 'food', value: 'food', label: 'Food' },
  { key: 'elec', value: 'elec', label: 'Electronics' },
  { key: 'dress', value: 'dress', label: 'Dresses' },
  { key: 'shoe', value: 'shoe', label: 'Shoes' },
  { key: 'doc', value: 'doc', label: 'Documents' },
  { key: 'uts', value: 'uts', label: 'Kitchen utensils' },
  { key: 'app', value: 'app', label: 'Electrical appliances' },
  { key: 'skin', value: 'skin', label: 'Skin care' },
  { key: 'jel', value: 'jel', label: 'Jewelry' },
  { key: 'misc', value: 'misc', label: 'Miscellaneous' },
];

export const weightMultiOptions=[
  { key: '500g', value: '500g', label: '0.1 - 500g' },
  { key: '1kg', value: '1kg', label: '500g - 1kg' },
  { key: '5kg', value: '5kg', label: '1.1kg - 5kg' },
  { key: '10kg', value: '10kg', label: '5.1kg - 10kg' },
  { key: '20kg', value: '20kg', label: '10.1kg - 20kg' },
  { key: '30kg', value: '30kg', label: '20.1kg - 30kg' },
  { key: '40kg', value: '40kg', label: '30.1kg - 40kg' },
  { key: 'huge', value: 'huge', label: '40.1kg +' },
];

export const valueMultiOptions=[
  { key: 'low', value: 'low', label: 'Low value' },
  { key: 'mid', value: 'mid', label: 'Medium value' },
  { key: 'high', value: 'high', label: 'High value' },
  { key: 'lux', value: 'lux', label: 'Luxury item' },
  { key: 'exc', value: 'exc', label: 'Exclusive' },
];


export const tripTypeOptions = [
    {value: 'round_trip', label: 'Round trip'},
    {value: 'one_way_trip', label: 'One way trip'}
];
