import { Amenity } from './amenity.enum.js';
import { City } from './city.enum.js';
import { Coordinates } from './coordinates.js';
import { PropertyType } from './property-type.enum.js';
import { User } from './user.js';


export interface RentalOffer {
  title: string; // Наименование предложения, от 10 до 100 символов
  description: string; // Описание предложения, от 20 до 1024 символов
  publicationDate: Date; // Дата публикации предложения
  city: City; // Город, один из предложенных
  previewImage: string; // Ссылка на изображение для превью
  images: string[]; // Список из 6 ссылок на фотографии
  isPremium: boolean; // Признак премиальности предложения
  isFavorite: boolean; // Признак, что предложение в списке избранного
  rating: number; // Рейтинг от 1 до 5, допускаются числа с 1 знаком после запятой
  propertyType: PropertyType; // Тип жилья
  rooms: number; // Количество комнат, от 1 до 8
  guests: number; // Количество гостей, от 1 до 10
  price: number; // Стоимость аренды, от 100 до 100 000
  amenities: Amenity[]; // Список удобств
  author: User; // Ссылка на пользователя, который является автором предложения
  commentsCount: number; // Количество комментариев (рассчитывается автоматически)
  coordinates: Coordinates; // Координаты предложения (широта и долгота)
}
