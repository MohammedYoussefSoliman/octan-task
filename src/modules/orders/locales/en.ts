import i18n from '@/locales/i18n';

const en = {
  orderId: 'order id',
  orderItems: 'Order Items',
  selectReason: 'Return reason',
  canBeRefunded: 'this item can be refunded',
  canNotBeRefunded: 'this item can not be refunded',
  refundedItems: 'Items to be refunded',
  yourOrderDoesNotExist: 'Your order does not exists',
  requiredReason: 'Please select a reason why you want to refund this',
  selectedItem: 'selected item',
  selectItemToRefund: 'Select items to refund',
  refundAmount: 'Refund amount',
  productName: 'product name',
  totalRefundAmount: 'total refund amount',
  warningRefeundInformation:
    '<storePolicy>According to the of policy {{storeName}}،</storePolicy> your money will be refunded  <bolder/>',
  refundAfterDelivery: 'after the store receives the returned products',
  refundAfterPickup: 'after the products are delivered to the shipping company',
  refundProductNotice:
    'you will receive <strongPrice>{{price}}</strongPrice> for this returned product',
  loginToYamm: 'complete order',
  signUp: 'sign up',
  dontHaveAccount: "don't have account on Yamm ?",
  addressInformation: 'address information',
  chooseShippingAddress: 'Choose your address to shipping',
  addAddress: 'add new address',
  selectAddress: 'Use the map to select your address',
  selectAddressFromList: 'Select address from below list',
  browserDeniedGeolocation: 'Your Browser Has Blocked Your Geolocation',
  browserDeniedDescription:
    'You should change the browser or device settings to accurately allow your location access',
  notSupport: 'Your browser does not support geolocation',
  notSupportDescription:
    "It's recommended to update your browser to enable location access",
  skip: 'Skip',
  shippingInformation: 'shipping information',
  loadingMap: 'Loading map',
  shippingFrom: 'shipping from',
  chooseCourier: 'choose courier',
  bankTransfer: 'bank transfer',
  addBank: 'add bank account',
  iban: 'IBAN number',
  invalidIban: 'invalid IBAN number',
  firstName: 'first name',
  middleName: 'middle name',
  lastName: 'last name',
  refundDetails: 'refund details',
  orderDetails: 'order details',
  orderInfo: 'order info',
  storeName: 'store name',
  totalPrice: 'total price',
  paidTo: 'paid to',
  courierInfo: 'courier info',
  bankInfo: 'bank info',
  bankName: 'bank name',
  accountHolderName: 'account holder name',
  submitRequest: 'submit',
  agreedToTerms: 'agreed to Yamm',
  acceptOn: 'Accept on',
  refundAndReturnPolicy: 'return and refund policy',
  refundAndReturnPolicyAcceptance:
    ' <storePolicy> return and refund policy of {{storeName}}</storePolicy>',
  termsAndConditions: 'terms and conditions',
  paymentInformation: 'payment information',
  chooseRefundPaymentMethod:
    'Select the payment method to receive your refunds',
  refundTotal: 'refund total',
  regionNotCovered: 'this region is not covered',
  refundOrderCreatedSuccessfully: 'Your refund request is created!',
  refundOrderUnderReview:
    'yamm will review your order <strongId>{{id}}</strongId> and transfer the refund amount soon',
  refundOrderAfterDelivery:
    'order number <strongId>{{id}}</strongId>, you will receive the refund after the store receives the returned products..',
  refundOrderAfterPickup:
    'order number <strongId>{{id}}</strongId>, the amount will be transferred after the products are delivered to the shipping company.',
  warningWaitingTimeAfterPickup:
    'updating the shipping status may take from one hour up to 48 hours in some cases. Please keep the delivery proof for the shipping company.',
  warningWaitingTimeAfterDelivery:
    'according to the store policy, you will receive your money after the store confirms the delivery of the products.',
  shippingFees: 'shipping fees',
  sureDeleting: 'Are you sure you want to delete address ?',
  sureDeletingAccount: 'Are you sure you want to delete account ?',
  thisOrderDoesNotExists: 'this order does not exists',
  'waiting-shipping': 'waiting shipping',
  dropOffConfirmation: 'Drop-off Confirmation',
  dropOffDescription:
    'The selected shipping company requires orders to be delivered to its nearest branch and rarely sends representatives for return shipments. To continue with the same company, please agree to this or choose another shipping company',
  itemStatus: 'item status',
  orderSubmitted:
    'your order is submitted successfully, and it is being reviewed',
  myOrders: 'My Orders',
  inProgress: 'in progress',
  returnReason: 'return reason',
  acceptanceStatus:
    'attention: the refund process through Yamm platform is following the store refund policy, please view the store refund policy in the following link',
  storeAgreementLink: "click here to view stor's policy",
  shipmentCost:
    'attention: shipment cost is based on the refund and return policy for the store',
  requiredImage: 'an image file is required',
  requiredText: 'a text description is required',
  requiredTextPlaceholder: 'Details of the reason for the return',
  attachFile: 'attach image',
  attachments: 'Attachments',
  rejectReason: 'Rejection reason',
  fileSizeError:
    'File size is too large, please upload a file with a size less than 10MB',
  reasonsAttachments: 'return reasons details',
  illustrativeImage: 'Illustrative image',
  noCarrierStatement:
    'The city you have chosen does not have shipping companies available. Please select the nearest city to you that is available for delivery.',
  chooseCity: 'Write the name of the city',
  sureSelectCityPhrase: 'You have chosen a city\t',
  sureSelectCity: 'Are you sure you want to select this city ?',
  attachMultipleFile: 'please attach an image or a video from your mobile',
  noFileAttached: 'no file attached',
  mediaIsTooLarge: `File size must not exceed ${
    process.env.NODE_ENV === 'production' ? '25Mib' : '4Mib'
  }`,
  sorryCanNotCompleteRefund: 'can not complete your refund',
  refusedToCompleteOrder:
    'Sorry, we can’t complete your order as it is not aligned with <linkId>{{name}}</linkId>, please contact the store',
  returnPolicyFor: 'return policy for',
  whyCanNotWeRefund: "why we can't refund your order?",
  showCustomerAttachments: 'show customer attachments',
  unacceptableIBANs: 'We do not accept digital banks such as stc pay',
  phoneNumberConfirmation: 'phone number confirmation',
  phoneNumberClarification:
    'an OTP is sent to the phone number assigned to this order please confirm it in order to proceed with your refund',
  invalidText: 'this field only accepts letters',
  addMorePhotos: 'add more photos',
  saveAddedPhotos: 'save added photos',
};

i18n.addResourceBundle('en', 'app', en);
