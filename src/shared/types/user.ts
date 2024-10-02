export interface User {
    name: string; // Имя пользователя, от 1 до 15 символов
    email: string; // Валидный адрес электронной почты
    avatar?: string; // Необязательная ссылка на аватар пользователя в формате .jpg или .png
    password: string; // Пароль, от 6 до 12 символов
    userType: 'обычный' | 'pro'; // Тип пользователя: обычный или pro
}
