export const sizeOptions=[
  { key: 's', value: 's', text: 'Small (fits in a shoe box)' },
  { key: 'm', value: 'm', text: 'Medium (fits in a hand luggage)' },
  { key: 'l', value: 'l', text: 'Large (fits in the back of a car)' },
  { key: 'xl', value: 'xl', text: 'Extra Large' },
];

export const sizeOptionsFr=[
  { key: 's', value: 's', text: 'Petit (rentre dans une boite de chaussures)' },
  { key: 'm', value: 'm', text: 'Moyenne (rentre dans une valise de cabine)' },
  { key: 'l', value: 'l', text: 'Large (rentre dans la malle d\'une voiture)' },
  { key: 'xl', value: 'xl', text: 'Extra Large' },
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
  { key: 'food', value: 'food', text: 'Denrées alimentaires' },
  { key: 'elec', value: 'elec', text: 'Electronique' },
  { key: 'dress', value: 'dress', text: 'Vetements' },
  { key: 'shoe', value: 'shoe', text: 'Chaussures' },
  { key: 'doc', value: 'doc', text: 'Documents' },
  { key: 'uts', value: 'uts', text: 'Utensils de cuisine' },
  { key: 'app', value: 'app', text: 'Equipements électriques' },
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

export const userTypeOptions = [
  { key: 'sender', value: 'sender', text: 'Sender' },
  { key: 'carrier', value: 'carrier', text: 'Carrier' },
];

export const userTypeOptionsFr = [
  { key: 'sender', value: 'sender', text: 'Expéditeur' },
  { key: 'carrier', value: 'carrier', text: 'Transporteur' },
];

export const sexOptions= [
  { key: 'm', value: 'm', text: 'Male' },
  { key: 'f', value: 'f', text: 'Female' },
];

export const sexOptionsFr= [
  { key: 'm', value: 'm', text: 'Masculin' },
  { key: 'f', value: 'f', text: 'Féminin' },
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
  { key: 's', value: 's', label: 'Small (fits in a shoe box)' },
  { key: 'm', value: 'm', label: 'Medium (fits in a hand luggage)' },
  { key: 'l', value: 'l', label: 'Large (fits in the back of a car)' },
  { key: 'xl', value: 'xl', label: 'Extra Large' },
];

export const sizeMultiOptionsFr=[
  { key: 's', value: 's', label: 'Petit (rentre dans une boite de chaussures)' },
  { key: 'm', value: 'm', label: 'Moyenne (rentre dans une valise de cabine)' },
  { key: 'l', value: 'l', label: 'Large (rentre dans la malle d\'une voiture)' },
  { key: 'xl', value: 'xl', label: 'Extra Large' },
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

export const categoryMultiOptionsFr=[
  { key: 'food', value: 'food', label: 'Denrées alimentaires' },
  { key: 'elec', value: 'elec', label: 'Electronique' },
  { key: 'dress', value: 'dress', label: 'Vetements' },
  { key: 'shoe', value: 'shoe', label: 'Chaussures' },
  { key: 'doc', value: 'doc', label: 'Documents' },
  { key: 'uts', value: 'uts', label: 'Utensils de cuisine' },
  { key: 'app', value: 'app', label: 'Equipements electriques' },
  { key: 'skin', value: 'skin', label: 'Soins de la peau' },
  { key: 'jel', value: 'jel', label: 'Bijoux' },
  { key: 'misc', value: 'misc', label: 'Autres' },
];

export const weightMultiOptions=[
  { key: '500g', value: '500g', label: '0.1 - 500g' },
  { key: '1kg', value: '1kg', label: '500g - 1kg' },
  { key: '5kg', value: '5kg', label: '1.1kg - 5kg' },
  { key: '10kg', value: '10kg', label: '5.1kg - 10kg' },
  { key: '20kg', value: '20kg', label: '10.1kg - 20kg' },
  { key: '30kg', value: '30kg', label: '20.1kg - 30kg' },
];

export const weightMultiOptionsFr=weightMultiOptions;

export const valueMultiOptions=[
  { key: 'low', value: 'low', label: 'Low value' },
  { key: 'mid', value: 'mid', label: 'Medium value' },
  { key: 'high', value: 'high', label: 'High value' },
  { key: 'lux', value: 'lux', label: 'Luxury item' },
  { key: 'exc', value: 'exc', label: 'Exclusive' },
];

export const valueMultiOptionsFr=[
  { key: 'low', value: 'low', label: 'Valeur basse' },
  { key: 'mid', value: 'mid', label: 'Valeur moyenne' },
  { key: 'high', value: 'high', label: 'Grande valeur' },
  { key: 'lux', value: 'lux', label: 'Luxueux' },
  { key: 'exc', value: 'exc', label: 'Exclusif' },
];


export const tripTypeOptions = [
    {value: 'round_trip', label: 'Round trip'},
    {value: 'one_way_trip', label: 'One way trip'}
];

export const calculateMinPrice = (weight, size, category, value) => {
  const size_coefficients = {
    's': 1,
    'm': 2,
    'l': 5,
    'xl': 10,
  };
  const weight_coefficients = {
    '500g': 0.5,
    '1kg': 1,
    '5kg': 5,
    '10kg': 10,
    '20kg': 20,
    '30kg': 30,
  };
  const value_coefficients = {
    'low': 0.1,
    'mid': 0.3,
    'high': 0.5,
    'lux': 0.7,
    'exc': 1,
  };
  const category_coefficients = {
    'food': 0.7,
    'elec': 0.3,
    'dress': 0.5,
    'shoe': 0.3,
    'doc': 0.2,
    'uts': 0.4,
    'app': 0.4,
    'skin': 0.3,
    'jel': 1,
    'misc': 0.4
  };
  let min_price = 0;
  let w = weight ? weight_coefficients[weight['value']] : 0;
  let s = size ? size_coefficients[size['value']] : 0;
  let v = value ? value_coefficients[value['value']] : 0;
  let c = category ? category_coefficients[category['value']] : 0;
  min_price = w*(10*((0.95*s) + (0.05*v)));
  min_price = Math.round(min_price * 10) / 10
  return min_price;
}
