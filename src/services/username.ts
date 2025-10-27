const adjectivesMale = ["Бодрый", "Смелый", "Забавный", "Сильный"];
const adjectivesFemale = ["Весёлая", "Смелая", "Забавная", "Сильная"];
const nounsMale = ["Лис", "Медведь", "Волк", "Ёж"];
const nounsFemale = ["Лиса", "Медведица", "Волчица", "Ёжиха"];

export function generateUsername(): string {
  let username = sessionStorage.getItem("chatUsername");
  
  if (!username) {
    const isMale = Math.random() < 0.5;
    const adjective = isMale
      ? adjectivesMale[Math.floor(Math.random() * adjectivesMale.length)]
      : adjectivesFemale[Math.floor(Math.random() * adjectivesFemale.length)];
    const noun = isMale
      ? nounsMale[Math.floor(Math.random() * nounsMale.length)]
      : nounsFemale[Math.floor(Math.random() * nounsFemale.length)];

    username = `${adjective} ${noun}`;
    sessionStorage.setItem("chatUsername", username);
  }

  return username;
}