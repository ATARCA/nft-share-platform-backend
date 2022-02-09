export const resolvers = {
    Query: {
        allBooks() {
            const mockBooks =[
                { title: 'title1', author: 'author1' }
            ];
            return mockBooks;
        }
    }
};