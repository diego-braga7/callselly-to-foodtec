
interface Customer {
    name: string;
    phone: string;
    address: string | null;
    zip: string | null;
    city: string | null;
    state: string | null;
    value1: number | null;
    diff1: number | null;
    value2: number | null;
    diff2: number | null;
    value3: number | null;
    diff3: number | null;
    latitude: number;
    longitude: number;
    deliveryInstructions: string | null;
    webCustomer: number;
  }
  
  interface Ingredient {
    ingredient: string;
    price: number;
    isLeftHalf: boolean;
    isRightHalf: boolean;
    ordered: boolean;
    isAdHoc: boolean;
    qualifiers: any[]; 
    priceParticipation: number;
  }
  
  interface Item {
    category: string;
    item: string;
    size: string;
    quantity: number;
    sellingPrice: number;
    ingredients: Ingredient[];
    externalRef: string | null;
    isInBucket: boolean;
    voided: boolean;
    specialtyRightHalf: string | null;
    specialtyLeftHalf: string | null;
  }
  
  interface OrderFoodTec {
    orderNum: string;
    id: string | null;
    source: string;
    type: string;
    status: string;
    price: number;
    tax: number;
    taxableSubtotal: number;
    tip: number;
    discount: number;
    deliveryCharge: number;
    paymentFee: number;
    serviceCharge: number;
    serviceChargeName: string;
    timeOrdered: string | null;
    deferTime: string | null;
    promiseTime: string | null;
    coordinateTime: string | null;
    customer: Customer;
    items: Item[];
    specials: any[]; 
    adjustment: any | null; 
    paid: boolean;
    isThirdPartyPickup: boolean;
    payments: any[]; 
    orderTaker: string | null;
    externalRef: string;
    externalNumber: string | null;
    table: string | null;
    instructions: string | null;
    infoAdHocs: any | null; 
    notificationPhone: string | null;
  }
  
  export { OrderFoodTec, Customer, Item, Ingredient };
  