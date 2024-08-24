export interface News {
    id: number;
    title: string;
    describe: string;
    image: string | null;
    created_at: string;
}
export interface NewsMutation {
    title: string;
    describe: string;
    image: string | null;
}

export interface Comment{
    id: number;
    id_news: number;
    author: string;
    message: string;
}
export interface CommentMutation {
    id_news: number;
    author: string;
    message: string;
}