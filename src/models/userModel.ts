export interface User {
    id: number;
    first_name: string;
    last_name: string;
}

const users: User[] = [
    { id: 1, first_name: "John", last_name: "Doe "},
    { id: 2, first_name: "Jane", last_name: "Dao" }
];

export default users;