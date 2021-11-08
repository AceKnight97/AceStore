export const HOME_HEADER = [
  'Our Team',
  'Business',
  'Contact',
  'Document',
  // 'GitLab',
];

export const BUSINESS_FIELDS = [
  'Website - Application',
  'Hochiminh City Tour Guide',
  'Real Estate',
  'Assistant',
];

export const FOOD_NAMES = [
  'Seafood',
  'Meats',
  'Fruits',
  'Others'
];

export const QUANTITY_TYPES = {
  WEIGHT: 'WEIGHT',
  PACKAGE: 'PACKAGE'
}
const { WEIGHT, PACKAGE } = QUANTITY_TYPES;

export const WEIGHT_DATA = [
  '0.5 Kg',
  '1.0 Kg',
  '1.5 Kg',
  '2.0 Kg',
  '2.5 Kg',
  '3.0 Kg',
  '3.5 Kg',
  '4.0 Kg',
]

export const PACKAGE_DATA = [
  '1 package',
  '2 packages',
  '3 packages',
  '4 packages',
];


export const MOCKING_FOOD_TABLE = [
  {
    title: 'Seafood',
    data: [
      {
        name: 'Lobster',
        price: 1200000,
      },
      {
        name: 'Crab',
        price: 200000,
      },
      {
        name: 'Octopus',
        price: 300000,
      },
      {
        name: 'Squid',
        price: 180000,
      },
      {
        name: 'Shrimp',
        price: 220000,
      },
      {
        name: 'Snail',
        price: 160000,
      },
    ]
  },
  {
    title: 'Meats',
    data: [
      {
        name: 'Lamb',
        price: 125000,
      },
      {
        name: 'Fork belly',
        price: 230000,
      },
      {
        name: 'Roast chicken',
        price: 330000,
        quantityType: PACKAGE,
      },
      {
        name: 'Bacon',
        price: 120000,
      },
      {
        name: 'Sausages',
        price: 220000,
        quantityType: PACKAGE,
      },
      {
        name: 'Beef',
        price: 160000,
      },
    ]
  },
  {
    title: 'Others',
    data: [
      {
        name: 'Banh Khot',
        price: 12000,
      },
      {
        name: 'Banh Xeo',
        price: 20000,
      }
    ]
  }
]