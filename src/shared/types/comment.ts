import { User } from './user.js';

export interface Comment {
  text: string; // Текст комментария, от 5 до 1024 символов
  publicationDate: Date; // Дата публикации комментария, генерируется автоматически
  rating: number; // Рейтинг комментария, число от 1 до 5
  author: User; // Автор комментария, ссылка на сущность "Пользователь"
}
