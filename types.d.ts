interface User {
  userId: number;
  username: string;
  phoneNumber: string;
  email: string;
  location: string;
  zipCode: string;
  avatarUrl: string | null;
}

interface ClientOpinion {
  rating: number;
  comment: string;
  avatar: string;
  name: string;
  surname: string;
  car: string;
  cost: number;
}

interface BlogData {
  recommended: boolean;
  title: string;
  time: string;
  date: string;
  description: string;
  image: string;
}

interface FavouriteUserOffer {
  FavouriteUserOfferId: number;
  userId: number;
  offerId: number;
}

interface ChatHeaderType {
  chatId: number;
  avatarUrl: string | null;
  otherUserName: string;
  otherUserId: number;
  senderId: number;
  lastMessage: string | null;
  updatedAt: string;
  hasUnreadMessages: boolean;
  isMuted: boolean;
  offerCarHeaderDto: OfferCarHeaderDto;
}

interface BlockedChatHeaderType {
  blockedUserId: number;
  blockedUserName: string;
  avatarUrl: string;
}

interface RemovedChatHeaderType {
  removedChatId: number;
  chatId: number;
  userId: number;
  user: any;
  chat: any;
}

interface ChatHeaderResponse {
  sellers: ChatHeaderType[];
  buyers: ChatHeaderType[];
}

interface OfferCarHeaderDto {
  offerId: number;
  userId: number;
  mark: string;
  model: string;
  ownerName: string;
}

interface MutedUser {
  mutedUserId: number;
  userId: number;
  mutedId: number;
}

interface OfferHeader {
  offerId: number;
  isOwner: boolean;
  mark: string;
  model: string;
  ownerName: string;
}

interface MessageFiles {
  images: string[] | undefined;
  attachments: string[] | undefined;
}

interface Message {
  messageId: number;
  chatId: number;
  senderId: number;
  type: number;
  content: string;
  timestamp: number;
  messageFiles: MessageFile[];
}

interface MessageFile {
  messageFileId: number;
  messageId: number;
  filePath: string;
  fileType: string;
  fileAlt: string;
}

interface Conversation {
  offerHeader: OfferHeader;
  messages: Message[];
  user1Id: number;
}

interface Offer {
  carOffer: CarOffer;
  user: User;
}

interface Option {
  value: string | number;
  option: string;
}

interface Color {
  colorId: number;
  colorName: string;
  colorHex: string;
}

interface User {
  userId: number;
  username: string;
  phoneNumber: string;
  email: string;
  location: string;
  zipCode: string;
  avatarUrl;
}

interface FuelType {
  fuelTypeId: number;
  name: string;
}

interface FullOffer {
  offerId: number;
  mark: string;
  model: string;
  price: number;
  offerType: string;
  generation: string;
  bodyTypes:
    | { bodyTypeId: number; name: string; offerBodyTypes: any[] }[]
    | null;
  countryOfOrigins: { countryOfOriginId: number; name: string }[] | null;
  comment: string | null;
  doorsCounts: { doorsCountId: number; doorsQuantity: number }[] | null;
  gearBoxes: { gearBoxId: number; name: string }[] | null;
  driveTypes: { driveTypeId: number; name: string; system: string }[] | null;
  carStates: { carStateId: number; state: string }[] | null;
  yearOfProductionFrom: number | null;
  yearOfProductionTo: number | null;
  horsePowerFrom: number | null;
  horsePowerTo: number | null;
  mileageFrom: number | null;
  mileageTo: number | null;
  endDate: string;
  createdAt: string;
  user: User;
  fuelTypes: { fuelTypeId: number; name: string; fuelKind: string }[] | null;
  colors: Color[];
}

interface Brand {
  id: number;
  name: string;
  models: Model[];
}

interface Model {
  id: number;
  brandId: number;
  name: string;
  generations: Generation[];
}

interface Generation {
  id: number;
  modelId: number;
  name: string;
}

interface BodyType {
  bodyTypeId: number;
  name: string;
}

interface CountryOfOriginsType {
  countryOfOriginId: number;
  name: string;
}

interface DriveType {
  driveTypeId: number;
  name: string;
  system: string;
}

interface DoorsCountType {
  doorsCountId: number;
  doorsQuantity: number;
}

interface FuelType {
  fuelTypeId: number;
  name: string;
  fuelKind: string;
}

interface GearBoxType {
  gearBoxId: number;
  name: string;
}

interface FilterType {
  priceFrom: string;
  priceTo: string;
  yearOfProductionFrom: string;
  yearOfProductionTo: string;
  mileageFrom: string;
  mileageTo: string;
  horsePowerFrom: string;
  horsePowerTo: string;
}

interface Color {
  colorId: number;
  colorName: string;
  colorHex: string;
}

interface CarStateType {
  carStateId: number;
  state: string;
}

interface FilterTypeOption {
  id: number;
  value: string | number;
}

interface MultipleSelectActiveFormFields {
  name: string;
  label: string;
  selectData: FilterTypeOption[] | null;
  selectedData: number[] | string[];
  setSelectedData:
    | React.Dispatch<React.SetStateAction<number[]>>
    | React.Dispatch<React.SetStateAction<string[]>>;
  active: boolean;
}

interface FilterData {
  brands: Brand[];
  colors: Color[];
  fuelTypes: FuelType[];
  bodyTypes: BodyType[];
  doorsCounts: DoorsCountType[];
  countryOfOrigins: CountryOfOriginsType[];
  driveTypes: DriveType[];
  gearBoxes: GearBoxType[];
  carStates: CarStateType[];
}

interface SingleSelectActiveFormFields {
  name: string;
  label: string;
  selectData: Option[];
  filterTypes: FilterType;
  setFilterTypes: React.Dispatch<SetStateAction<FilterType>>;
  active: boolean;
}

interface TokenPackage {
  tokenPackageId: number;
  title: string;
  savings: number | null;
  image: string;
  price: number;
  tokenCount: number;
}

interface OrderItem {
  orderItemId: number;
  tokenPackageId: number;
  tokenPackage: TokenPackage;
  amount: number;
  orderId: number;
  order: null;
}

interface Order {
  orderId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
  street: string;
  city: string;
  country: string;
  companyName: string | null;
  nip: string | null;
  companyZipCode: string | null;
  companyStreet: string | null;
  companyCity: string | null;
  companyCountry: string | null;
  fullPrice: number;
  itemsCount: number;
  createdAt: string;
  orderItems: OrderItem[];
  payments: null[]; // Możesz zmienić na typ `Payment[]` jeśli w przyszłości będą tam obiekty
}

interface Payment {
  paymentId: string;
  price: number;
  status: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  orderId: number;
  order: Order;
}
