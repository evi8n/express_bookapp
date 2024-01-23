import { PrismaClient } from '@prisma/client'


const getBookById = async (id) => {
    const prisma = new PrismaClient()
    const book = await prisma.book.findUnique({
        where: {
            id
        }
    })

    if (!book) {
        throw new NotFoundError('Book', id)
    }

    return book
}


export default getBookById


// import bookData from '../../data/books.json' assert { type: "json" };

// const getBookById = (id) => {
//     const foundBook = bookData.books.find(book => book.id === id);

//     // Check if the book exists before returning it
//     if (!foundBook) {
//         throw new NotFoundError('Book', id);
//     }

//     return foundBook;
// }

// export default getBookById;
