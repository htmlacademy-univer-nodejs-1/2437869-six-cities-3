import { RentalOffer } from '../types/rental-offer.js';
import { City } from '../types/city.enum.js';
import { PropertyType } from '../types/property-type.enum.js';
import { Amenity } from '../types/amenity.enum.js';
import { User } from '../types/user.js';
import { Coordinates } from '../types/coordinates.js';

export function createOffer(offerData: string): RentalOffer {
  const [
    title,
    description,
    createdDate,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    city,
    propertyType,
    rooms,
    guests,
    price,
    amenities,
    firstname,
    lastname,
    email,
    avatar,
    userType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    name: `${firstname} ${lastname}`,
    email,
    avatar,
    password: '', // Пароль здесь не используется, поэтому оставляем пустым или можно убрать
    userType: userType as ('обычный' | 'pro'),
  };

  const coordinates: Coordinates = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude)
  };

  return {
    title,
    description,
    publicationDate: new Date(createdDate),
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: parseFloat(rating),
    propertyType: PropertyType[propertyType as keyof typeof PropertyType],
    rooms: Number.parseInt(rooms, 10),
    guests: Number.parseInt(guests, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';').map((a) => Amenity[a as keyof typeof Amenity]),
    author,
    commentsCount: 0, // Количество комментариев не генерируется напрямую, можно обновить позже
    coordinates
  };
}
