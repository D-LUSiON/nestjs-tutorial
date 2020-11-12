export class Room {
    id: string;
    title: string;
    description: string;

    constructor(data?) {
        if (data) {
            if (data.hasOwnProperty('id')) this.id = data['id'];
            if (data.hasOwnProperty('title')) this.title = data['title'];
            if (data.hasOwnProperty('description')) this.description = data['description'];
        }
    }
}